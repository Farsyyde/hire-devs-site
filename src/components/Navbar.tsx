// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { auth } from "@/lib/firebase";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { publicKey } = useWallet();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setFirebaseUser(user));
    return () => unsub();
  }, []);

  const isLoggedIn = !!firebaseUser || !!publicKey;

  return (
    <nav className="bg-[#0D1117] border-b border-gray-800 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left: Brand + primary links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white font-semibold">
            HireDevs
          </Link>
          <Link href="/developers" className="text-gray-300 hover:text-white">Developers</Link>
          <Link href="/clients" className="text-gray-300 hover:text-white">Clients</Link>
          <Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link>
          <Link href="/about" className="text-gray-300 hover:text-white">About</Link>
          <Link href="/developers/premium" className="text-gray-300 hover:text-white">Premium</Link>
          {isLoggedIn && (
            <Link href="/developers/profile" className="text-violet-400 hover:text-violet-300">
              Profile
            </Link>
          )}
        </div>

        {/* Right: Wallet + auth controls */}
        <div className="flex items-center gap-3">
          {/* Wallet button (requires WalletContextProvider in layout) */}
          <WalletMultiButton className="!bg-violet-600 hover:!bg-violet-700 !text-white" />

          {firebaseUser ? (
            <>
              <Link
                href="/developers/dashboard"
                className="hidden sm:inline-block bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-md text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut(auth)}
                className="border border-gray-700 hover:bg-white/5 px-4 py-2 rounded-md text-gray-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowEmailModal(true)}
              className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-md text-white"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      </div>

      {/* Email/password modal */}
      {showEmailModal && <AuthModal onClose={() => setShowEmailModal(false)} />}
    </nav>
  );
}
