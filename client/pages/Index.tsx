import { useState } from "react";
import {
  Send,
  Plus,
  Settings,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Bot,
  Paperclip,
  Mic,
  Edit3,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Index() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant" as const,
      content: "How can I help you today?",
      subtitle:
        "I'm here to assist you with any questions or tasks you might have.",
    },
    {
      id: 2,
      type: "user" as const,
      content:
        "Can you help me write a professional email to my team about the upcoming project deadline?",
    },
    {
      id: 3,
      type: "assistant" as const,
      content: `I'd be happy to help you write a professional email about the project deadline.`,
      showFeedback: true,
    },
    {
      id: 4,
      type: "user" as const,
      content: "That's perfect! Can you make it a bit more urgent in tone?",
    },
    {
      id: 5,
      type: "assistant" as const,
      content: `I'd be happy to help you write a professional email about the project deadline.`,
      showFeedback: true,
    },
    {
      id: 6,
      type: "user" as const,
      content: "That's perfect! Can you make it a bit more urgent in tone?",
    },
    {
      id: 7,
      type: "assistant" as const,
      content: `I'd be happy to help you write a professional email about the project deadline.`,
      showFeedback: true,
    },
    {
      id: 8,
      type: "user" as const,
      content: "That's perfect! Can you make it a bit more urgent in tone?",
    },
    {
      id: 39,
      type: "assistant" as const,
      content: `I'd be happy to help you write a professional email about the project deadline.`,
      showFeedback: true,
    },
    {
      id: 10,
      type: "user" as const,
      content: "That's perfect! Can you make it a bit more urgent in tone?",
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: message,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setIsTyping(true);

      // Simulate API response delay
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            type: "assistant" as const,
            content: "I understand your request. Let me help you with that!",
            showFeedback: true,
          },
        ]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900">ChatGPT</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              {msg.type === "user" && (
                <div className="bg-purple-600 text-white px-4 py-3 rounded-2xl max-w-2xl ml-auto">
                  <p className="text-sm">{msg.content}</p>
                </div>
              )}

              {msg.type === "assistant" && msg.subtitle && (
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {msg.content}
                    </h2>
                    <p className="text-gray-600 text-sm">{msg.subtitle}</p>
                  </div>
                </div>
              )}

              {msg.type === "assistant" && !msg.subtitle && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-line">
                        {msg.content}
                      </p>

                      {msg.showFeedback && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900 text-xs h-8"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900 text-xs h-8"
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Good
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900 text-xs h-8"
                          >
                            <ThumbsDown className="w-3 h-3 mr-1" />
                            Bad
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator - Always at the end */}
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

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="border-2 border-blue-300 rounded-2xl bg-gray-50 p-4">
            <textarea
              value={message}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask Fusion..."
              className="w-full bg-transparent text-gray-900 placeholder-gray-500 resize-none focus:outline-none text-sm overflow-y-auto"
              rows={3}
              style={{ minHeight: "80px", maxHeight: "200px" }}
            />

            {/* Toolbar */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 p-2 h-8 w-8"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 p-2 h-8 w-8"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 p-2 h-8 w-8"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 p-2 h-8 w-8"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 p-2 h-8 w-8"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-purple-600 hover:bg-gray-800 text-white rounded-lg p-2 h-8 w-8 disabled:opacity-50 disabled:hover:bg-gray-900"
                >
                  <Send className="bg-purple-600w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
