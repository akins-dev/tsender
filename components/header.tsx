// components/Header.tsx
"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Left side - Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight">TSender</span>
        </Link>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* GitHub button */}
          <Button
            asChild
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="GitHub repository"
          >
            <Link
              href="https://github.com/akins-dev/tsender"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
          </Button>

          {/* Wallet connect button */}
          <ConnectButton
            showBalance={false}
            accountStatus="address"
            chainStatus="icon"
          />
        </div>
      </div>
    </header>
  );
}
