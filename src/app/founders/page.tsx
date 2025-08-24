import Link from "next/link";

export default function FoundersPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 gradient-text">
            Everything founders need to launch — in one place.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At LaunchKit, we believe every founder deserves the right start. That means more than just code — it means guidance, resources, and support that help you go from idea to reality.
          </p>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="section-gray py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-center mb-16">Our Core Services</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-spotify-green rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">MVP Development</h3>
              <p className="text-gray-600 text-lg">
                Build and validate your idea with a real product. We help you create a working MVP that you can test with real users and iterate based on feedback.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-spotify-green rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">🏢</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Business Formation</h3>
              <p className="text-gray-600 text-lg">
                Guidance through LLCs, C-Corps, and compliance. We simplify the legal complexity so you can focus on building your business.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-spotify-green rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">💰</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Funding Resources</h3>
              <p className="text-gray-600 text-lg">
                Curated decks, templates, and investor connections. Get the tools and network you need to secure funding for your startup.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-spotify-green rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Marketing & Growth Tools</h3>
              <p className="text-gray-600 text-lg">
                Copywriting, pitch decks, and brand assets. Professional marketing materials that help you stand out and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why LaunchKit Exists */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Why LaunchKit Exists</h2>
          <p className="text-xl text-gray-600 mb-12">
            Founders waste time piecing together devs, lawyers, and freelancers. LaunchKit simplifies it into one kit, saving time and money.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="section-gray py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Our Vision</h2>
          <p className="text-xl text-gray-600 mb-12">
            To make launching a startup accessible, streamlined, and stress-free for founders everywhere.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4 text-white">🚀 Ready to build your launch kit?</h2>
          <Link href="/contact" className="btn-primary text-lg">
            Get Started with LaunchKit
          </Link>
        </div>
      </section>
    </main>
  );
}