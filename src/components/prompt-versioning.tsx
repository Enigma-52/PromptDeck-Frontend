"use client";

import { useState } from "react";
import { ChevronDown, Star, Check } from "lucide-react";
import { Button } from "../components/ui/button";

interface Version {
  id: string;
  version: number;
  content: string;
  changes: string;
  createdAt: Date;
  isMain: boolean;
}

interface PromptVersioningProps {
  promptName: string;
  currentVersion: number;
  versions: Version[];
  onSelectVersion: (versionId: string) => void;
  onMarkAsMain: (versionId: string) => void;
}

export default function PromptVersioning({
  promptName,
  currentVersion,
  versions,
  onSelectVersion,
  onMarkAsMain,
}: PromptVersioningProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{promptName}</h3>
          <p className="text-xs text-muted-foreground">
            Version {currentVersion}
          </p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-secondary rounded transition-colors"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="space-y-2 border-t border-border pt-3">
          {versions.map((version) => (
            <div
              key={version.id}
              className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer group"
              onClick={() => onSelectVersion(version.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">v{version.version}</p>
                  {version.isMain && (
                    <Star className="w-3 h-3 fill-primary text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {version.changes}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {version.createdAt.toLocaleDateString()}{" "}
                  {version.createdAt.toLocaleTimeString()}
                </p>
              </div>
              {!version.isMain && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsMain(version.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Mark as Main
                </Button>
              )}
              {version.isMain && <Check className="w-4 h-4 text-primary" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
