// src/lib/checkTokenHolding.ts
import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";

// RPC: your Helius key or fallback
const RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC || "https://api.mainnet-beta.solana.com";

// Mint from env (required)
const MINT_STR = process.env.NEXT_PUBLIC_TOKEN2050_MINT;
if (!MINT_STR) {
  throw new Error(
    "Missing NEXT_PUBLIC_TOKEN2050_MINT in .env.local (must be a valid token mint address)."
  );
}

// Validate the mint once at module load
let TOKEN_MINT: PublicKey;
try {
  TOKEN_MINT = new PublicKey(MINT_STR);
} catch {
  throw new Error(
    `NEXT_PUBLIC_TOKEN2050_MINT is not a valid Solana public key: "${MINT_STR}"`
  );
}

// 2.5M tokens (adjust anytime)
export const MIN_TOKENS = 2_500_000;
const DECIMALS = 9; // most SPL tokens

export async function checkToken2050Holding(walletAddress: PublicKey): Promise<{
  isPremium: boolean;
  amount: number; // human-readable (decimals applied)
}> {
  const connection = new Connection(RPC_ENDPOINT, "confirmed");

  try {
    // Associated Token Account for this mint & wallet
    const ata = await getAssociatedTokenAddress(TOKEN_MINT, walletAddress, false);
    const tokenAccount = await getAccount(connection, ata);

    // Normalize using decimals
    const raw = BigInt(tokenAccount.amount.toString()); // safe for big balances
    const amount = Number(raw) / 10 ** DECIMALS;

    return { isPremium: amount >= MIN_TOKENS, amount };
  } catch (err) {
    // Most common case: no ATA exists -> balance = 0
    return { isPremium: false, amount: 0 };
  }
}
