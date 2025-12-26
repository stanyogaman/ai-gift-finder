import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToR2, generateUniqueFilename, validateImageFile } from '@/lib/r2-upload';
import { IMAGE_CATEGORIES } from '@/lib/r2-config';

// This API route handles image uploads to Cloudflare R2
// Protected route - add authentication in production

export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // const session = await getSession(request);
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || IMAGE_CATEGORIES.PRODUCTS;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Generate unique filename
    const filename = generateUniqueFilename(file.name, category);
    const path = `${category}/${filename}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    const url = await uploadImageToR2(buffer, path, file.type);

    return NextResponse.json({
      success: true,
      url,
      path,
      filename,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// Optional: DELETE endpoint to remove images
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add authentication check

    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json(
        { error: 'No path provided' },
        { status: 400 }
      );
    }

    // Note: Implement deleteImageFromR2 if needed
    // await deleteImageFromR2(path);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
