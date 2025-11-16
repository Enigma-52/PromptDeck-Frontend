"use client";

import { Zap, Settings, BarChart3 } from "lucide-react";
import { cn } from "../lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Editor",
      icon: Zap,
    },
    {
      href: "/prompts",
      label: "Management",
      icon: Settings,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
  ];

  return (
    <div className="w-20 border-r border-border bg-card/50 flex flex-col items-center py-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-8">
        <Zap className="w-4 h-4 text-primary-foreground" />
      </div>

      <nav className="flex-1 space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
