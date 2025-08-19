import { Plus, Paperclip, Edit3, Camera, Settings, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  message: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isGenerating?: boolean;
  onStop?: () => void;
}

export function MessageInput({
  message,
  onChange,
  onSend,
  isGenerating = false,
  onStop,
}: MessageInputProps) {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
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

              {isGenerating && onStop ? (
                <Button
                  className="bg-red-600 hover:bg-red-500 text-white rounded-lg p-2 h-8 w-24"
                  onClick={onStop}
                >
                  Stop
                </Button>
              ) : (
                <Button
                  onClick={onSend}
                  disabled={!message.trim()}
                  className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg p-2 h-8 w-8 disabled:opacity-50 disabled:hover:bg-gray-900"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
