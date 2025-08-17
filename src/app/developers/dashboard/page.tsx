"use client";

import Link from "next/link";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function DevDashboardPage() {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0D1117] text-white p-8">
        <p className="text-gray-400">Loading your dashboard…</p>
      </main>
    );
  }

  // Not logged in or no profile yet
  if (!profile) {
    return (
      <main className="min-h-screen bg-[#0D1117] text-white p-8">
        <h1 className="text-2xl font-bold">Developer Dashboard</h1>
        <p className="mt-2 text-gray-400">
          You’re not signed in.{" "}
          <Link href="/" className="text-violet-400 hover:text-violet-300">
            Sign in or connect a wallet
          </Link>{" "}
          to continue.
        </p>
      </main>
    );
  }

  // Logged in but not a developer
  if (profile.role !== "developer") {
    return (
      <main className="min-h-screen bg-[#0D1117] text-white p-8">
        <h1 className="text-2xl font-bold">Developer Dashboard</h1>
        <p className="mt-2 text-gray-400">
          It looks like your role is set to <b>{profile.role ?? "unassigned"}</b>.  
          This area is for developers.
        </p>
        <div className="mt-4">
          <Link href="/clients/dashboard" className="text-violet-400 hover:text-violet-300">
            Go to Client Dashboard
          </Link>
          <span className="mx-2 text-gray-600">•</span>
          <Link href="/" className="text-violet-400 hover:text-violet-300">
            Change role (Onboarding)
          </Link>
        </div>
      </main>
    );
  }

  // Developer view
  return (
    <main className="min-h-screen bg-[#0D1117] text-white p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Developer Dashboard</h1>
        <div className="flex items-center gap-2">
          {profile.premium && (
            <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
              PREMIUM
            </span>
          )}
          <span className="text-sm text-gray-400">
            {profile.displayName || profile.email || "Anonymous Dev"}
          </span>
        </div>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Profile card */}
        <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-5">
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <p className="mt-2 text-gray-400">Add your stack, bio, and links.</p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/developers/profile/edit"
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm hover:bg-violet-700"
            >
              Edit Profile
            </Link>
            <Link
              href="/developers/profile"
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm hover:bg-white/5"
            >
              View Public Profile
            </Link>
          </div>
        </div>

        {/* Opportunities / visibility */}
        <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-5">
          <h2 className="text-xl font-semibold">Opportunities</h2>
          <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1">
            <li>Connect with clients looking for your skills</li>
            <li>Boost visibility with a premium badge</li>
            <li>Get featured in the HireDevs weekly</li>
          </ul>
          <div className="mt-4">
            <Link
              href="/developers/premium"
              className="text-violet-400 hover:text-violet-300 text-sm"
            >
              Explore Premium benefits →
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-5">
          <h2 className="text-xl font-semibold">Resources</h2>
          <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1">
            <li>Best practices for proposals</li>
            <li>Pricing & scoping templates</li>
            <li>Community Discord access</li>
          </ul>
        </div>

        {/* Coming soon */}
        <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-5">
          <h2 className="text-xl font-semibold">Coming Soon</h2>
          <p className="mt-2 text-gray-400">
            Staking, premium site integration, and on-chain credentials.
          </p>
        </div>
      </section>
    </main>
  );
}
