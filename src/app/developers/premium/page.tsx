export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Unlock Premium</h1>
        <p className="text-lg text-gray-400">
          Hold #token2050 or subscribe to access exclusive features and visibility.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">What You Get</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-3">
          <li>Investor-focused public developer profile</li>
          <li>Access to premium blog + dev resources</li>
          <li>Subscriber-only newsletter drops</li>
          <li>No data selling, ever — your trust matters</li>
          <li>Priority placement for incoming projects</li>
        </ul>
      </section>

      {/* Token Access vs Subscription */}
      <section className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Two Ways to Access</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 text-gray-300">
          <div className="border border-violet-500 p-6 rounded-md w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-2">Hold #token2050</h3>
            <p>Just 1 token in your wallet unlocks premium access across the platform.</p>
          </div>
          <div className="border border-violet-500 p-6 rounded-md w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-2">$5 Monthly Subscription</h3>
            <p>No wallet? No problem. Pay with fiat and get the same premium perks.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-16 text-center">
        <a
          href="/auth"
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-md shadow-lg transition duration-300"
        >
          Go Premium – Connect Wallet or Subscribe
        </a>
        <p className="text-sm text-gray-500 mt-2 italic">
          Holding the token = instant access. No need to do both.
        </p>
      </section>
    </main>
  );
}

