"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, Trash2, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

interface SDKKey {
  id: string;
  promptName: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
  isVisible: boolean;
}

export default function SDKKeyManagement() {
  const [keys, setKeys] = useState<SDKKey[]>([
    {
      id: "1",
      promptName: "Text Summarizer",
      key: "prompt_abc123def456",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isVisible: false,
    },
    {
      id: "2",
      promptName: "Code Reviewer",
      key: "prompt_xyz789uvw012",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isVisible: false,
    },
  ]);

  const [newPromptName, setNewPromptName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const generateKey = () => {
    return `prompt_${Math.random().toString(36).substr(2, 9)}${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  };

  const handleAddKey = () => {
    if (newPromptName.trim()) {
      setKeys([
        ...keys,
        {
          id: Date.now().toString(),
          promptName: newPromptName,
          key: generateKey(),
          createdAt: new Date(),
          isVisible: false,
        },
      ]);
      setNewPromptName("");
      setIsOpen(false);
    }
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const toggleVisibility = (id: string) => {
    setKeys(
      keys.map((k) => (k.id === id ? { ...k, isVisible: !k.isVisible } : k))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">SDK Keys</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Generate Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New SDK Key</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Prompt Name
                </label>
                <Input
                  placeholder="e.g., Text Summarizer"
                  value={newPromptName}
                  onChange={(e) => setNewPromptName(e.target.value)}
                />
              </div>
              <Button onClick={handleAddKey} className="w-full">
                Generate
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {keys.map((key) => (
          <div
            key={key.id}
            className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{key.promptName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {key.isVisible ? key.key : "•".repeat(20)}
                </span>
                <button
                  onClick={() => toggleVisibility(key.id)}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  {key.isVisible ? (
                    <EyeOff className="w-3 h-3" />
                  ) : (
                    <Eye className="w-3 h-3" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Created {key.createdAt.toLocaleDateString()} •{" "}
                {key.lastUsed
                  ? `Last used ${key.lastUsed.toLocaleDateString()}`
                  : "Never used"}
              </p>
            </div>
            <button
              onClick={() => handleCopyKey(key.key)}
              className="p-2 hover:bg-secondary rounded transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteKey(key.id)}
              className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
