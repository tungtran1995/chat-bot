import { useState } from 'react';
import { Send, Plus, Settings, Copy, ThumbsUp, ThumbsDown, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Index() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant' as const,
      content: "How can I help you today?",
      subtitle: "I'm here to assist you with any questions or tasks you might have."
    },
    {
      id: 2,
      type: 'user' as const,
      content: "Can you help me write a professional email to my team about the upcoming project deadline?"
    },
    {
      id: 3,
      type: 'assistant' as const,
      content: `I'd be happy to help you write a professional email about the project deadline. Here's a draft:

Subject: Important Update: Project Deadline Reminder

Dear Team,

I hope this email finds you well. I wanted to reach out regarding our upcoming project deadline on [Date].

Please ensure all deliverables are completed and submitted by the specified date. If you have any concerns or need additional support, please don't hesitate to reach out.

Thank you for your continued dedication.

Best regards,
[Your Name]`,
      showFeedback: true
    },
    {
      id: 4,
      type: 'user' as const,
      content: "That's perfect! Can you make it a bit more urgent in tone?"
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { 
        id: messages.length + 1, 
        type: 'user', 
        content: message 
      }]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              {msg.type === 'assistant' && (
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900">{msg.content}</h2>
                    {msg.subtitle && (
                      <p className="text-gray-600 text-sm">{msg.subtitle}</p>
                    )}
                  </div>
                </div>
              )}
              
              {msg.type === 'user' && (
                <div className="bg-purple-600 text-white px-4 py-3 rounded-2xl max-w-2xl ml-auto">
                  <p className="text-sm">{msg.content}</p>
                </div>
              )}
              
              {msg.type === 'assistant' && msg.content.includes('Subject:') && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <p className="text-gray-900 text-sm leading-relaxed">{msg.content}</p>
                      
                      {msg.showFeedback && (
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-xs h-8">
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-xs h-8">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Good
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-xs h-8">
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
          
          {/* Follow-up suggestion */}
          <div className="flex justify-end">
            <Button 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 text-sm"
            >
              That's perfect! Can you make it a bit more urgent in tone?
            </Button>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gray-900 rounded-2xl">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the component you want to create..."
              className="w-full bg-transparent text-white placeholder-gray-400 p-4 pr-12 rounded-2xl resize-none focus:outline-none text-sm"
              rows={1}
              style={{ minHeight: '52px' }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-lg p-0 disabled:opacity-50 disabled:hover:bg-purple-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
