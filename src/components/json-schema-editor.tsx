"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../components/ui/button";

interface JSONSchemaEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const SCHEMA_TEMPLATES = {
  empty: {
    type: "object",
    properties: {},
    required: [],
  },
  article: {
    type: "object",
    properties: {
      title: { type: "string", description: "Article title" },
      summary: { type: "string", description: "Brief summary" },
      keyPoints: {
        type: "array",
        items: { type: "string" },
        description: "Main key points",
      },
      sentiment: {
        type: "string",
        enum: ["positive", "neutral", "negative"],
        description: "Sentiment analysis",
      },
    },
    required: ["title", "summary", "keyPoints"],
  },
  user: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      age: { type: "integer", minimum: 0 },
      active: { type: "boolean" },
    },
    required: ["name", "email"],
  },
};

export default function JSONSchemaEditor({
  value,
  onChange,
}: JSONSchemaEditorProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleValidate = () => {
    try {
      JSON.parse(value);
      setError("");
    } catch (err) {
      setError("Invalid JSON schema");
    }
  };

  const handleTemplateSelect = (template: keyof typeof SCHEMA_TEMPLATES) => {
    const schemaJson = JSON.stringify(SCHEMA_TEMPLATES[template], null, 2);
    onChange(schemaJson);
    setError("");
  };

  return (
    <div className="flex-1 flex flex-col bg-input overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-border bg-secondary/30 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            TEMPLATES:
          </span>
          <button
            onClick={() => handleTemplateSelect("empty")}
            className="px-2 py-1 text-xs rounded bg-card border border-border hover:bg-secondary transition-colors"
          >
            Empty
          </button>
          <button
            onClick={() => handleTemplateSelect("article")}
            className="px-2 py-1 text-xs rounded bg-card border border-border hover:bg-secondary transition-colors"
          >
            Article
          </button>
          <button
            onClick={() => handleTemplateSelect("user")}
            className="px-2 py-1 text-xs rounded bg-card border border-border hover:bg-secondary transition-colors"
          >
            User
          </button>
        </div>

        <div className="flex items-center gap-2">
          {error && <span className="text-xs text-red-500">{error}</span>}
          <Button
            size="sm"
            variant="outline"
            onClick={handleValidate}
            className="h-7 text-xs bg-transparent"
          >
            Validate
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="h-7 text-xs gap-1 bg-transparent"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setError("");
        }}
        onBlur={handleValidate}
        className="flex-1 p-4 bg-input border-0 text-sm font-mono text-foreground placeholder-muted-foreground outline-none resize-none focus:ring-1 focus:ring-accent"
        placeholder={`{
  "type": "object",
  "properties": {
    "field_name": { "type": "string" },
    "field_number": { "type": "number" }
  },
  "required": ["field_name"]
}`}
        spellCheck="false"
      />

      {/* Info Footer */}
      <div className="border-t border-border bg-secondary/30 px-4 py-3 text-xs text-muted-foreground">
        <p>
          Define a JSON Schema to enforce structured output from the AI model.
          The model will return responses that strictly match this schema
          structure.
        </p>
      </div>
    </div>
  );
}
