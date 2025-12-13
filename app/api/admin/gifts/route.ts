import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth/session';

// Helper to check admin role
async function checkAdmin(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) {
    return { error: 'Unauthorized', status: 401 };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  });

  if (!user || user.role !== 'ADMIN') {
    return { error: 'Forbidden', status: 403 };
  }

  return { session };
}

// GET - Fetch all gift templates
export async function GET(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if ('error' in adminCheck) {
    return NextResponse.json(
      { error: adminCheck.error },
      { status: adminCheck.status }
    );
  }

  try {
    const gifts = await prisma.giftTemplate.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ gifts });
  } catch (error) {
    console.error('Failed to fetch gifts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gifts' },
      { status: 500 }
    );
  }
}

// POST - Create new gift template
export async function POST(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if ('error' in adminCheck) {
    return NextResponse.json(
      { error: adminCheck.error },
      { status: adminCheck.status }
    );
  }

  try {
    const body = await request.json();
    const {
      title_en,
      title_ru,
      description_en,
      description_ru,
      imageUrl,
      affiliateUrl,
      priceMin,
      priceMax,
      currency,
      tags,
      occasionTags,
      relationshipTags,
      profitabilityScore,
      isActive,
    } = body;

    const gift = await prisma.giftTemplate.create({
      data: {
        title_en,
        title_ru,
        description_en,
        description_ru,
        imageUrl,
        affiliateUrl,
        priceMin,
        priceMax,
        currency: currency || 'USD',
        tags: tags || [],
        occasionTags: occasionTags || [],
        relationshipTags: relationshipTags || [],
        profitabilityScore: profitabilityScore || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ gift }, { status: 201 });
  } catch (error) {
    console.error('Failed to create gift:', error);
    return NextResponse.json(
      { error: 'Failed to create gift' },
      { status: 500 }
    );
  }
}

// PUT - Update gift template
export async function PUT(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if ('error' in adminCheck) {
    return NextResponse.json(
      { error: adminCheck.error },
      { status: adminCheck.status }
    );
  }

  try {
    const body = await request.json();
    const {
      id,
      title_en,
      title_ru,
      description_en,
      description_ru,
      imageUrl,
      affiliateUrl,
      priceMin,
      priceMax,
      currency,
      tags,
      occasionTags,
      relationshipTags,
      profitabilityScore,
      isActive,
    } = body;

    const gift = await prisma.giftTemplate.update({
      where: { id },
      data: {
        title_en,
        title_ru,
        description_en,
        description_ru,
        imageUrl,
        affiliateUrl,
        priceMin,
        priceMax,
        currency,
        tags,
        occasionTags,
        relationshipTags,
        profitabilityScore,
        isActive,
      },
    });

    return NextResponse.json({ gift });
  } catch (error) {
    console.error('Failed to update gift:', error);
    return NextResponse.json(
      { error: 'Failed to update gift' },
      { status: 500 }
    );
  }
}

// DELETE - Delete gift template
export async function DELETE(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if ('error' in adminCheck) {
    return NextResponse.json(
      { error: adminCheck.error },
      { status: adminCheck.status }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  try {
    await prisma.giftTemplate.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete gift:', error);
    return NextResponse.json(
      { error: 'Failed to delete gift' },
      { status: 500 }
    );
  }
}
