import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPartnershipNotification } from '@/lib/email/sender';
import { z } from 'zod';

const partnershipSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  company: z.string().optional(),
  website: z.string().optional(),
  country: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = partnershipSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      );
    }

    const { name, email, company, website, country, message } = result.data;

    // Create partner request in database
    const partnerRequest = await prisma.partnerRequest.create({
      data: {
        name,
        email,
        company,
        website,
        country,
        message,
        status: 'NEW',
      },
    });

    // Send email notification
    await sendPartnershipNotification({
      name,
      email,
      company,
      website,
      country,
      message,
    });

    return NextResponse.json({
      success: true,
      id: partnerRequest.id,
    });
  } catch (error) {
    console.error('Partnership request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit partnership request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // This endpoint is for admin use - check auth
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { requireAdmin } = await import('@/lib/auth/session');
    await requireAdmin();

    const requests = await prisma.partnerRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Get partnerships error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partnerships' },
      { status: 500 }
    );
  }
}
