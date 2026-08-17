import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import defaultData from '@/core/data/portfolioData.json';

const getFilePath = () => {
  const primaryPath = path.join(process.cwd(), 'src', 'core', 'data', 'portfolioData.json');
  return primaryPath;
};

export async function GET() {
  try {
    const filePath = getFilePath();
    let data;
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    } catch {
      // Fallback to bundled JSON data if file reading fails
      data = defaultData;
    }

    return NextResponse.json({
      data,
      isLocal: process.env.NODE_ENV !== 'production',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in GET /api/admin/portfolio:', errorMessage);
    return NextResponse.json({ error: `Failed to load portfolio data: ${errorMessage}` }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'File-based updates are disabled on production. Please perform updates locally and git push.' },
        { status: 403 }
      );
    }

    const payload = await req.json();

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid payload: Expected a valid portfolio data object.' }, { status: 400 });
    }

    const filePath = getFilePath();
    await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Saved changes to src/core/data/portfolioData.json successfully! Ready to git commit.',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in PUT /api/admin/portfolio:', errorMessage);
    return NextResponse.json({ error: `Failed to save data: ${errorMessage}` }, { status: 500 });
  }
}
