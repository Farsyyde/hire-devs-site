"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type Props = {
  open?: boolean;                // optional, defaults to true
  onClose?: () => void;          // optional
  redirectTo?: string;           // where to go on success
};

export default function AuthModal({
  open = true,
  onClose,
  redirectTo = "/developers/dashboard",
}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      // Try sign-in first
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setMsg("Signed in successfully.");
    } catch (err: any) {
      // If user not found, create account
      if (err?.code === "auth/user-not-found") {
        try {
          const cred = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password
          );
          // Optional: set a display name from email
          if (cred.user && !cred.user.displayName) {
            const name = email.split("@")[0];
            await updateProfile(cred.user, { displayName: name });
          }
          setMsg("Account created and signed in.");
        } catch (createErr: any) {
          setMsg(createErr?.message || "Could not create account.");
          setLoading(false);
          return;
        }
      } else {
        setMsg(err?.message || "Sign in failed.");
        setLoading(false);
        return;
      }
    }

    setLoading(false);

    // Close modal (if shown as a modal) and go to dashboard
    if (onClose) onClose();
    router.replace(redirectTo);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-800 bg-[#0D1117] p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Sign In / Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-700 bg-[#0F1420] p-2 text-white focus:outline-none"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-700 bg-[#0F1420] p-2 text-white focus:outline-none"
          />

          {msg && (
            <div className="rounded-md border border-gray-700 bg-black/30 p-2 text-sm text-gray-300">
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {loading ? "Working…" : "Submit"}
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-md border border-gray-700 px-4 py-2 text-gray-300 hover:bg-white/5"
        >
          Close
        </button>
      </div>
    </div>
  );
}
