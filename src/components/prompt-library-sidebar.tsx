"use client";

import { useState } from "react";
import {
  Search,
  ChevronRight,
  FileText,
  Clock,
  ChevronLeft,
  Plus,
} from "lucide-react";
import { Button } from "../components/ui/button";

interface PromptLibrarySidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function PromptLibrarySidebar({
  open,
  onToggle,
}: PromptLibrarySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const prompts = [
    {
      id: 1,
      name: "Text Summarizer",
      lastRun: "2 hours ago",
      provider: "openai",
      folder: "Text",
    },
    {
      id: 2,
      name: "Code Reviewer",
      lastRun: "1 day ago",
      provider: "openai",
      folder: "Code",
    },
    {
      id: 3,
      name: "Email Writer",
      lastRun: "3 days ago",
      provider: "anthropic",
      folder: "Writing",
    },
    {
      id: 4,
      name: "Data Analyzer",
      lastRun: "1 week ago",
      provider: "openai",
      folder: "Data",
    },
  ];

  return (
    <div
      className={`${
        open ? "w-64" : "w-16"
      } border-r border-border bg-card/50 backdrop-blur-sm flex flex-col transition-all duration-300 overflow-hidden`}
    >
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        {open && (
          <span className="text-xs font-semibold uppercase tracking-wider">
            Prompts
          </span>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 hover:bg-secondary rounded-md transition-colors"
          aria-label="Toggle sidebar"
        >
          {open ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {open && (
        <>
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-md bg-input border border-border text-sm outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Prompts List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-3 space-y-2">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="p-3 rounded-md hover:bg-secondary transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {prompt.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {prompt.lastRun}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Prompt Button */}
          <div className="p-3 border-t border-border">
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 bg-transparent"
            >
              <Plus className="w-4 h-4" />
              New
            </Button>
          </div>
        </>
      )}

      {!open && (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
