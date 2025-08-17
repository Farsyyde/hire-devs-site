export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Simple, outcome-focused pricing</h1>
        <p className="text-gray-400">
          Start free. Scale into a proof-of-concept or full MVP when you’re ready.
        </p>
      </section>

      <section className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-6">
          <h3 className="text-xl font-semibold">Free landing page</h3>
          <p className="text-3xl font-bold mt-2">$0</p>
          <ul className="mt-4 text-gray-300 space-y-2 text-sm">
            <li>• Polished one-pager</li>
            <li>• Deployed + analytics</li>
            <li>• Best-practice copy</li>
          </ul>
          <a href="/contact" className="inline-block mt-6 rounded bg-violet-600 px-4 py-2 hover:bg-violet-700">
            Get started
          </a>
        </div>

        <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-6">
          <h3 className="text-xl font-semibold">Proof of concept</h3>
          <p className="text-3xl font-bold mt-2">$5,000</p>
          <ul className="mt-4 text-gray-300 space-y-2 text-sm">
            <li>• Validate core workflow</li>
            <li>• Technical spikes</li>
            <li>• 2–3 week sprint</li>
          </ul>
          <a href="/contact" className="inline-block mt-6 rounded bg-violet-600 px-4 py-2 hover:bg-violet-700">
            Book a call
          </a>
        </div>

        <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-6">
          <h3 className="text-xl font-semibold">Engineer-led MVP</h3>
          <p className="text-3xl font-bold mt-2">$17,500</p>
          <ul className="mt-4 text-gray-300 space-y-2 text-sm">
            <li>• Core features shipped</li>
            <li>• Modern stack & auth</li>
            <li>• 4–6 week build</li>
          </ul>
          <a href="/contact" className="inline-block mt-6 rounded bg-violet-600 px-4 py-2 hover:bg-violet-700">
            Book a call
          </a>
        </div>

        <div className="rounded-lg border border-gray-800 bg-[#0F1420] p-6">
          <h3 className="text-xl font-semibold">MVP + design + traffic</h3>
          <p className="text-3xl font-bold mt-2">$25,000</p>
          <ul className="mt-4 text-gray-300 space-y-2 text-sm">
            <li>• Product design & testing</li>
            <li>• QA + polish</li>
            <li>• $2,500 ad spend to launch</li>
          </ul>
          <a href="/contact" className="inline-block mt-6 rounded bg-violet-600 px-4 py-2 hover:bg-violet-700">
            Book a call
          </a>
        </div>
      </section>
    </main>
  );
}
