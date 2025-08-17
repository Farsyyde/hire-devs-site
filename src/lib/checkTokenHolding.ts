// src/lib/checkTokenHolding.ts
import { Connection, PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getAccount,
  getMint,
} from "@solana/spl-token";

// -------------- Config --------------
const RPC_ENDPOINT =
  (process.env.NEXT_PUBLIC_SOLANA_RPC || "").trim() ||
  "https://api.mainnet-beta.solana.com";

// IMPORTANT: This must be the *mint address* of the 2050 token
const RAW_MINT = (process.env.NEXT_PUBLIC_TOKEN2050_MINT || "").trim();
if (!RAW_MINT) {
  throw new Error(
    "Missing NEXT_PUBLIC_TOKEN2050_MINT in env (must be a SPL token mint address)"
  );
}

let TOKEN_MINT: PublicKey;
try {
  TOKEN_MINT = new PublicKey(RAW_MINT);
} catch {
  throw new Error(
    `NEXT_PUBLIC_TOKEN2050_MINT is not a valid Solana public key: "${RAW_MINT}"`
  );
}

// How many tokens required (human units, not raw)
export const MIN_TOKENS = 2_500_000;

// -------------- Helpers --------------

// Cache decimals & connection so we don’t refetch every call
let _cachedDecimals: number | null = null;
let _connection: Connection | null = null;

function conn(): Connection {
  if (!_connection) _connection = new Connection(RPC_ENDPOINT, "confirmed");
  return _connection;
}

/**
 * Fetch token decimals once and cache.
 * Falls back to 6 if anything odd happens (your token is 6 decimals).
 */
async function getTokenDecimals(): Promise<number> {
  if (_cachedDecimals !== null) return _cachedDecimals;
  try {
    const mintInfo = await getMint(conn(), TOKEN_MINT);
    _cachedDecimals = mintInfo.decimals ?? 6;
  } catch {
    // Safe fallback for your token
    _cachedDecimals = 6;
  }
  return _cachedDecimals;
}

// -------------- Main API --------------

export async function checkToken2050Holding(
  walletAddress: PublicKey
): Promise<{ isPremium: boolean; amount: number }> {
  const connection = conn();

  try {
    // Get the user’s ATA for this mint
    const ata = await getAssociatedTokenAddress(TOKEN_MINT, walletAddress, false);
    const tokenAccount = await getAccount(connection, ata);

    const decimals = await getTokenDecimals();

    // Convert raw bigint -> human amount
    const raw = BigInt(tokenAccount.amount.toString());
    const human = Number(raw) / 10 ** decimals;

    return { isPremium: human >= MIN_TOKENS, amount: human };
  } catch {
    // Most common case: user does not have an ATA -> treat as 0 balance
    return { isPremium: false, amount: 0 };
  }
}
