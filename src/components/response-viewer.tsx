"use client";

import { Copy, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";

interface ResponseViewerProps {
  response: string;
  isLoading: boolean;
  tab: string;
  onTabChange: (tab: string) => void;
  tokenUsage: {
    prompt: number;
    completion: number;
    cached: number;
    total: number;
    costUSD: number;
    costINR: number;
  };
  onCopy: () => void;
}

export default function ResponseViewer({
  response,
  isLoading,
  tab,
  onTabChange,
  tokenUsage,
  onCopy,
}: ResponseViewerProps) {
  return (
    <div className="flex-1 flex flex-col bg-card border border-border rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-border px-4">
        <div className="flex items-center">
          <button
            onClick={() => onTabChange("output")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "output"
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
            }`}
          >
            Output
          </button>
          <button
            onClick={() => onTabChange("json")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "json"
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
            }`}
          >
            JSON
          </button>
          <button
            onClick={() => onTabChange("cost")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "cost"
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
            }`}
          >
            Cost
          </button>
          <button
            onClick={() => onTabChange("logs")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "logs"
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
            }`}
          >
            Logs
          </button>
        </div>

        <div className="flex items-center gap-2 py-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onCopy}
            disabled={!response}
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-transparent border-t-primary border-r-primary rounded-full animate-spin"></div>
              <p className="text-sm text-muted-foreground">
                Streaming response...
              </p>
            </div>
          </div>
        ) : response ? (
          <div>
            {tab === "output" && (
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {response}
              </p>
            )}
            {tab === "json" && (
              <pre className="text-xs font-mono text-muted-foreground bg-secondary/20 p-3 rounded overflow-x-auto">
                {JSON.stringify({ response }, null, 2)}
              </pre>
            )}
            {tab === "cost" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary/20 rounded">
                  <span className="text-sm text-muted-foreground">
                    Prompt Tokens:
                  </span>
                  <span className="text-sm font-semibold">
                    {tokenUsage.prompt}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/20 rounded">
                  <span className="text-sm text-muted-foreground">
                    Completion Tokens:
                  </span>
                  <span className="text-sm font-semibold">
                    {tokenUsage.completion}
                  </span>
                </div>
                {tokenUsage.cached > 0 && (
                  <div className="flex items-center justify-between p-3 bg-secondary/20 rounded">
                    <span className="text-sm text-muted-foreground">
                      Cached Tokens:
                    </span>
                    <span className="text-sm font-semibold">
                      {tokenUsage.cached}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded border border-primary/20">
                  <span className="text-sm text-muted-foreground">
                    Total Tokens:
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {tokenUsage.total}
                  </span>
                </div>

                <div className="border-t border-border pt-3 mt-3 space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded border border-green-500/20">
                    <span className="text-sm text-muted-foreground">
                      Cost (USD):
                    </span>
                    <span className="text-sm font-semibold text-green-400">
                      ${tokenUsage.costUSD.toFixed(6)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded border border-blue-500/20">
                    <span className="text-sm text-muted-foreground">
                      Cost (INR):
                    </span>
                    <span className="text-sm font-semibold text-blue-400">
                      ₹{tokenUsage.costINR.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {tab === "logs" && (
              <div className="space-y-2 text-xs font-mono text-muted-foreground">
                <p className="text-primary">[INFO]</p>
                <p>Request sent at 2:45:32 PM</p>
                <p>Model: gpt-4-turbo</p>
                <p>Provider: OpenAI</p>
                <p className="text-green-400">[SUCCESS]</p>
                <p>Response received in 1.24s</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">
              Run a prompt to see results here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
