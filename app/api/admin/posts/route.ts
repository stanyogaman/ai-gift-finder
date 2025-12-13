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

// GET - Fetch all posts
export async function GET(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if ('error' in adminCheck) {
    return NextResponse.json(
      { error: adminCheck.error },
      { status: adminCheck.status }
    );
  }

  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Create new post
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
      excerpt_en,
      excerpt_ru,
      content_en,
      content_ru,
      featuredImage,
      categoryId,
      published,
    } = body;

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title_en,
        title_ru,
        excerpt_en,
        excerpt_ru,
        content_en,
        content_ru,
        featuredImage,
        categoryId: categoryId || null,
        published,
        publishedAt: published ? new Date() : null,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

// PUT - Update post
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
      excerpt_en,
      excerpt_ru,
      content_en,
      content_ru,
      featuredImage,
      categoryId,
      published,
      publishedAt,
    } = body;

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        slug,
        title_en,
        title_ru,
        excerpt_en,
        excerpt_ru,
        content_en,
        content_ru,
        featuredImage,
        categoryId: categoryId || null,
        published,
        publishedAt: published && !publishedAt ? new Date() : publishedAt,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete post
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
    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
