"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SessionBootstrapper() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      // Create or merge a minimal profile doc
      await setDoc(
        ref,
        {
          uid: user.uid,
          email: user.email ?? null,
          displayName: user.displayName ?? "",
          role: snap.exists() ? (snap.data().role ?? "developer") : "developer",
          premium: !!(snap.exists() && snap.data().premium),
          updatedAt: serverTimestamp(),
          ...(snap.exists() ? {} : { createdAt: serverTimestamp() }),
        },
        { merge: true }
      );
    });

    return () => unsub();
  }, []);

  return null;
}
