import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession, setSessionCookie } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, email, displayName, photoURL } = body;

    if (!uid) {
      return NextResponse.json({ error: 'UID required' }, { status: 400 });
    }

    // Upsert user in database
    const user = await prisma.user.upsert({
      where: { id: uid },
      update: {
        email,
        displayName,
        photoURL,
        updatedAt: new Date(),
      },
      create: {
        id: uid,
        email,
        displayName,
        photoURL,
        role: 'USER',
        locale: 'en',
        marketingConsent: false,
      },
    });

    // Create session token
    const token = await createSession({
      userId: user.id,
      email: user.email || undefined,
      role: user.role,
    });

    // Set session cookie
    await setSessionCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.role,
        locale: user.locale,
      },
      token,
    });
  } catch (error) {
    console.error('User sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { verifySession } = await import('@/lib/auth/session');
    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: user.role,
        locale: user.locale,
        marketingConsent: user.marketingConsent,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}
