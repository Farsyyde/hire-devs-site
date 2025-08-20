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

  // mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setFirebaseUser(user));
    return () => unsub();
  }, []);

  const isLoggedIn = !!firebaseUser || !!publicKey;

  // Lock body scroll while the mobile menu OR auth modal is open
  useEffect(() => {
    const lock = mobileOpen || showEmailModal;
    const prev = document.body.style.overflow;
    if (lock) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen, showEmailModal]);

  return (
    <nav className="bg-[#0D1117] border-b border-gray-800 px-4 sm:px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white font-semibold text-lg">
            HireDevs
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
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
        </div>

        {/* Right: desktop controls */}
        <div className="hidden md:flex items-center gap-3">
          <WalletMultiButton className="!bg-violet-600 hover:!bg-violet-700 !text-white" />
          {firebaseUser ? (
            <>
              <Link
                href="/developers/dashboard"
                className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-md text-white"
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

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center rounded p-2 text-gray-300 hover:text-white hover:bg-white/5"
          onClick={() => setMobileOpen(true)}
        >
          {/* simple burger icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />

          {/* sheet */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-[380px] bg-[#0D1117] border-l border-gray-800 shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
              <span className="text-white font-semibold text-lg">HireDevs</span>
              <button
                aria-label="Close menu"
                className="rounded p-2 text-gray-300 hover:text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <Link href="/developers" onClick={() => setMobileOpen(false)} className="block text-gray-200 py-2">Developers</Link>
              <Link href="/clients" onClick={() => setMobileOpen(false)} className="block text-gray-200 py-2">Clients</Link>
              <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block text-gray-200 py-2">Pricing</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-gray-200 py-2">About</Link>
              <Link href="/developers/premium" onClick={() => setMobileOpen(false)} className="block text-gray-200 py-2">Premium</Link>
              {isLoggedIn && (
                <Link href="/developers/profile" onClick={() => setMobileOpen(false)} className="block text-violet-400 py-2">
                  Profile
                </Link>
              )}

              <div className="h-px bg-gray-800 my-2" />

              <div className="flex items-center justify-between gap-3">
                <WalletMultiButton className="!bg-violet-600 hover:!bg-violet-700 !text-white !w-auto" />
                {firebaseUser ? (
                  <button
                    onClick={() => { setMobileOpen(false); signOut(auth); }}
                    className="border border-gray-700 hover:bg-white/5 px-4 py-2 rounded-md text-gray-200"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => { setMobileOpen(false); setShowEmailModal(true); }}
                    className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-md text-white"
                  >
                    Sign In / Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email/password modal */}
      {showEmailModal && <AuthModal onClose={() => setShowEmailModal(false)} />}
    </nav>
  );
}
