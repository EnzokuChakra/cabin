import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create response with success status
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Clear the auth cookie by setting it to expire immediately
    response.cookies.set('auth-token', '', {
      expires: new Date(0),
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
} 