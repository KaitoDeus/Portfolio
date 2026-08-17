import { NextResponse } from 'next/server';
import { AI_CONFIG } from '@/core/config/aiConfig';

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY ||
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  process.env.VITE_GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { message, history = [], systemPrompt = '' } = await req.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured on the server. Please check .env' },
        { status: 500 }
      );
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const contents = history.map((item: { role: string; content: string }) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }],
    }));

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await fetch(
      `${AI_CONFIG.BASE_URL}/${AI_CONFIG.MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: systemPrompt
            ? {
                parts: [{ text: systemPrompt }],
              }
            : undefined,
          generationConfig: AI_CONFIG.GENERATION_CONFIG,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error?.message || `Gemini API responded with status ${response.status}`;
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const text = data.candidates[0].content.parts
        .map((p: { text: string }) => p.text)
        .join('');
      return NextResponse.json({ text: text.replace(/\*/g, '') });
    }

    return NextResponse.json({ text: 'Không nhận được phản hồi hợp lệ từ AI.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in /api/chat:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
