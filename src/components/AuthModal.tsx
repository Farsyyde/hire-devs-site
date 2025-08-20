"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type Props = {
  open?: boolean;
  onClose?: () => void;
  redirectTo?: string;
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

    const trimmedEmail = email.trim();

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      // Figure out how this email is supposed to sign in
      const methods = await fetchSignInMethodsForEmail(auth, trimmedEmail);

      if (methods.length === 0) {
        // No account yet → create
        const cred = await createUserWithEmailAndPassword(
          auth,
          trimmedEmail,
          password
        );
        if (cred.user && !cred.user.displayName) {
          const name = trimmedEmail.split("@")[0];
          await updateProfile(cred.user, { displayName: name });
        }
        setMsg("Account created and signed in.");
      } else if (methods.includes("password")) {
        // Account exists with password → sign in
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
        setMsg("Signed in successfully.");
      } else {
        // Account exists but with other provider(s)
        const pretty = methods.join(", ");
        setMsg(
          `This email is registered with: ${pretty}. Please sign in using that method.`
        );
        setLoading(false);
        return;
      }

      setLoading(false);
      if (onClose) onClose();
      router.replace(redirectTo);
    } catch (err: any) {
      // Normalize common Firebase errors
      let human = "Sign in failed.";
      if (err?.code === "auth/invalid-credential") {
        human = "Email or password is incorrect.";
      } else if (err?.code === "auth/operation-not-allowed") {
        human = "Email/password sign-in is disabled in Firebase.";
      } else if (err?.code === "auth/too-many-requests") {
        human = "Too many attempts. Please try again later.";
      } else if (err?.message) {
        human = `Firebase: ${err.message}`;
      }
      setMsg(human);
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-800 bg-[#0D1117] p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-white">Sign In / Sign Up</h2>

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
