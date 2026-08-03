import { AI_CONFIG } from '@/core/config/aiConfig';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface IChatHistory {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const chatService = {
  async chat(message: string, history: IChatHistory[] = [], systemPrompt: string = "") {
    if (!GEMINI_API_KEY) {
      console.error("VITE_GEMINI_API_KEY is not defined in .env");
      return "Cấu hình Gemini API chưa sẵn sàng. Vui lòng kiểm tra lại tệp .env";
    }

    try {
      const contents = history.map(item => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: item.content }]
      }));

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await fetch(`${AI_CONFIG.BASE_URL}/${AI_CONFIG.MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: systemPrompt ? {
            parts: [{ text: systemPrompt }]
          } : undefined,
          generationConfig: AI_CONFIG.GENERATION_CONFIG
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Lỗi bất định từ Google Gemini");
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const text = data.candidates[0].content.parts.map((p: { text: string }) => p.text).join("");
        return text.replace(/\*/g, '');
      }
      
      return "Tôi không nhận được phản hồi hợp lệ từ AI.";
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Lỗi gọi Gemini:", errorMessage);
      return `Xin lỗi, tôi gặp chút trục trặc với Gemini: ${errorMessage}. Bạn vui lòng liên hệ trực tiếp qua email nhé!`;
    }
  }
};
