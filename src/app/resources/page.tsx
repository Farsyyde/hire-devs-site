export default function ResourcesPage() {
  return (
    <main className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          Resources & Insights
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Guides, templates, and insights to help you launch smarter.
        </p>
        
        <div className="bg-gray-light p-12 rounded-lg">
          <div className="w-20 h-20 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl">🚧</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-8">
            We're building a comprehensive resource hub with startup guides, templates, and insights. 
            Stay tuned for launch updates!
          </p>
          <a href="/contact" className="btn-primary">
            Get Notified When We Launch
          </a>
        </div>
      </div>
    </main>
  );
}