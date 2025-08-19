import { postLangChainQuestionsApiCall } from "@/apis/chat";
import { USER, SYSTEM, ASSISTANT } from "@/constans/constant";
import { ChatHeader } from "@/components/ChatHeader";
import { MessageList } from "@/components/MessageList";
import { MessageInput } from "@/components/MessageInput";
import { useRef, useState, useCallback } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IChat[]>([
    { role: SYSTEM, content: "How would you like me to help you?" },
  ]);
  const session_id = "default-session";
  const [isGenerating, setIsGenerating] = useState(false);
  const stopGeneratingRef = useRef(false);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;

    const userMessage: IChat = { role: USER, content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsGenerating(true);
    stopGeneratingRef.current = false;

    try {
      const res = await postLangChainQuestionsApiCall({
        dataToPost: { session_id, query: message },
      });

      if (!stopGeneratingRef.current && res?.status === 200) {
        const assistantMessage: IChat = {
          role: ASSISTANT,
          content: res.data.content,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [message]);

  const handleStopGenerating = () => {
    stopGeneratingRef.current = true;
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader />
      <MessageList messages={messages} isTyping={isGenerating} />
      <MessageInput
        message={message}
        onChange={setMessage}
        onSend={handleSendMessage}
        isGenerating={isGenerating}
        onStop={handleStopGenerating}
      />
    </div>
  );
}
