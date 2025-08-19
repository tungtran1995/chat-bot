import { Bot } from "lucide-react";
import { useRef, useEffect } from "react";

interface MessageListProps {
  messages: IChat[];
  isTyping: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full"
    >
      <div className="space-y-6">
        {messages.map((msg, id) => (
          <div key={id} className="space-y-4">
            {msg.role === "user" && (
              <div className="flex justify-end">
                <div className="bg-purple-600 text-white px-4 py-3 rounded-2xl max-w-2xl">
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            )}
            {msg.role === "system" && msg.content && (
              <div className="flex justify-center">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {msg.content}
                  </h2>
                </div>
              </div>
            )}
            {msg.role === "assistant" && msg.content && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* typing animation */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
