import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: {
        giftIdeas: {
          orderBy: { scoreRelevance: 'desc' },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const gifts = session.giftIdeas.map((idea) => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      imageUrl: idea.imageUrl,
      productUrl: idea.productUrl,
      merchant: idea.merchant,
      priceEstimate: idea.priceEstimate,
      tags: idea.tags,
      score: Math.round(idea.scoreRelevance * 100),
      isFavorite: idea.isFavorite,
    }));

    return NextResponse.json({
      sessionId: session.id,
      createdAt: session.createdAt,
      gifts,
    });
  } catch (error) {
    console.error('Results fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}
