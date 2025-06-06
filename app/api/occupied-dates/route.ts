import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const occupiedDates = await prisma.occupiedDate.findMany({
      orderBy: {
        startDate: 'asc',
      },
    });

    return NextResponse.json(occupiedDates);
  } catch (error) {
    console.error('Error fetching occupied dates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch occupied dates' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { startDate, endDate } = await request.json();

    const occupiedDate = await prisma.occupiedDate.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(occupiedDate);
  } catch (error) {
    console.error('Error creating occupied date:', error);
    return NextResponse.json(
      { error: 'Failed to create occupied date' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.occupiedDate.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting occupied date:', error);
    return NextResponse.json(
      { error: 'Failed to delete occupied date' },
      { status: 500 }
    );
  }
} 