import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Launch faster. Grow smarter.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            LaunchKit gives founders the essential tools to go from idea to business: MVP development, business formation, funding resources, and marketing support — all in one place.
          </p>
          <Link href="/contact" className="btn-primary text-lg">
            Get Started with LaunchKit
          </Link>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-gray py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-center mb-16">What We Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-spotify-green rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Build Your MVP</h3>
              <p className="text-gray-600">Turn your idea into a working product fast.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-spotify-green rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🏢</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Form Your Business</h3>
              <p className="text-gray-600">LLC or C-Corp — we guide you through setup.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-spotify-green rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Funding Resources</h3>
              <p className="text-gray-600">Investor decks, templates, and curated connections.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-spotify-green rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Marketing That Scales</h3>
              <p className="text-gray-600">Copy, pitch decks, and branding tools that get attention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why LaunchKit Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Why LaunchKit?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Launching a startup is hard. Most founders waste time juggling multiple platforms and providers. LaunchKit brings it all together — a single kit to launch with clarity and confidence.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4 text-white">Ready to Launch?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Startups move fast — your launch should too.
          </p>
          <Link href="/contact" className="btn-primary text-lg">
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  );
}