import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season');

    const photos = await prisma.photo.findMany({
      include: {
        category: true,
      },
      where: season ? {
        category: {
          season: season,
        },
      } : undefined,
    });
    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Error fetching photos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const categoryId = formData.get('categoryId') as string;
    const alt = formData.get('alt') as string;
    const season = formData.get('season') as string;

    if (!file || !categoryId || !season) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }
    } catch (error) {
      console.error('Error creating uploads directory:', error);
      return NextResponse.json(
        { error: 'Failed to create uploads directory' },
        { status: 500 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${file.name}`;
    const filePath = join(uploadDir, uniqueFilename);
    
    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      console.error('Error saving file:', error);
      return NextResponse.json(
        { error: 'Failed to save file' },
        { status: 500 }
      );
    }

    // Update the category's season if needed
    try {
      await prisma.photoCategory.update({
        where: { id: parseInt(categoryId) },
        data: { season }
      });
    } catch (error) {
      console.error('Error updating category season:', error);
      // Continue anyway as this is not critical
    }

    // Create photo record in database
    try {
      const photo = await prisma.photo.create({
        data: {
          url: `/uploads/${uniqueFilename}`,
          alt: alt || file.name,
          categoryId: parseInt(categoryId),
        },
        include: {
          category: true
        }
      });
      return NextResponse.json(photo);
    } catch (error) {
      console.error('Error creating photo record:', error);
      return NextResponse.json(
        { error: 'Failed to create photo record' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in photo upload process:', error);
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }

    const photo = await prisma.photo.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(photo);
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Error deleting photo' },
      { status: 500 }
    );
  }
} 