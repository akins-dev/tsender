// components/TokenSender.tsx
"use client";

import { useMemo, useState } from "react";
import { Send, Shield, ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { chainsToTSender, erc20Abi } from "@/lib/constants";
import { useAccount, useChainId, useConfig } from "wagmi";
import { readContract } from "@wagmi/core";
import { calculateTotal } from "@/lib/utils";

export default function TokenSender() {
  const [mode, setMode] = useState<"safe" | "unsafe">("safe");
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const { total: totalWei, count } = useMemo(
    () => calculateTotal(amounts),
    [amounts]
  );

  // Mock token details
  const tokenDetails = {
    name: "T-Sender Token",
    decimals: 18,
    balance: "1000000000000000000", // 1 token in wei
  };

  // Parse recipients input
  const parsedRecipients = recipients
    .split(/[\n,]+/)
    .map((addr) => addr.trim())
    .filter(Boolean);

  const getApprovedAmount = async (
    tSenderAddress: string | null
  ): Promise<number> => {
    if (!tSenderAddress) {
      alert("No T-Sender address found for this chain.");
      return Promise.resolve(0);
    }

    // read from chain to see if we've approves enough tokens
    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });

    return response as number;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here

    // 1a. if already approved, move to step 2
    // 1b. If not, approve tsender contract to spend tokens
    // 2. call the airdrop function on the T-Sender contract
    // 3. wait for transaction to be mined
    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approvedAmount = await getApprovedAmount(tSenderAddress);

    console.log({
      mode,
      tokenAddress,
      recipients: parsedRecipients,
      amounts: totalWei,
      tSenderAddress,
      chainId,
      approvedAmount,
    });
    alert("Transaction submitted!");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          T-Sender
        </h1>
        <p className="text-muted-foreground mt-2">
          Batch token transfers made simple
        </p>
      </div>

      <Card className="w-full border border-blue-500 shadow-blue-400">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Token Transfer</CardTitle>

            <ToggleGroup
              type="single"
              value={mode}
              onValueChange={(value: "safe" | "unsafe") => setMode(value)}
              className="flex gap-2"
            >
              <ToggleGroupItem value="safe" className="px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Safe Mode
              </ToggleGroupItem>
              <ToggleGroupItem
                value="unsafe"
                className="hidden md:flex px-4 py-2"
              >
                <ShieldAlert className="h-4 w-4 mr-2" />
                Unsafe Mode
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Token Address */}
            <div className="space-y-2">
              <Label htmlFor="tokenAddress">Token Address</Label>
              <Input
                id="tokenAddress"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>

            {/* Recipients */}
            <div className="space-y-2">
              <Label htmlFor="recipients">
                Recipients (comma or new line separated)
              </Label>
              <Textarea
                id="recipients"
                placeholder="0x123..., 0x456..."
                className="min-h-[100px]"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                {parsedRecipients.length} recipient(s) detected
              </p>
            </div>

            <Separator />

            {/* Amounts */}
            <div className="space-y-2">
              <Label htmlFor="amounts">
                Amounts (wei; comma or new line separated)
              </Label>
              <Textarea
                id="amounts"
                placeholder="100, 200, 300..."
                className="min-h-[100px]"
                value={amounts}
                onChange={(e) => setAmounts(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                {count} amount(s) specified
              </p>
            </div>

            <Separator />

            {/* Transaction Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Transaction Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label>Token Name</Label>
                  <p className="text-gray-500">{tokenDetails.name}</p>
                </div>

                <div className="space-y-1">
                  <Label>Amount (wei)</Label>
                  <p className="text-gray-500">{totalWei.toLocaleString()}</p>
                </div>

                <div className="space-y-1">
                  <Label>Amount (tokens)</Label>
                  <p className="text-gray-500">0.29</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-start">
                  <ShieldAlert className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                  <p className="text-sm text-yellow-700">
                    {mode === "safe"
                      ? "Safe Mode: Each transaction will be executed individually with gas optimization."
                      : "Unsafe Mode: All transactions will be batched in a single call. Use with caution."}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-6 text-lg hover:cursor-pointer"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Tokens
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
