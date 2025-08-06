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
          Get Started – Contact Us
        </a>
        <p className="text-sm text-gray-500 mt-2 italic">
          We'll respond within 24 hours or faster.
        </p>
      </section>
    </main>
  );
}
