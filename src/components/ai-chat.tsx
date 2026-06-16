import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, X, Send, Minimize2, Maximize2, RotateCcw } from "lucide-react";
import { postPublicJson, publicApiPath } from "@/lib/public-api";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

async function createConversation(): Promise<string> {
  const data = await postPublicJson<{ data?: { id?: string }; id?: string }>(
    "/api/v1/public-chat/conversations",
    { title: "Website Chat" },
    { idempotencyScope: "Website:PublicChatConversation" },
  );
  return (data.data?.id ?? data.id) as string;
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialise conversation on first open
  useEffect(() => {
    if (open && conversationId === null) {
      createConversation()
        .then(setConversationId)
        .catch(() => setError("Could not connect to AI. Please try again."));
    }
  }, [open, conversationId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const resetChat = useCallback(async () => {
    setMessages([]);
    setError(null);
    try {
      const id = await createConversation();
      setConversationId(id);
    } catch {
      setError("Could not reset chat.");
    }
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming || conversationId === null) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setStreaming(true);

    // Add placeholder for streaming assistant reply
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", streaming: true },
    ]);

    try {
      const res = await fetch(
        publicApiPath(`/api/v1/public-chat/conversations/${conversationId}/messages`),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        }
      );

      if (!res.ok) throw new Error("Request failed");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (!json) continue;
          try {
            const event = JSON.parse(json) as { content?: string; done?: boolean };
            if (event.content) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + event.content,
                    streaming: true,
                  };
                }
                return updated;
              });
            }
            if (event.done) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.role === "assistant") {
                  updated[updated.length - 1] = { ...last, streaming: false };
                }
                return updated;
              });
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch {
      setMessages((prev) => prev.filter((m) => !m.streaming));
      setError("Something went wrong. Please try again.");
    } finally {
      setStreaming(false);
    }
  }, [input, streaming, conversationId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const panelWidth = expanded ? "w-[420px]" : "w-[360px]";
  const panelHeight = expanded ? "h-[600px]" : "h-[500px]";

  const renderAssistantContent = (msg: Message) => {
    if (msg.streaming && msg.content.length === 0) {
      return (
        <div
          className="ai-chat-typing-indicator"
          role="status"
          aria-live="polite"
          aria-label="AICORE Assistant is thinking"
        >
          <span className="sr-only">AICORE Assistant is thinking</span>
          <span className="ai-chat-typing-text">Thinking</span>
          <span className="ai-chat-typing-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
      );
    }

    return (
      <>
        {msg.content}
        {msg.streaming && (
          <span
            className="ai-chat-stream-caret"
            aria-hidden="true"
          />
        )}
      </>
    );
  };

  return (
    <>
      {/* Floating trigger button */}
      {!open && (
        <button
          data-testid="btn-ai-chat-open"
          aria-label="Open AICORE AI Assistant"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 group"
          style={{ background: "linear-gradient(135deg, #1E5BFF 0%, #00D4FF 100%)" }}
        >
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "#1E5BFF", opacity: 0.25 }}
          />
          <Bot size={20} className="text-white relative z-10 sm:w-6 sm:h-6" />
          {/* Tooltip */}
          <span
            className="absolute right-16 whitespace-nowrap px-3 py-1.5 rounded-lg text-white text-xs font-semibold shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0"
            style={{ background: "#07111F", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Ask AICORE AI
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className={`ai-chat fixed bottom-4 right-2 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-1rem)] sm:${panelWidth} h-[70vh] sm:${panelHeight} max-w-[420px] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200`}
          style={{ background: "#07111F", border: "1px solid rgba(255,255,255,0.1)" }}
          data-testid="ai-chat-panel"
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1E5BFF 0%, #00D4FF 100%)" }}
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-none">AICORE Assistant</p>
              <p className="text-white/70 text-xs mt-0.5">Ask about our services</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                aria-label="Reset chat"
                onClick={resetChat}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                data-testid="btn-ai-chat-reset"
              >
                <RotateCcw size={14} />
              </button>
              <button
                aria-label={expanded ? "Shrink chat" : "Expand chat"}
                onClick={() => setExpanded((v) => !v)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                data-testid="btn-ai-chat-resize"
              >
                {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                data-testid="btn-ai-chat-close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 px-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(30,91,255,0.15)" }}
                >
                  <Bot size={22} style={{ color: "#00D4FF" }} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Hi, I'm the AICORE Assistant</p>
                  <p className="text-[#64748B] text-xs mt-1 leading-relaxed">
                    Ask me about our solutions, products, industries we serve, or how to get started.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-1">
                  {[
                    "What does AICORE build?",
                    "How do I start a project?",
                    "What industries do you serve?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => inputRef.current?.focus(), 50);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-[#94A3B8] hover:text-white hover:border-white/30 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5"
                    style={{ background: "rgba(30,91,255,0.2)" }}
                  >
                    <Bot size={12} style={{ color: "#00D4FF" }} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm"
                      : "text-[#CBD5E1] rounded-bl-sm"
                  }`}
                  style={
                    msg.role === "user"
                      ? { background: "#1E5BFF" }
                      : { background: "rgba(255,255,255,0.05)" }
                  }
                >
                  {msg.role === "assistant" ? renderAssistantContent(msg) : msg.content}
                </div>
              </div>
            ))}

            {error && (
              <p className="text-center text-xs text-red-400 py-1">{error}</p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex-shrink-0 px-3 py-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="flex items-end gap-2 rounded-xl px-3 py-2"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <textarea
                ref={inputRef}
                data-testid="ai-chat-input"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                disabled={streaming || conversationId === null}
                className="flex-1 bg-transparent text-white text-sm placeholder-[#475569] resize-none outline-none leading-relaxed disabled:opacity-50"
                style={{ maxHeight: 96 }}
              />
              <button
                data-testid="btn-ai-chat-send"
                onClick={sendMessage}
                disabled={!input.trim() || streaming || conversationId === null}
                aria-label="Send message"
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 hover:opacity-90"
                style={{ background: "#1E5BFF" }}
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
            <p className="text-[#334155] text-[10px] text-center mt-1.5">
              Powered by AICORE AI · Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
}
