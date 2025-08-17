"use client";

import { useMemo, useState } from "react";
import type { UserProfile } from "@/types/UserProfile";

type Props = {
  initial?: UserProfile | null;
  onSave: (data: Partial<UserProfile>) => Promise<void>;
};

/** ---- Options (edit freely) ---- */
const STACK_OPTIONS = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "Solana",
  "Anchor",
  "Rust",
  "Web3.js",
  "@solana/wallet-adapter",
  "Firebase",
  "Firestore",
  "Cloud Functions",
  "PostgreSQL",
  "Prisma",
  "Python",
  "FastAPI",
  "LangChain",
  "OpenAI",
];

const LOCATION_OPTIONS = [
  "Remote",
  "USA",
  "Canada",
  "UK",
  "EU",
  "LATAM",
  "Africa",
  "India",
  "SEA",
  "Australia/NZ",
];

export default function ProfileEditForm({ initial, onSave }: Props) {
  const [displayName, setDisplayName] = useState(initial?.displayName ?? "");
  const [headline, setHeadline] = useState(initial?.headline ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");

  // NEW: store stack as array for the multi-select
  const [stack, setStack] = useState<string[]>(initial?.stack ?? []);

  // NEW: location from dropdown
  const [location, setLocation] = useState(initial?.location ?? "Remote");

  const [availability, setAvailability] = useState(
    initial?.availability ?? "contract"
  );
  const [hourlyRate, setHourlyRate] = useState<number | undefined>(
    initial?.hourlyRate
  );
  const [isPublic, setIsPublic] = useState(initial?.isPublic ?? true);

  const [website, setWebsite] = useState(initial?.links?.website ?? "");
  const [github, setGithub] = useState(initial?.links?.github ?? "");
  const [x, setX] = useState(initial?.links?.x ?? "");
  const [linkedin, setLinkedin] = useState(initial?.links?.linkedin ?? "");
  const [portfolio, setPortfolio] = useState(initial?.links?.portfolio ?? "");
  const [calendly, setCalendly] = useState(initial?.links?.calendly ?? "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  // For showing selected labels nicely (optional)
  const stackSet = useMemo(() => new Set(stack), [stack]);

  function onStackChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    setStack(values);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setOk(false);
    try {
      await onSave({
        displayName,
        headline,
        bio,
        stack, // <-- array from multi-select
        location, // <-- single value from dropdown
        availability: availability as UserProfile["availability"],
        hourlyRate: hourlyRate ?? undefined,
        isPublic,
        links: { website, github, x, linkedin, portfolio, calendly },
        role: "developer",
      });
      setOk(true);
    } catch (err: any) {
      setError(err?.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-400">{error}</div>}
      {ok && <div className="text-green-400">Saved!</div>}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Display name</label>
          <input
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Headline</label>
          <input
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            placeholder="Solana + Next.js engineer"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Bio</label>
          <textarea
            rows={4}
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* ---- STACK MULTI-SELECT ---- */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Stack (hold Cmd/Ctrl to multi-select)
          </label>
          <select
            multiple
            value={stack}
            onChange={onStackChange}
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2 h-36"
          >
            {STACK_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {/* small chips display (optional) */}
          {stack.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {STACK_OPTIONS.filter((s) => stackSet.has(s)).map((s) => (
                <span
                  key={s}
                  className="text-xs bg-violet-600/20 border border-violet-600/40 rounded px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ---- LOCATION DROPDOWN ---- */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
          >
            {LOCATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Availability</label>
          <select
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={availability}
            onChange={(e) => setAvailability(e.target.value as any)}
          >
            <option value="contract">Contract</option>
            <option value="part-time">Part-time</option>
            <option value="full-time">Full-time</option>
            <option value="open">Open</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Hourly rate (USD)</label>
          <input
            type="number"
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={hourlyRate ?? ""}
            onChange={(e) =>
              setHourlyRate(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-2">
          <input
            id="isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label htmlFor="isPublic" className="text-sm text-gray-300">
            Make my profile public
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Website</label>
          <input
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">GitHub</label>
          <input
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">X (Twitter)</label>
          <input
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={x}
            onChange={(e) => setX(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
          <input
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Portfolio</label>
          <input
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Calendly</label>
          <input
            className="w-full rounded bg-[#0F1420] border border-gray-800 p-2"
            value={calendly}
            onChange={(e) => setCalendly(e.target.value)}
          />
        </div>
      </div>

      <button
        disabled={saving}
        className="mt-4 rounded bg-violet-600 px-4 py-2 hover:bg-violet-700 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
