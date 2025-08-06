"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-[#0D1117] text-white px-4 overflow-hidden">
      {/* Background logo */}
      <img
        src="/logo.png"
        alt="HireDevs Logo"
        className="absolute w-[600px] h-[600px] opacity-20 blur-sm pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Main Glassy Hero */}
      <div
        className={`z-10 bg-white/5 backdrop-blur-sm rounded-xl px-8 py-10 text-center transition-all duration-700 ease-out transform shadow-lg max-w-2xl ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h1 className="text-5xl font-bold">HireDevs</h1>
        <p className="mt-2 text-lg text-gray-400">
          Talent that builds. Results that scale.
        </p>
        <p className="mt-1 text-sm text-gray-500 italic">
          Are you looking to hire developers or get placed on a project?
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/developers"
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md transition duration-300 shadow-md hover:shadow-violet-500/50"
          >
            For Developers
          </a>
          <a
            href="/clients"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md transition duration-300 shadow-md hover:shadow-gray-500/40"
          >
            For Clients
          </a>
        </div>
      </div>

      {/* Extended Description */}
      <div className="mt-16 max-w-3xl text-center z-10">
        <h2 className="text-2xl font-semibold mb-4 text-white">What is HireDevs?</h2>
        <p className="text-gray-400 text-md">
          HireDevs is a next-gen talent matchmaking platform that connects top developers with the
          most ambitious teams in Web3, AI, fintech, and emerging tech. Whether you're looking to
          hire fast or get staffed on meaningful projects, we make the process seamless, verified,
          and community-driven.
        </p>

        <p className="mt-4 text-sm text-gray-600 italic">
          No noise. Just skill-matched talent for teams that ship.
        </p>
      </div>
    </main>
  );
}
