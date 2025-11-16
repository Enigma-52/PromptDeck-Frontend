"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

interface AIPromptEditorProps {
  currentPrompt: string;
  onUpdate: (newPrompt: string) => void;
}

export default function AIPromptEditor({
  currentPrompt,
  onUpdate,
}: AIPromptEditorProps) {
  const [editMode, setEditMode] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAIEdit = async () => {
    setIsLoading(true);
    // Simulate AI editing
    setTimeout(() => {
      const improvedPrompt = `${currentPrompt}\n\n[AI Enhanced: ${instruction}]`;
      onUpdate(improvedPrompt);
      setInstruction("");
      setEditMode(false);
      setIsLoading(false);
    }, 1500);
  };

  if (!editMode) {
    return (
      <Button
        onClick={() => setEditMode(true)}
        variant="outline"
        size="sm"
        className="gap-2 w-full"
      >
        <Sparkles className="w-4 h-4" />
        Edit with AI
      </Button>
    );
  }

  return (
    <div className="space-y-3 p-3 bg-secondary/30 rounded-lg border border-primary/20">
      <p className="text-xs font-medium text-foreground">
        What would you like to improve?
      </p>
      <Textarea
        placeholder="e.g., Make it more concise, Add examples, Focus on technical details..."
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        className="min-h-20"
      />
      <div className="flex gap-2">
        <Button
          onClick={handleAIEdit}
          disabled={isLoading || !instruction.trim()}
          size="sm"
          className="gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-3 h-3 border border-transparent border-t-primary-foreground rounded-full animate-spin" />
              Improving...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Improve
            </>
          )}
        </Button>
        <Button
          onClick={() => {
            setEditMode(false);
            setInstruction("");
          }}
          variant="ghost"
          size="sm"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
