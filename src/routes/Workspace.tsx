"use client";

import { useState } from "react";
import { ChevronDown, Play, Plus, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import PromptLibrarySidebar from "../components/prompt-library-sidebar";
import PromptEditor from "../components/prompt-editor";
import ResponseViewer from "../components/response-viewer";
import RunHistoryPanel from "../components/run-history-panel";
import AIPromptEditor from "../components/ai-prompt-editor";

export default function Workspace() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(
    "Summarize the following text in 3 key points:\n\n{{user_text}}"
  );
  const [responseSchema, setResponseSchema] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4-turbo");
  const [selectedProvider, setSelectedProvider] = useState("OpenAI");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [isRunning, setIsRunning] = useState(false);
  const [response, setResponse] = useState("");
  const [responseTab, setResponseTab] = useState("output");

  const [costConfigs] = useState({
    "gpt-4-turbo": { input: 0.03, output: 0.06, cached: 0.0075 },
    "gpt-4": { input: 0.03, output: 0.06, cached: 0.0075 },
    "claude-3-sonnet": { input: 0.003, output: 0.015, cached: 0.00075 },
  });

  const [tokenUsage, setTokenUsage] = useState({
    prompt: 0,
    completion: 0,
    cached: 0,
    total: 0,
    costUSD: 0,
    costINR: 0,
  });

  const calculateCost = (
    promptTokens: number,
    completionTokens: number,
    cachedTokens = 0
  ) => {
    const config =
      costConfigs[selectedModel as keyof typeof costConfigs] ||
      costConfigs["gpt-4-turbo"];

    const inputCost = (promptTokens / 1_000_000) * config.input;
    const outputCost = (completionTokens / 1_000_000) * config.output;
    const cachedCost = (cachedTokens / 1_000_000) * config.cached;

    const totalUSD = inputCost + outputCost + cachedCost;
    const totalINR = totalUSD * 83;

    return { totalUSD, totalINR };
  };

  const handleRun = async () => {
    setIsRunning(true);
    // Simulate API call
    setTimeout(() => {
      setResponse(
        "This is a simulated response from the AI model. The prompt was successfully executed with the selected parameters."
      );
      const promptTokens = 45;
      const completionTokens = 82;
      const cachedTokens = 0;

      const { totalUSD, totalINR } = calculateCost(
        promptTokens,
        completionTokens,
        cachedTokens
      );

      setTokenUsage({
        prompt: promptTokens,
        completion: completionTokens,
        cached: cachedTokens,
        total: promptTokens + completionTokens + cachedTokens,
        costUSD: totalUSD,
        costINR: totalINR,
      });
      setIsRunning(false);
    }, 1500);
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Orbit</span>
          </div>

          {/* Workspace Selector */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border hover:bg-secondary transition-colors text-sm">
            <span>Workspace</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* New Prompt Button */}
          <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            New Prompt
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {/* API Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Connected</span>
          </div>

          {/* Token Balance */}
          <div className="px-3 py-1.5 rounded-md bg-card border border-border text-xs flex items-center gap-1">
            <span>Credits:</span>
            <span className="font-semibold">1,245</span>
          </div>

          {/* Profile */}
          <button className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
            U
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <PromptLibrarySidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Center and Right Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Provider Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Provider:
                </span>
                <button className="px-3 py-1.5 rounded-md bg-card border border-border hover:bg-secondary transition-colors text-sm flex items-center gap-2">
                  {selectedProvider}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Model Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Model:
                </span>
                <button className="px-3 py-1.5 rounded-md bg-card border border-border hover:bg-secondary transition-colors text-sm flex items-center gap-2">
                  {selectedModel}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              {/* Temperature */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Temp:
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) =>
                    setTemperature(Number.parseFloat(e.target.value))
                  }
                  className="w-20 h-1.5 rounded-lg appearance-none bg-card border border-border cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #1e1e1e 0%, #6b46c1 ${
                      (temperature / 2) * 100
                    }%, #1e1e1e ${(temperature / 2) * 100}%, #1e1e1e 100%)`,
                  }}
                />
                <span className="text-xs w-6 text-right">
                  {temperature.toFixed(1)}
                </span>
              </div>

              {/* Max Tokens */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Max:
                </label>
                <input
                  type="number"
                  value={maxTokens}
                  onChange={(e) =>
                    setMaxTokens(Number.parseInt(e.target.value))
                  }
                  className="w-16 px-2 py-1.5 rounded-md bg-input border border-border text-sm outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              {/* Run Button */}
              <Button
                onClick={handleRun}
                disabled={isRunning}
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-transparent border-t-primary-foreground border-r-primary-foreground rounded-full animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Editor and Response Split View */}
          <div className="flex-1 flex gap-4 overflow-hidden p-4">
            {/* Prompt Editor */}
            <div className="flex-1 flex flex-col gap-3">
              <PromptEditor
                value={currentPrompt}
                onChange={setCurrentPrompt}
                responseSchema={responseSchema}
                onResponseSchemaChange={setResponseSchema}
              />
              {/* AI Prompt Editor */}
              <AIPromptEditor
                currentPrompt={currentPrompt}
                onUpdate={setCurrentPrompt}
              />
            </div>

            {/* Response Viewer */}
            <ResponseViewer
              response={response}
              isLoading={isRunning}
              tab={responseTab}
              onTabChange={setResponseTab}
              tokenUsage={tokenUsage}
              onCopy={handleCopyResponse}
            />
          </div>

          {/* Bottom Run History */}
          <RunHistoryPanel
            open={historyOpen}
            onToggle={() => setHistoryOpen(!historyOpen)}
          />
        </div>
      </div>
    </div>
  );
}
