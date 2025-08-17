"use client";

import AuthModal from "@/components/AuthModal";

export default function AuthPage() {
  // Always open; when closed, just navigate back
  return (
    <main className="min-h-screen bg-black">
      <AuthModal open redirectTo="/developers/dashboard" onClose={() => history.back()} />
    </main>
  );
}
