import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  });

  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { questions } = body as { questions: { id: string; order: number }[] };

    // Update all questions in a transaction
    await prisma.$transaction(
      questions.map((q) =>
        prisma.quizQuestion.update({
          where: { id: q.id },
          data: { order: q.order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reorder questions:', error);
    return NextResponse.json(
      { error: 'Failed to reorder questions' },
      { status: 500 }
    );
  }
}
