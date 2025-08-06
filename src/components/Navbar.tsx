"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Menu } from "@headlessui/react";
import {
  ClipboardIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
} from "firebase/auth";

export default function Navbar() {
  const { publicKey, disconnect } = useWallet();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [copied, setCopied] = useState<"email" | "wallet" | null>(null);

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null;

  const handleCopy = useCallback((text: string, type: "email" | "wallet") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsub();
  }, []);

  return (
    <nav className="bg-[#0D1117] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-500">
          HireDevs
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/developers" className="hover:text-purple-400">Developers</Link>
          <Link href="/clients" className="hover:text-purple-400">Clients</Link>
          <Link href="/developers/about" className="hover:text-purple-400">About</Link>
          <Link href="/developers/premium" className="hover:text-purple-400">Premium</Link>
          <Link href="/contact" className="hover:text-purple-400">Contact</Link>

          {(firebaseUser || publicKey) ? (
            <Menu as="div" className="relative">
              <Menu.Button className="bg-purple-600 px-4 py-2 rounded-md text-white font-medium hover:bg-purple-700 transition-all">
                {firebaseUser?.displayName || firebaseUser?.email || shortAddress}
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg z-50">
                {firebaseUser && (
                  <>
                    <Menu.Item>
                      {() => (
                        <button
                          onClick={() => handleCopy(firebaseUser.email || "", "email")}
                          className="w-full px-4 py-2 text-left hover:bg-gray-800 flex items-center space-x-2"
                        >
                          <ClipboardIcon className="w-5 h-5" />
                          <span>{copied === "email" ? "Copied!" : "Copy Email"}</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {() => (
                        <button
                          onClick={() => signOut(auth)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-800 flex items-center space-x-2"
                        >
                          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                          <span>Sign Out</span>
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
                {publicKey && (
                  <>
                    <Menu.Item>
                      {() => (
                        <button
                          onClick={() => handleCopy(publicKey.toBase58(), "wallet")}
                          className="w-full px-4 py-2 text-left hover:bg-gray-800 flex items-center space-x-2"
                        >
                          <ClipboardIcon className="w-5 h-5" />
                          <span>{copied === "wallet" ? "Copied!" : "Copy Address"}</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {() => (
                        <button
                          onClick={disconnect}
                          className="w-full px-4 py-2 text-left hover:bg-gray-800 flex items-center space-x-2"
                        >
                          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                          <span>Disconnect Wallet</span>
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Menu>
          ) : (
            <>
              <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 transition-all" />
              <Menu as="div" className="relative">
                <Menu.Button className="bg-purple-600 px-4 py-2 rounded-md text-white font-medium hover:bg-purple-700 transition-all">
                  Sign In
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg z-50">
                  <Menu.Item>
                    {() => (
                      <button
                        onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
                        className="w-full px-4 py-2 text-left hover:bg-gray-800"
                      >
                        Sign in with Google
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {() => (
                      <button
                        onClick={() => signInWithPopup(auth, new GithubAuthProvider())}
                        className="w-full px-4 py-2 text-left hover:bg-gray-800"
                      >
                        Sign in with GitHub
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
