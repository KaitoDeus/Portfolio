export interface IChatHistory {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const chatService = {
  async chat(message: string, history: IChatHistory[] = [], systemPrompt: string = "") {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history,
          systemPrompt,
        }),
      });

      const rawText = await response.text();
      let data: { text?: string; error?: string } = {};

      try {
        data = JSON.parse(rawText);
      } catch {
        data = { error: rawText.slice(0, 150) || `HTTP ${response.status}` };
      }

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data.text || "Tôi không nhận được phản hồi hợp lệ từ AI.";
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Lỗi gọi Gemini AI:", errorMessage);
      return `Xin lỗi, tôi gặp chút trục trặc khi kết nối với AI: ${errorMessage}. Bạn vui lòng liên hệ trực tiếp qua email nhé!`;
    }
  },
};
