"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "../lib/wagmi";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function Providers(props: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
