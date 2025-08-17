"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { checkToken2050Holding } from "@/lib/checkTokenHolding";

export default function PremiumPage() {
  const { publicKey } = useWallet();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  // null = loading spinner; true/false = final access state
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  // Watch Firebase login state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setFirebaseUser(user));
    return () => unsub();
  }, []);

  // Verify access whenever wallet/Firebase changes
  useEffect(() => {
    let cancelled = false;

    async function verify() {
      setHasAccess(null); // show "checking…"

      // No wallet and no Firebase user -> no access
      if (!publicKey && !firebaseUser) {
        if (!cancelled) {
          setHasAccess(false);
          setWalletBalance(null);
        }
        return;
      }

      if (publicKey) {
        try {
          const { isPremium, amount } = await checkToken2050Holding(publicKey);
          if (!cancelled) {
            setWalletBalance(amount);
            setHasAccess(isPremium || !!firebaseUser);
          }
        } catch {
          if (!cancelled) {
            setHasAccess(!!firebaseUser);
            setWalletBalance(null);
          }
        }
      } else {
        // Only Firebase user (e.g., subscriber)
        if (!cancelled) {
          setHasAccess(!!firebaseUser);
          setWalletBalance(null);
        }
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, [publicKey, firebaseUser]);

  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Unlock Premium</h1>
        <p className="text-lg text-gray-400">
          Hold <b>2,500,000 $2050</b> or subscribe to access exclusive features and visibility.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">What You Get</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-3">
          <li>Investor-focused public developer profile</li>
          <li>Access to premium blog + dev resources</li>
          <li>Subscriber-only newsletter drops</li>
          <li>No data selling, ever — your trust matters</li>
          <li>Priority placement for incoming projects</li>
        </ul>
      </section>

      {/* State / CTA */}
      <section className="max-w-4xl mx-auto mt-16 text-center">
        {hasAccess === null ? (
          <div className="text-gray-400 italic">Checking access…</div>
        ) : hasAccess ? (
          <div className="bg-green-800/60 border border-green-600 text-white p-6 rounded-md shadow-lg">
            <h3 className="text-xl font-bold mb-1">Access Granted</h3>
            {walletBalance != null && (
              <p className="text-gray-200">
                Wallet balance: {walletBalance.toLocaleString()} $2050
              </p>
            )}
            <a
              href="/developers/dashboard"
              className="inline-block mt-4 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-md"
            >
              Go to Premium Dashboard
            </a>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <WalletMultiButton className="!bg-violet-600 hover:!bg-violet-700 !text-white" />
            </div>
            {walletBalance != null && (
              <p className="text-sm text-gray-500">
                Current 2050 balance: {walletBalance.toLocaleString()}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2 italic">
              Holding the token unlocks access instantly. No need to do both.
            </p>
            <a
              href="/auth"
              className="inline-block mt-6 border border-violet-600 hover:bg-white/5 text-white px-6 py-3 rounded-md"
            >
              Or subscribe with email
            </a>
          </>
        )}
      </section>
    </main>
  );
}
