import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeBases } from '@/lib/kb-search';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Perform search across both knowledge bases
    const results = searchKnowledgeBases(query);

    return NextResponse.json({
      query,
      results,
      total: results.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Use POST method to search',
    example: {
      method: 'POST',
      body: { query: 'your search term' }
    }
  });
}
