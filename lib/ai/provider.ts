import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GiftPersona {
  relationship: string;
  occasion: string;
  ageRange: string;
  personality: string[];
  interests: string[];
  emotion: string;
  budgetRange: { min: number; max: number };
  preferredType: string;
  dislikes?: string;
}

export interface GeneratedGiftIdea {
  title: string;
  description: string;
  priceEstimate: number;
  tags: string[];
  searchTerms: string;
  reasoning: string;
}

type AIProvider = 'openai' | 'gemini' | 'claude';

function getProvider(): AIProvider {
  const provider = process.env.GIFT_AI_PROVIDER as AIProvider;
  return provider || 'openai';
}

function buildPrompt(persona: GiftPersona, maxIdeas: number = 8): string {
  return `You are an expert gift consultant helping find thoughtful, meaningful gifts.

Based on the following recipient profile, suggest ${maxIdeas} gift ideas that would be perfect for them.

RECIPIENT PROFILE:
- Relationship: ${persona.relationship}
- Occasion: ${persona.occasion}
- Age Range: ${persona.ageRange}
- Personality Traits: ${persona.personality.join(', ')}
- Interests: ${persona.interests.join(', ')}
- Desired Gift Emotion: ${persona.emotion}
- Budget: $${persona.budgetRange.min} - $${persona.budgetRange.max}
- Preferred Gift Type: ${persona.preferredType}
${persona.dislikes ? `- Things to Avoid: ${persona.dislikes}` : ''}

REQUIREMENTS:
1. Each gift should match the budget range
2. Gifts should feel thoughtful, not generic
3. Include a mix of physical items, experiences, and digital gifts where appropriate
4. Consider both popular and unique/creative options
5. Include practical gifts and sentimental gifts

For each gift idea, provide:
- title: A clear, specific product/experience name
- description: 2-3 sentences explaining why this gift is perfect for them
- priceEstimate: Estimated price in USD (whole number)
- tags: 3-5 relevant tags (e.g., "tech", "experiential", "personalized", "luxury", "practical")
- searchTerms: Keywords to find this product (for Amazon/Google search)
- reasoning: Brief explanation of why this matches the persona

Respond in JSON format as an array of objects with these exact fields.`;
}

async function generateWithOpenAI(persona: GiftPersona, maxIdeas: number): Promise<GeneratedGiftIdea[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not configured');

  const openai = new OpenAI({ apiKey });
  const prompt = buildPrompt(persona, maxIdeas);

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a gift recommendation expert. Always respond with valid JSON array.',
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.8,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No response from OpenAI');

  const parsed = JSON.parse(content);
  return parsed.gifts || parsed.ideas || parsed;
}

async function generateWithClaude(persona: GiftPersona, maxIdeas: number): Promise<GeneratedGiftIdea[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('Anthropic API key not configured');

  const anthropic = new Anthropic({ apiKey });
  const prompt = buildPrompt(persona, maxIdeas);

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `${prompt}\n\nRespond ONLY with valid JSON array, no other text.`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type from Claude');

  // Extract JSON from response
  const jsonMatch = content.text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No JSON array found in Claude response');

  return JSON.parse(jsonMatch[0]);
}

async function generateWithGemini(persona: GiftPersona, maxIdeas: number): Promise<GeneratedGiftIdea[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = buildPrompt(persona, maxIdeas);

  const result = await model.generateContent(
    `${prompt}\n\nRespond ONLY with valid JSON array, no markdown formatting or other text.`
  );

  const response = result.response;
  const text = response.text();

  // Extract JSON from response
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No JSON array found in Gemini response');

  return JSON.parse(jsonMatch[0]);
}

export async function generateGiftIdeas(
  persona: GiftPersona,
  maxIdeas: number = 8
): Promise<{ ideas: GeneratedGiftIdea[]; model: string; prompt: string }> {
  const provider = getProvider();
  const prompt = buildPrompt(persona, maxIdeas);

  let ideas: GeneratedGiftIdea[] = [];
  let model = '';

  try {
    switch (provider) {
      case 'claude':
        ideas = await generateWithClaude(persona, maxIdeas);
        model = 'claude-sonnet-4-20250514';
        break;
      case 'gemini':
        ideas = await generateWithGemini(persona, maxIdeas);
        model = 'gemini-1.5-flash';
        break;
      case 'openai':
      default:
        ideas = await generateWithOpenAI(persona, maxIdeas);
        model = 'gpt-4o-mini';
        break;
    }
  } catch (error) {
    console.error(`AI generation failed with ${provider}:`, error);
    // Return fallback ideas
    ideas = getFallbackIdeas(persona, maxIdeas);
    model = 'fallback';
  }

  return { ideas, model, prompt };
}

function getFallbackIdeas(persona: GiftPersona, maxIdeas: number): GeneratedGiftIdea[] {
  // Basic fallback ideas based on persona
  const fallbackIdeas: GeneratedGiftIdea[] = [
    {
      title: 'Personalized Photo Book',
      description: 'A beautifully designed photo book capturing special memories together.',
      priceEstimate: 45,
      tags: ['personalized', 'sentimental', 'keepsake'],
      searchTerms: 'custom photo book personalized',
      reasoning: 'Personal gifts are always meaningful regardless of the occasion.',
    },
    {
      title: 'Experience Gift Card',
      description: 'A gift card for a memorable experience like a cooking class, spa day, or adventure activity.',
      priceEstimate: 75,
      tags: ['experiential', 'memorable', 'flexible'],
      searchTerms: 'experience gift card',
      reasoning: 'Experiences create lasting memories.',
    },
    {
      title: 'Premium Subscription Box',
      description: 'A curated subscription box tailored to their interests, delivered monthly.',
      priceEstimate: 50,
      tags: ['subscription', 'ongoing', 'curated'],
      searchTerms: 'premium subscription box gift',
      reasoning: 'The gift that keeps on giving.',
    },
    {
      title: 'Artisan Gift Basket',
      description: 'A carefully curated basket of gourmet treats and artisan products.',
      priceEstimate: 65,
      tags: ['gourmet', 'luxury', 'traditional'],
      searchTerms: 'artisan gift basket gourmet',
      reasoning: 'A classic gift that works for any occasion.',
    },
  ];

  // Filter by budget and return up to maxIdeas
  return fallbackIdeas
    .filter(
      (idea) =>
        idea.priceEstimate >= persona.budgetRange.min &&
        idea.priceEstimate <= persona.budgetRange.max
    )
    .slice(0, maxIdeas);
}

export function buildPersonaFromAnswers(answers: Record<string, string>): GiftPersona {
  // Map quiz answers to persona structure
  const budgetMap: Record<string, { min: number; max: number }> = {
    budget: { min: 0, max: 25 },
    'mid-range': { min: 25, max: 75 },
    premium: { min: 75, max: 150 },
    luxury: { min: 150, max: 500 },
  };

  return {
    relationship: answers.relationship || 'friend',
    occasion: answers.occasion?.replace('occasion-', '') || 'birthday',
    ageRange: answers.age || '30s-40s',
    personality: [answers.personality].filter(Boolean),
    interests: [answers.interest?.replace('interest-', '')].filter(Boolean),
    emotion: answers.style?.replace('style-', '') || 'thoughtful',
    budgetRange: budgetMap[answers.budget] || { min: 25, max: 75 },
    preferredType: 'no preference',
    dislikes: answers.dislikes,
  };
}
