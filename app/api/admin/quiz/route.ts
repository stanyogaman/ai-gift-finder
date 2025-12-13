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

// GET - Fetch all quiz questions
export async function GET(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if ('error' in adminCheck) {
    return NextResponse.json(
      { error: adminCheck.error },
      { status: adminCheck.status }
    );
  }

  try {
    const questions = await prisma.quizQuestion.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST - Create new quiz question
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
      key,
      type,
      title_en,
      title_ru,
      description_en,
      description_ru,
      options,
    } = body;

    // Get max order
    const maxOrder = await prisma.quizQuestion.aggregate({
      _max: { order: true },
    });

    const question = await prisma.quizQuestion.create({
      data: {
        key,
        type,
        title_en,
        title_ru,
        description_en,
        description_ru,
        options,
        order: (maxOrder._max.order || 0) + 1,
      },
    });

    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    console.error('Failed to create question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}

// PUT - Update quiz question
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
      key,
      type,
      title_en,
      title_ru,
      description_en,
      description_ru,
      options,
      order,
    } = body;

    const question = await prisma.quizQuestion.update({
      where: { id },
      data: {
        key,
        type,
        title_en,
        title_ru,
        description_en,
        description_ru,
        options,
        order,
      },
    });

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Failed to update question:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// DELETE - Delete quiz question
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
    await prisma.quizQuestion.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete question:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
