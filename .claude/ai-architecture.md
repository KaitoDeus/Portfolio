# AI Integration Architecture - kaitodeus Portfolio

Comprehensive architectural specification for the AI Chat Assistant subsystem, Google Gemini integration, prompt design, security topology, and streaming protocols.

---

## 1. System Topology & Architecture Flow

The AI integration follows a **Secure Proxy / Backend-for-Frontend (BFF)** pattern to isolate LLM credentials from client browsers while ensuring responsive, contextual interactions.

```text
+--------------------------------------------------------------------------------+
|                                CLIENT LAYER                                    |
|                                                                                |
|   +--------------------------+                 +---------------------------+   |
|   |  ContactPage UI Section  | <-------------> |  ChatMessage Component    |   |
|   |  (Quick prompts, Input)  |                 |  (Link parsing, Avatar)   |   |
|   +--------------------------+                 +---------------------------+   |
|                 |                                                              |
|                 v                                                              |
|   +--------------------------+                                                 |
|   |      ChatService         | (Calls internal Next.js API via POST)           |
|   +--------------------------+                                                 |
+-----------------|--------------------------------------------------------------+
                  |  fetch('/api/chat', { message, history, systemPrompt })
                  v
+--------------------------------------------------------------------------------+
|                         NEXT.JS SERVER LAYER                                   |
|                                                                                |
|   +------------------------------------------------------------------------+   |
|   |  Route Handler: src/app/api/chat/route.ts                              |   |
|   |                                                                        |   |
|   |  1. Validate payload (message, conversation history)                   |   |
|   |  2. Retrieve server-only GEMINI_API_KEY from process.env               |   |
|   |  3. Map roles: user -> "user", assistant -> "model"                    |   |
|   |  4. Attach system instruction & generation hyperparameters             |   |
|   |  5. Forward sanitized request to Google Gemini API                     |   |
|   +------------------------------------------------------------------------+   |
+-----------------|--------------------------------------------------------------+
                  |  POST https://generativelanguage.googleapis.com/v1beta/models/...
                  v
+--------------------------------------------------------------------------------+
|                      EXTERNAL AI PROVIDER (Google Gemini)                      |
|                                                                                |
|   +------------------------------------------------------------------------+   |
|   |  Model: gemini-2.5-flash                                               |   |
|   |  - Context window processing                                           |   |
|   |  - Grounded output generation based on portfolio context               |   |
|   +------------------------------------------------------------------------+   |
+--------------------------------------------------------------------------------+
```

---

## 2. API Contract & Interface Specifications

### 2.1 Route Handler: `POST /api/chat`
- **Location**: `src/app/api/chat/route.ts`
- **Authentication**: Key-based server-side authentication with Google Generative AI API.

#### Request Schema:
```typescript
interface IChatRequest {
  message: string;
  history?: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  systemPrompt?: string;
}
```

#### Response Schemas:
**Success (HTTP 200)**:
```json
{
  "text": "Vo Anh Khai is a third-year IT student at UTH specializing in Fullstack and Software Development."
}
```

**Validation / Server Error (HTTP 400 / 500)**:
```json
{
  "error": "Detailed error message"
}
```

---

## 3. Configuration & Generation Hyperparameters

Defined in `src/core/config/aiConfig.ts`:

```typescript
export const AI_CONFIG = {
  MODEL: 'gemini-2.5-flash',
  BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models',
  GENERATION_CONFIG: {
    temperature: 0.7,        // Balances creativity and factual accuracy
    maxOutputTokens: 512,    // Enforces concise responses suited for chat bubbles
  },
};
```

---

## 4. Prompt Engineering & Grounding Architecture

To guarantee high factual accuracy and avoid hallucinations, the system injects dynamic context derived from the single source of truth (`portfolioData.ts`):

```typescript
const systemPrompt = `You are a helpful AI assistant for ${name}'s portfolio (English: Khai, Vietnamese: Khải). 
Your goal is to provide helpful, polite, and detailed information about Khải's skills, projects, and professional background.

About Khải:
- Software Engineer student at UTH.
- Interests: Game Development, Fullstack Web, and AI.
- Core Skills: ${skills.map(s => s.name).join(', ')}.

Projects Highlights:
${projects.map(p => `- ${p.title}: Built with ${p.technologies.join(', ')}.`).join('\n')}

Contact & Links:
- LinkedIn: ${socialLinks.find(l => l.platform === 'linkedin')?.url || 'N/A'}
- GitHub: ${socialLinks.find(l => l.platform === 'github')?.url || 'N/A'}
- Email: mailto:${socialLinks.find(l => l.platform === 'mail')?.url.replace('mailto:', '') || 'N/A'}

Guidelines:
- ALWAYS keep each link on a NEW SEPARATE LINE.
- Keep responses very concise (1-3 sentences).
- Speak in the language used by the visitor (Vietnamese or English).
- Be friendly and helpful.
- Use plain text only (no bold, italics, or # symbols). Keep it simple.`;
```

---

## 5. Security Architecture & Threat Mitigation

| Security Aspect | Mitigation Strategy |
| :--- | :--- |
| **API Key Exposure** | Stored strictly in `.env` as `GEMINI_API_KEY` and consumed only by server-side Route Handlers. Never prefixed with `NEXT_PUBLIC_` in client code. |
| **Prompt Injection** | Fixed system instructions dictate behavior boundaries; untrusted user messages are encapsulated within the `user` turn. |
| **Denial of Service / Quota Abuse** | Rate limiting / token budgeting via `maxOutputTokens: 512` and short timeout configurations. |
| **CORS & Origin Safety** | `/api/chat` is an internal route within the same Next.js origin, restricting external third-party execution. |

---

## 6. Extensibility Roadmap

1. **Streaming Responses**: Upgrade `/api/chat` to use `ReadableStream` with Server-Sent Events (SSE) or `@ai-sdk/react` for token-by-token streaming UI.
2. **Multi-Model Provider Adapter**: Implement a unified `LLMProvider` interface to allow seamless fallback between Gemini, Anthropic Claude, and OpenAI.
3. **Retrieval-Augmented Generation (RAG)**: Index project documentation, blog posts, and code repositories using embeddings for deep Q&A capability.
