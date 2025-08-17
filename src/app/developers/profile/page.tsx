"use client";

import Link from "next/link";
import { useUserProfile } from "@/hooks/useUserProfile";

function Avatar({ name }: { name?: string }) {
  const initials = (name ?? "User")
    .split(" ")
    .map(p => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="h-14 w-14 rounded-full bg-violet-700/30 border border-violet-700 flex items-center justify-center">
      <span className="text-violet-200 font-semibold">{initials}</span>
    </div>
  );
}

export default function MyProfilePage() {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0D1117] text-white p-8">
        <p className="text-gray-400">Loading…</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#0D1117] text-white p-8">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="mt-2 text-gray-400">
          You’re not signed in or haven’t created a profile yet.
        </p>
        <Link
          href="/developers/profile/edit"
          className="inline-block mt-4 rounded bg-violet-600 px-4 py-2 hover:bg-violet-700"
        >
          Create / Edit Profile
        </Link>
      </main>
    );
  }

  const stack = profile.stack ?? [];
  const links = profile.links ?? {};

  return (
    <main className="min-h-screen bg-[#0D1117] text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={profile.displayName} />
            <div>
              <h1 className="text-3xl font-bold">{profile.displayName ?? "Anonymous Dev"}</h1>
              <p className="text-gray-400">{profile.headline ?? "Add a headline"}</p>
              {profile.premium && (
                <span className="mt-2 inline-block text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                  PREMIUM
                </span>
              )}
            </div>
          </div>
          <Link
            href="/developers/profile/edit"
            className="rounded border border-gray-700 px-3 py-2 text-sm hover:bg-white/5"
          >
            Edit profile
          </Link>
        </header>

        <section className="rounded-lg border border-gray-800 bg-[#0F1420] p-5">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-300 whitespace-pre-wrap">
            {profile.bio || "Tell the world what you build."}
          </p>
        </section>

        <section className="rounded-lg border border-gray-800 bg-[#0F1420] p-5">
          <h2 className="text-xl font-semibold mb-2">Stack</h2>
          {stack.length ? (
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span key={s} className="text-sm border border-gray-700 px-2 py-1 rounded">
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Add your tools & frameworks.</p>
          )}
        </section>

        <section className="rounded-lg border border-gray-800 bg-[#0F1420] p-5">
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <ul className="text-gray-300 space-y-1">
            {profile.location && <li>📍 {profile.location}</li>}
            {profile.availability && <li>🗓️ Availability: {profile.availability}</li>}
            {typeof profile.hourlyRate === "number" && (
              <li>💵 Rate: ${profile.hourlyRate}/hr</li>
            )}
            <li>Visibility: {profile.isPublic ? "Public" : "Private"}</li>
          </ul>
        </section>

        {(links.website || links.portfolio || links.github || links.linkedin || links.x || links.calendly) && (
          <section className="rounded-lg border border-gray-800 bg-[#0F1420] p-5">
            <h2 className="text-xl font-semibold mb-2">Links</h2>
            <div className="flex flex-wrap gap-3 text-violet-300">
              {links.website && <a className="underline" href={links.website} target="_blank">Website</a>}
              {links.portfolio && <a className="underline" href={links.portfolio} target="_blank">Portfolio</a>}
              {links.github && <a className="underline" href={links.github} target="_blank">GitHub</a>}
              {links.linkedin && <a className="underline" href={links.linkedin} target="_blank">LinkedIn</a>}
              {links.x && <a className="underline" href={links.x} target="_blank">X</a>}
              {links.calendly && <a className="underline" href={links.calendly} target="_blank">Calendly</a>}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
