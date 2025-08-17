"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import type { UserProfile } from "@/types/UserProfile";
import ProfileEditForm from "@/components/ProfileEditForm";

export default function ProfileEditPage() {
  const [user, loadingAuth] = useAuthState(auth);
  const [initial, setInitial] = useState<UserProfile | null>(null);
  const [loadingDoc, setLoadingDoc] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load existing profile for the logged-in user
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!user) {
        setInitial(null);
        setLoadingDoc(false);
        return;
      }
      setError(null);
      setLoadingDoc(true);
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (!cancelled) {
          if (snap.exists()) {
            setInitial(snap.data() as UserProfile);
          } else {
            // No doc yet — provide a light default so the form isn't empty
            setInitial({
              uid: user.uid,
              role: "developer",
              email: user.email ?? "",
              displayName: user.displayName ?? "",
              headline: "",
              bio: "",
              stack: [],
              location: "",
              availability: "contract",
              isPublic: true,
              links: {},
              createdAt: (serverTimestamp() as unknown) as any,
              updatedAt: (serverTimestamp() as unknown) as any,
              premium: false,
            } as unknown as UserProfile);
          }
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load profile");
      } finally {
        if (!cancelled) setLoadingDoc(false);
      }
    }

    if (!loadingAuth) load();
    return () => {
      cancelled = true;
    };
  }, [user, loadingAuth]);

  // Save handler passed into the form
  async function handleSave(data: Partial<UserProfile>) {
    if (!user) throw new Error("You must be signed in to save.");
    const ref = doc(db, "users", user.uid);

    // Always enforce uid/role/email on write
    const payload: Partial<UserProfile> = {
      ...data,
      uid: user.uid,
      role: "developer",
      email: user.email ?? initial?.email ?? "",
      updatedAt: serverTimestamp() as any,
      createdAt: initial?.createdAt ?? (serverTimestamp() as any),
    };

    await setDoc(ref, payload, { merge: true });
    // Optimistically update local initial state so the form reflects saved data
    setInitial((prev) => ({ ...(prev ?? {} as any), ...(payload as any) } as UserProfile));
  }

  // Auth gating & loading states
  if (loadingAuth || loadingDoc) {
    return (
      <main className="min-h-screen bg-[#0D1117] text-white p-8">
        <p className="text-gray-400">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0D1117] text-white p-8">
        <h1 className="text-2xl font-bold mb-2">Edit Your Developer Profile</h1>
        <p className="text-gray-400">
          You’re not signed in.{" "}
          <Link href="/developers" className="text-violet-400 hover:text-violet-300">
            Go back
          </Link>{" "}
          and sign in first.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D1117] text-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Your Developer Profile</h1>
        <Link
          href="/developers/profile"
          className="text-sm border border-gray-700 px-3 py-2 rounded hover:bg-white/5"
        >
          View Public Profile
        </Link>
      </div>

      {error && <div className="mb-4 text-red-400">{error}</div>}

      <ProfileEditForm initial={initial} onSave={handleSave} />
    </main>
  );
}
