import { Bot, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatHeader() {
  return (
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
  );
}
