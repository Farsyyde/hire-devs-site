"use client";

import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Menu } from "@headlessui/react";
import { ClipboardIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

export default function Navbar() {
  const { publicKey, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null;

  const handleCopy = useCallback(() => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [publicKey]);

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

          {publicKey ? (
            <Menu as="div" className="relative">
              <Menu.Button className="bg-purple-600 px-4 py-2 rounded-md text-white font-medium hover:bg-purple-700 transition-all">
                {shortAddress}
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg z-50">
                <Menu.Item>
                  {() => (
                    <button
                      onClick={handleCopy}
                      className="w-full px-4 py-2 text-left hover:bg-gray-800 flex items-center space-x-2"
                    >
                      <ClipboardIcon className="w-5 h-5" />
                      <span>{copied ? "Copied!" : "Copy Address"}</span>
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
                      <span>Disconnect</span>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 transition-all" />
          )}
        </div>
      </div>
    </nav>
  );
}
