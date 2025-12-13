import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const favorites = await prisma.userFavorite.findMany({
      where: { userId: session.userId },
      include: {
        giftIdea: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const mappedFavorites = favorites
      .filter((f) => f.giftIdea)
      .map((f) => ({
        id: f.giftIdea!.id,
        title: f.giftIdea!.title,
        description: f.giftIdea!.description,
        imageUrl: f.giftIdea!.imageUrl,
        productUrl: f.giftIdea!.productUrl,
        merchant: f.giftIdea!.merchant,
        priceEstimate: f.giftIdea!.priceEstimate,
        tags: f.giftIdea!.tags,
        score: Math.round(f.giftIdea!.scoreRelevance * 100),
      }));

    return NextResponse.json({ favorites: mappedFavorites });
  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const body = await request.json();
    const { giftIdeaId } = body;

    if (!giftIdeaId) {
      return NextResponse.json({ error: 'Gift ID required' }, { status: 400 });
    }

    // Check if already favorited
    const existing = await prisma.userFavorite.findUnique({
      where: {
        userId_giftIdeaId: {
          userId: session.userId,
          giftIdeaId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: 'Already favorited' });
    }

    const favorite = await prisma.userFavorite.create({
      data: {
        userId: session.userId,
        giftIdeaId,
      },
    });

    return NextResponse.json({ favorite });
  } catch (error) {
    console.error('Add favorite error:', error);
    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    );
  }
}
