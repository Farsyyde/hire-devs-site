export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Hire Smarter, Ship Faster</h1>
        <p className="text-lg text-gray-400">
          Connect with vetted developers ready to build, without the agency bloat or hiring headache.
        </p>
      </section>

      {/* Offerings / Pricing Snapshot */}
      <section className="max-w-5xl mx-auto mt-14">
        <h2 className="text-3xl font-semibold mb-6 text-center">Offerings</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Free landing page */}
          <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">Free Landing Page</h3>
              <div className="text-2xl font-bold">Free</div>
            </div>
            <p className="text-gray-400 mt-2">
              Launch a simple, clean page to capture interest &amp; validate demand.
            </p>
            <ul className="mt-4 space-y-1 text-gray-300 list-disc list-inside">
              <li>Modern, lightweight design</li>
              <li>Lead capture &amp; basic analytics ready</li>
              <li>Deployed fast</li>
            </ul>
          </div>

          {/* $5,000 POC */}
          <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">Proof of Concept</h3>
              <div className="text-2xl font-bold">$5,000</div>
            </div>
            <p className="text-gray-400 mt-2">
              Test the core mechanics with a tight scope and rapid iteration.
            </p>
            <ul className="mt-4 space-y-1 text-gray-300 list-disc list-inside">
              <li>Core feature demo</li>
              <li>Tech validation &amp; feasibility</li>
              <li>Clear next steps for MVP</li>
            </ul>
          </div>

          {/* $17,500 MVP (Engineer-led) */}
          <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">Engineer-Led MVP</h3>
              <div className="text-2xl font-bold">$17,500</div>
            </div>
            <p className="text-gray-400 mt-2">
              Ship a working product with essential flows &amp; reliable infra.
            </p>
            <ul className="mt-4 space-y-1 text-gray-300 list-disc list-inside">
              <li>Production-ready core features</li>
              <li>Technical architecture &amp; deployment</li>
              <li>Handover &amp; growth plan</li>
            </ul>
          </div>

          {/* $25,000 MVP (Design, Testing, Ads) */}
          <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">MVP + Design &amp; Testing</h3>
              <div className="text-2xl font-bold">$25,000</div>
            </div>
            <p className="text-gray-400 mt-2">
              A polished MVP with pro design, QA, and initial traffic to learn fast.
            </p>
            <ul className="mt-4 space-y-1 text-gray-300 list-disc list-inside">
              <li>Professional UI/UX design</li>
              <li>QA &amp; usability testing</li>
              <li>$2,500 ad spend to drive traffic</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Pricing assumes a clearly defined scope; complex integrations or custom infra may adjust estimates.
        </p>
      </section>

      {/* Why Use HireDevs */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">Why HireDevs?</h2>
        <div className="max-w-xl mx-auto">
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Pre-vetted talent across Web3, fintech, AI, and more</li>
            <li>Wallet-native or traditional contact onboarding</li>
            <li>Flexible contracts, from hourly to full-time</li>
            <li>Private or public matching depending on your needs</li>
            <li>No middlemen. Just results.</li>
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
        <div className="max-w-xl mx-auto">
          <ol className="list-decimal list-inside text-gray-400 space-y-1">
            <li>Submit your project details or reach out directly</li>
            <li>We identify top-matching developers from our network</li>
            <li>You connect and kick off — fast and frictionless</li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-16 text-center">
        <a
          href="/contact"
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-md shadow-lg transition duration-300"
        >
          Get Started &ndash; Contact Us
        </a>
        <p className="text-sm text-gray-500 mt-2 italic">
          We&apos;ll respond within 24 hours or faster.
        </p>
      </section>
    </main>
  );
}

