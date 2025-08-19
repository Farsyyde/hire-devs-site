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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setFirebaseUser(user));
    return () => unsub();
  }, []);

  // Prevent background scroll when the mobile menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isLoggedIn = !!firebaseUser || !!publicKey;

  return (
    <header className="sticky top-0 z-50 bg-[#0D1117]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0D1117]/60 border-b border-gray-800">
      {/* Top bar */}
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Brand + desktop links */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white font-semibold text-lg">
            HireDevs
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/developers" className="text-gray-300 hover:text-white px-2 py-1">Developers</Link>
            <Link href="/clients" className="text-gray-300 hover:text-white px-2 py-1">Clients</Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white px-2 py-1">Pricing</Link>
            <Link href="/about" className="text-gray-300 hover:text-white px-2 py-1">About</Link>
            <Link href="/developers/premium" className="text-gray-300 hover:text-white px-2 py-1">Premium</Link>
            {isLoggedIn && (
              <Link href="/developers/profile" className="text-violet-400 hover:text-violet-300 px-2 py-1">
                Profile
              </Link>
            )}
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {/* Wallet button (hidden on xs so it can't overflow) */}
          <div className="hidden sm:block max-w-[160px] overflow-hidden">
            <div className="whitespace-nowrap scale-95 origin-right">
              <WalletMultiButton className="!rounded-md !px-3 !py-2 !text-sm !bg-violet-600 hover:!bg-violet-700 !text-white" />
            </div>
          </div>

          {firebaseUser ? (
            <>
              <Link
                href="/developers/dashboard"
                className="hidden sm:inline-block bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-md text-sm text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut(auth)}
                className="hidden sm:inline-block border border-gray-700 hover:bg-white/5 px-3 py-2 rounded-md text-sm text-gray-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowEmailModal(true)}
              className="hidden sm:inline-block bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-md text-sm text-white"
            >
              Sign In / Sign Up
            </button>
          )}

          {/* Hamburger (mobile) */}
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-gray-300 hover:text-white"
          >
            <svg className={`h-6 w-6 transition-transform ${open ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div className={`md:hidden transition-[max-height] duration-300 ease-in-out overflow-hidden border-t border-gray-800 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="px-4 py-3 bg-[#0D1117]">
          <div className="flex flex-col">
            <Link href="/developers" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-gray-300 hover:text-white">Developers</Link>
            <Link href="/clients" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-gray-300 hover:text-white">Clients</Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-gray-300 hover:text-white">Pricing</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-gray-300 hover:text-white">About</Link>
            <Link href="/developers/premium" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-gray-300 hover:text-white">Premium</Link>
            {isLoggedIn && (
              <Link href="/developers/profile" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-violet-400 hover:text-violet-300">
                Profile
              </Link>
            )}

            {/* Mobile actions */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="whitespace-nowrap scale-95 origin-left">
                  <WalletMultiButton className="!w-full !justify-center !rounded-md !px-3 !py-2 !text-sm !bg-violet-600 hover:!bg-violet-700 !text-white" />
                </div>
              </div>

              {firebaseUser ? (
                <button
                  onClick={() => { setOpen(false); signOut(auth); }}
                  className="shrink-0 border border-gray-700 hover:bg-white/5 px-3 py-2 rounded-md text-sm text-gray-200"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => { setOpen(false); setShowEmailModal(true); }}
                  className="shrink-0 bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-md text-sm text-white"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Email/password modal */}
      {showEmailModal && <AuthModal onClose={() => setShowEmailModal(false)} />}
    </header>
  );
}
