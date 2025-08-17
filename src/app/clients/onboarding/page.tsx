"use client";

import { useState } from "react";
import { db } from "../../../lib/firebase"; // ✅ adjust path if needed
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function ClientOnboardingPage() {
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      await addDoc(collection(db, "clients"), {
        status: "new",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("Client onboarding form submitted successfully!");
    } catch (error) {
      console.error("Error submitting client onboarding:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Client Onboarding</h1>
      {/* Replace with your actual form inputs */}
      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
