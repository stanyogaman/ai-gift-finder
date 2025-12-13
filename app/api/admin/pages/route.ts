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

// GET - Fetch all static pages
export async function GET(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if ('error' in adminCheck) {
    return NextResponse.json(
      { error: adminCheck.error },
      { status: adminCheck.status }
    );
  }

  try {
    const pages = await prisma.staticPage.findMany({
      orderBy: { slug: 'asc' },
    });

    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

// POST - Create new static page
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
      slug,
      title_en,
      title_ru,
      content_en,
      content_ru,
      metaTitle_en,
      metaTitle_ru,
      metaDescription_en,
      metaDescription_ru,
    } = body;

    const page = await prisma.staticPage.create({
      data: {
        slug,
        title_en,
        title_ru,
        content_en,
        content_ru,
        metaTitle_en,
        metaTitle_ru,
        metaDescription_en,
        metaDescription_ru,
      },
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    console.error('Failed to create page:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}

// PUT - Update static page
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
      slug,
      title_en,
      title_ru,
      content_en,
      content_ru,
      metaTitle_en,
      metaTitle_ru,
      metaDescription_en,
      metaDescription_ru,
    } = body;

    const page = await prisma.staticPage.update({
      where: { id },
      data: {
        slug,
        title_en,
        title_ru,
        content_en,
        content_ru,
        metaTitle_en,
        metaTitle_ru,
        metaDescription_en,
        metaDescription_ru,
      },
    });

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Failed to update page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

// DELETE - Delete static page
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
    await prisma.staticPage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
