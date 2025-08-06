"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";

export function useProtectedRoute(redirectTo = "/") {
  const { publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      const isLoggedIn = user || publicKey;
      if (!isLoggedIn) {
        router.push(redirectTo);
      }
    });

    return () => unsub();
  }, [publicKey, router, redirectTo]);
}

