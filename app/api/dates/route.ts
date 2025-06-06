import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const dates = await prisma.datePrice.findMany({
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json(dates);
  } catch (error) {
    console.error('Error fetching dates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dates' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const datePrices = await request.json();

    // Delete all existing dates
    await prisma.datePrice.deleteMany();

    // Insert new dates
    const createdDates = await prisma.datePrice.createMany({
      data: datePrices.map((dp: { date: string; price: number }) => ({
        date: new Date(dp.date),
        price: dp.price,
      })),
    });

    return NextResponse.json(createdDates);
  } catch (error) {
    console.error('Error saving dates:', error);
    return NextResponse.json(
      { error: 'Failed to save dates' },
      { status: 500 }
    );
  }
} 