import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateGiftIdeas, buildPersonaFromAnswers } from '@/lib/ai/provider';
import { deriveTags, buildRecommendations } from '@/lib/quiz/recommendations';
import { verifySession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, locale = 'en' } = body;

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid answers' }, { status: 400 });
    }

    // Get user from session if authenticated
    let userId: string | null = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const session = await verifySession(token);
        userId = session?.userId || null;
      } catch {
        // Continue without user
      }
    }

    // Derive tags from answers
    const tags = deriveTags(answers);

    // Parse budget
    const budgetMap: Record<string, { min: number; max: number }> = {
      'under-25': { min: 0, max: 25 },
      '25-50': { min: 25, max: 50 },
      '50-100': { min: 50, max: 100 },
      '100-plus': { min: 100, max: 500 },
    };
    const budget = budgetMap[answers.budget as string] || { min: 0, max: 100 };

    // Create quiz session
    const quizSession = await prisma.quizSession.create({
      data: {
        userId,
        locale,
        rawAnswers: answers,
        tags,
        budgetMin: budget.min,
        budgetMax: budget.max,
        relationship: answers.relationship as string,
        occasion: answers.occasion as string,
        emotion: answers.emotion as string,
      },
    });

    // Get gift templates from database
    const templates = await prisma.giftTemplate.findMany({
      where: { isActive: true },
    });

    // Build recommendations from templates
    const templateRecommendations = buildRecommendations(templates, answers, 6);

    // Generate AI ideas
    let aiIdeas: Array<{
      title: string;
      description: string;
      priceEstimate: number;
      tags: string[];
      searchTerms: string;
    }> = [];
    let aiModel = '';
    let aiPrompt = '';

    try {
      const persona = buildPersonaFromAnswers(answers);
      const aiResult = await generateGiftIdeas(persona, 6);
      aiIdeas = aiResult.ideas;
      aiModel = aiResult.model;
      aiPrompt = aiResult.prompt;

      // Update session with AI data
      await prisma.quizSession.update({
        where: { id: quizSession.id },
        data: {
          aiPrompt,
          aiModel,
          aiResponseRaw: aiIdeas as unknown as Record<string, unknown>,
        },
      });
    } catch (aiError) {
      console.error('AI generation failed:', aiError);
      // Continue with just template recommendations
    }

    // Combine and save gift ideas
    const allGifts = [];

    // Add template-based recommendations
    for (const template of templateRecommendations) {
      const giftIdea = await prisma.giftIdea.create({
        data: {
          quizSessionId: quizSession.id,
          title: locale === 'ru' && template.title_ru ? template.title_ru : template.title_en,
          description:
            locale === 'ru' && template.description_ru
              ? template.description_ru
              : template.description_en,
          imageUrl: template.imageUrl,
          productUrl: template.productUrl,
          merchant: template.merchant,
          priceEstimate: template.minPrice || template.maxPrice,
          tags: template.tags,
          scoreRelevance: template.score / 100,
          scoreProfitability: template.profitabilityScore,
        },
      });

      allGifts.push({
        id: giftIdea.id,
        title: giftIdea.title,
        description: giftIdea.description,
        imageUrl: giftIdea.imageUrl,
        productUrl: giftIdea.productUrl,
        merchant: giftIdea.merchant,
        priceEstimate: giftIdea.priceEstimate,
        tags: giftIdea.tags,
        score: Math.round(giftIdea.scoreRelevance * 100),
      });
    }

    // Add AI-generated ideas
    for (const aiIdea of aiIdeas) {
      const giftIdea = await prisma.giftIdea.create({
        data: {
          quizSessionId: quizSession.id,
          title: aiIdea.title,
          description: aiIdea.description,
          imageUrl: null,
          productUrl: `https://www.amazon.com/s?k=${encodeURIComponent(aiIdea.searchTerms || aiIdea.title)}`,
          merchant: 'Amazon',
          priceEstimate: aiIdea.priceEstimate,
          tags: aiIdea.tags,
          scoreRelevance: 0.7,
          scoreProfitability: 0.5,
        },
      });

      allGifts.push({
        id: giftIdea.id,
        title: giftIdea.title,
        description: giftIdea.description,
        imageUrl: giftIdea.imageUrl,
        productUrl: giftIdea.productUrl,
        merchant: giftIdea.merchant,
        priceEstimate: giftIdea.priceEstimate,
        tags: giftIdea.tags,
        score: 70,
      });
    }

    // Sort by score
    allGifts.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      sessionId: quizSession.id,
      gifts: allGifts.slice(0, 12),
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process quiz' },
      { status: 500 }
    );
  }
}
