"use client";

import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

type Props = { open: boolean; onClose: () => void; };

export default function OnboardingModal({ open, onClose }: Props) {
  const [role, setRole] = useState<"developer" | "client" | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const save = async () => {
    if (!role) return;
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    setSaving(true);
    await setDoc(doc(db, "users", uid), { role }, { merge: true });
    setSaving(false);
    onClose();

    // route by role
    router.push(role === "developer" ? "/developers/dashboard" : "/clients/dashboard");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0F1420] text-white shadow-xl border border-gray-800">
        <div className="px-6 py-5 border-b border-gray-800">
          <h3 className="text-xl font-semibold">Welcome! What best describes you?</h3>
          <p className="text-sm text-gray-400 mt-1">This helps us tailor your experience.</p>
        </div>

        <div className="px-6 py-5 space-y-3">
          <button
            onClick={() => setRole("developer")}
            className={`w-full rounded-lg border px-4 py-3 text-left hover:bg-white/5 ${
              role === "developer" ? "border-violet-500" : "border-gray-700"
            }`}
          >
            <div className="font-medium">Developer</div>
            <div className="text-sm text-gray-400">Find projects, build profile, get visibility.</div>
          </button>

          <button
            onClick={() => setRole("client")}
            className={`w-full rounded-lg border px-4 py-3 text-left hover:bg-white/5 ${
              role === "client" ? "border-violet-500" : "border-gray-700"
            }`}
          >
            <div className="font-medium">Client</div>
            <div className="text-sm text-gray-400">Hire vetted devs for your product.</div>
          </button>

          <button
            onClick={save}
            disabled={!role || saving}
            className="w-full mt-2 rounded-lg bg-violet-600 px-4 py-2.5 font-medium hover:bg-violet-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Continue"}
          </button>

          <button onClick={onClose} className="block mx-auto text-sm text-gray-400 hover:text-gray-300">
            I’ll decide later
          </button>
        </div>
      </div>
    </div>
  );
}
