"use client"

import { ChevronUp, ChevronDown, Clock } from "lucide-react"

interface RunHistoryPanelProps {
  open: boolean
  onToggle: () => void
}

export default function RunHistoryPanel({ open, onToggle }: RunHistoryPanelProps) {
  const runs = [
    { id: 1, timestamp: "2:45 PM", model: "gpt-4-turbo", tokens: 127, preview: "This is a simulated response..." },
    { id: 2, timestamp: "2:32 PM", model: "gpt-4-turbo", tokens: 94, preview: "Previous run output preview..." },
    {
      id: 3,
      timestamp: "2:15 PM",
      model: "claude-3-sonnet",
      tokens: 156,
      preview: "Another result from earlier run...",
    },
  ]

  return (
    <div
      className={`border-t border-border bg-card/50 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
        open ? "h-32" : "h-12"
      }`}
    >
      {/* Header */}
      <div
        className="px-4 py-2 border-b border-border flex items-center justify-between cursor-pointer hover:bg-secondary/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider">Run History</span>
          <span className="text-xs text-muted-foreground">{runs.length} runs</span>
        </div>
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </div>

      {/* History List */}
      {open && (
        <div className="overflow-y-auto scrollbar-thin max-h-[calc(128px-44px)]">
          <div className="divide-y divide-border">
            {runs.map((run) => (
              <div key={run.id} className="px-4 py-2 hover:bg-secondary/50 transition-colors cursor-pointer text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">
                      {run.timestamp} • {run.model}
                    </p>
                    <p className="text-muted-foreground truncate mt-0.5">{run.preview}</p>
                  </div>
                  <span className="text-muted-foreground ml-2 flex-shrink-0">{run.tokens} tokens</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
