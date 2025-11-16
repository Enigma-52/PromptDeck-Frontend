"use client";

import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface CostConfig {
  provider: string;
  model: string;
  inputCost: number;
  outputCost: number;
  cachedInputCost: number;
}

export default function CostCalculator() {
  const [costConfigs, setCostConfigs] = useState<CostConfig[]>([
    {
      provider: "OpenAI",
      model: "gpt-4-turbo",
      inputCost: 0.03,
      outputCost: 0.06,
      cachedInputCost: 0.0075,
    },
    {
      provider: "Anthropic",
      model: "claude-3-sonnet",
      inputCost: 0.003,
      outputCost: 0.015,
      cachedInputCost: 0.00075,
    },
  ]);

  const [selectedModel, setSelectedModel] = useState("gpt-4-turbo");
  const [promptTokens, setPromptTokens] = useState(100);
  const [completionTokens, setCompletionTokens] = useState(100);
  const [cachedPromptTokens, setCachedPromptTokens] = useState(0);
  const [iterations, setIterations] = useState(1);
  const [timeframe, setTimeframe] = useState("monthly"); // daily, weekly, monthly
  const [currency, setCurrency] = useState("usd");

  const currentConfig = costConfigs.find((c) => c.model === selectedModel);

  const calculateCost = () => {
    if (!currentConfig) return { usd: 0, inr: 0 };

    const inputCost = (promptTokens / 1_000_000) * currentConfig.inputCost;
    const outputCost =
      (completionTokens / 1_000_000) * currentConfig.outputCost;
    const cachedCost =
      (cachedPromptTokens / 1_000_000) * currentConfig.cachedInputCost;

    const singleRunCost = inputCost + outputCost + cachedCost;
    let totalCost = singleRunCost * iterations;

    if (timeframe === "daily") {
      totalCost *= 30; // Convert to monthly
    } else if (timeframe === "weekly") {
      totalCost *= 4.33; // Convert to monthly (average weeks per month)
    }

    const inr = totalCost * 83; // USD to INR conversion rate

    return { usd: totalCost, inr };
  };

  const { usd, inr } = calculateCost();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Cost Configuration</h3>

        <div className="space-y-4">
          {/* Model Selection */}
          <div>
            <label className="text-sm font-medium block mb-2">Model</label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {costConfigs.map((config) => (
                  <SelectItem key={config.model} value={config.model}>
                    {config.provider} - {config.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Cost Inputs */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Input (per 1M tokens)
              </label>
              <Input
                type="number"
                step="0.0001"
                value={currentConfig?.inputCost || 0}
                onChange={(e) => {
                  if (currentConfig) {
                    const newConfigs = costConfigs.map((c) =>
                      c.model === selectedModel
                        ? { ...c, inputCost: Number.parseFloat(e.target.value) }
                        : c
                    );
                    setCostConfigs(newConfigs);
                  }
                }}
                placeholder="0.03"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Output (per 1M tokens)
              </label>
              <Input
                type="number"
                step="0.0001"
                value={currentConfig?.outputCost || 0}
                onChange={(e) => {
                  if (currentConfig) {
                    const newConfigs = costConfigs.map((c) =>
                      c.model === selectedModel
                        ? {
                            ...c,
                            outputCost: Number.parseFloat(e.target.value),
                          }
                        : c
                    );
                    setCostConfigs(newConfigs);
                  }
                }}
                placeholder="0.06"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Cached Input (per 1M)
              </label>
              <Input
                type="number"
                step="0.0001"
                value={currentConfig?.cachedInputCost || 0}
                onChange={(e) => {
                  if (currentConfig) {
                    const newConfigs = costConfigs.map((c) =>
                      c.model === selectedModel
                        ? {
                            ...c,
                            cachedInputCost: Number.parseFloat(e.target.value),
                          }
                        : c
                    );
                    setCostConfigs(newConfigs);
                  }
                }}
                placeholder="0.0075"
              />
            </div>
          </div>

          {/* Token Usage */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium block mb-2">
                Prompt Tokens
              </label>
              <Input
                type="number"
                value={promptTokens}
                onChange={(e) =>
                  setPromptTokens(Number.parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">
                Completion Tokens
              </label>
              <Input
                type="number"
                value={completionTokens}
                onChange={(e) =>
                  setCompletionTokens(Number.parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">
                Cached Prompt Tokens
              </label>
              <Input
                type="number"
                value={cachedPromptTokens}
                onChange={(e) =>
                  setCachedPromptTokens(Number.parseInt(e.target.value))
                }
              />
            </div>
          </div>

          {/* Volume & Timeframe */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-2">
                Iterations
              </label>
              <Input
                type="number"
                value={iterations}
                onChange={(e) => setIterations(Number.parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">
                Timeframe
              </label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">
                    Daily (extrapolated to monthly)
                  </SelectItem>
                  <SelectItem value="weekly">
                    Weekly (extrapolated to monthly)
                  </SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Currency Selection */}
          <div>
            <label className="text-sm font-medium block mb-2">
              Display Currency
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrency("usd")}
                className={`flex-1 py-2 rounded-md border transition-colors ${
                  currency === "usd"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:bg-secondary"
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency("inr")}
                className={`flex-1 py-2 rounded-md border transition-colors ${
                  currency === "inr"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:bg-secondary"
                }`}
              >
                INR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <Card className="bg-primary/5 border-primary/20 p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          Estimated Monthly Cost
        </h4>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-primary">
            {currency === "usd" ? "$" : "₹"}
            {currency === "usd" ? usd.toFixed(4) : inr.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            {iterations} iteration{iterations !== 1 ? "s" : ""} •{" "}
            {promptTokens + cachedPromptTokens} prompt • {completionTokens}{" "}
            completion tokens
          </p>
          <div className="pt-2 border-t border-primary/10 mt-2 space-y-1">
            <p className="text-xs text-muted-foreground">
              Input Cost: $
              {(
                (promptTokens / 1_000_000) *
                (currentConfig?.inputCost || 0)
              ).toFixed(6)}
            </p>
            <p className="text-xs text-muted-foreground">
              Output Cost: $
              {(
                (completionTokens / 1_000_000) *
                (currentConfig?.outputCost || 0)
              ).toFixed(6)}
            </p>
            {cachedPromptTokens > 0 && (
              <p className="text-xs text-muted-foreground">
                Cached Cost: $
                {(
                  (cachedPromptTokens / 1_000_000) *
                  (currentConfig?.cachedInputCost || 0)
                ).toFixed(6)}
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
