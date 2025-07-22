"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, zksync, bsc } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "TSender",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [anvil, zksync, bsc],
  ssr: true,
});
