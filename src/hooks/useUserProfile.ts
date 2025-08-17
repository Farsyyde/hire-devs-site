"use client";

import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import type { UserProfile } from "@/types/UserProfile";

export function useUserProfile() {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setProfile(snap.data() as UserProfile);
    } else {
      setProfile(null);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const upsert = useCallback(
    async (data: Partial<UserProfile>) => {
      if (!user) throw new Error("Not authenticated");
      const ref = doc(db, "users", user.uid);
      const base: Partial<UserProfile> = {
        uid: user.uid,
        email: user.email ?? undefined,
        role: "developer",
      };
      await setDoc(
        ref,
        {
          ...base,
          ...data,
          updatedAt: Date.now(),
          createdAt: (profile?.createdAt ?? Date.now()),
        },
        { merge: true }
      );
      await refresh();
    },
    [user, profile?.createdAt, refresh]
  );

  return { user, profile, loading, upsert, refresh };
}
