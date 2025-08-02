export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">
      {/* Header Section */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Build What Matters</h1>
        <p className="text-lg text-gray-400">
          Get matched with funded, future-forward teams that value your skills.
        </p>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold mb-4 text-white text-center">
          How It Works
        </h2>
        <div className="space-y-6 text-gray-300 text-md">
          <div>
            <strong>1. Connect:</strong> Login with wallet or email and create your dev profile.
          </div>
          <div>
            <strong>2. Match:</strong> We match you with projects, startups, and founders that need your skills.
          </div>
          <div>
            <strong>3. Build:</strong> Ship meaningful work, get paid, and grow your visibility.
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="max-w-4xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">
          Why Developers Love HireDevs
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Serious projects only — we vet every request</li>
          <li>Wallet-native — connect, sign, and go</li>
          <li>Investor visibility — public profiles (optional)</li>
          <li>Premium access via #token2050</li>
          <li>No fees. No middlemen. No fluff.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-16 text-center">
        <a
          href="/auth"
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-md shadow-lg transition duration-300"
        >
          Get Started – Connect Wallet or Email
        </a>
        <p className="text-sm text-gray-500 mt-2 italic">
          Your profile is private unless you opt into public visibility.
        </p>
      </section>
    </main>
  );
}

