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

    const candidateModels = [
      AI_CONFIG.MODEL, // 'gemini-3.8-flash'
      'gemini-2.5-flash',
      'gemini-flash-latest',
    ];

    let lastError = 'No response from AI models';
    let lastStatus = 500;

    for (const model of candidateModels) {
      try {
        const response = await fetch(
          `${AI_CONFIG.BASE_URL}/${model}:generateContent?key=${GEMINI_API_KEY}`,
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
          lastError =
            errorData.error?.message || `Model ${model} responded with status ${response.status}`;
          lastStatus = response.status;
          console.warn(`[Gemini Chat] Model ${model} returned ${response.status}, attempting fallback...`);
          continue;
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          const text = data.candidates[0].content.parts
            .map((p: { text: string }) => p.text)
            .join('');
          return NextResponse.json({ 
            text: text.replace(/\*/g, ''),
            modelUsed: model,
          });
        }
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        console.warn(`[Gemini Chat] Request to ${model} failed, attempting next model:`, lastError);
      }
    }

    return NextResponse.json({ error: lastError }, { status: lastStatus });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in /api/chat:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
