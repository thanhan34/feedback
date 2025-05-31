import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '../../utils/initializeData';

export async function GET(request: NextRequest) {
  try {
    // Check for a secret key to prevent unauthorized initialization
    const { searchParams } = new URL(request.url);
    const secretKey = searchParams.get('key');
    
    // Simple security check - in a real app, use a more secure approach
    if (secretKey !== 'initialize-database-secret') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const result = await initializeDatabase();
    
    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Database initialized successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to initialize database',
          error: result.error
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in initialization API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error during initialization',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
