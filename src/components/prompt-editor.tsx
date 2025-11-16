"use client"

import { useState } from "react"
import JSONSchemaEditor from "./json-schema-editor"

interface PromptEditorProps {
  value: string
  onChange: (value: string) => void
  responseSchema?: string
  onResponseSchemaChange?: (schema: string) => void
}

export default function PromptEditor({
  value,
  onChange,
  responseSchema = "",
  onResponseSchemaChange,
}: PromptEditorProps) {
  const [activeTab, setActiveTab] = useState<"user" | "system" | "assistant" | "schema">("user")

  return (
    <div className="flex-1 flex flex-col bg-card border border-border rounded-lg overflow-hidden">
      {/* Editor Tabs */}
      <div className="flex items-center border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab("user")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "user"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          User
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "system"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          System
        </button>
        <button
          onClick={() => setActiveTab("assistant")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "assistant"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Assistant
        </button>
        <button
          onClick={() => setActiveTab("schema")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "schema"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Response Schema
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === "schema" ? (
          <JSONSchemaEditor value={responseSchema} onChange={onResponseSchemaChange || (() => {})} />
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 p-4 bg-input border-0 text-sm font-mono text-foreground placeholder-muted-foreground outline-none resize-none focus:ring-1 focus:ring-accent"
            placeholder="Write your prompt here..."
            spellCheck="false"
          />
        )}
      </div>

      {/* Variables Drawer */}
      <div className="border-t border-border bg-secondary/30 px-4 py-3">
        <details className="text-xs">
          <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground transition-colors">
            Variables (1)
          </summary>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-primary/20 text-primary font-mono text-xs">user_text</span>
              <input
                type="text"
                placeholder="Enter value..."
                className="flex-1 px-2 py-1 rounded-md bg-input border border-border text-xs outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}
