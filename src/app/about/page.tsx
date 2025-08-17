export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">About HireDevs</h1>
        <p className="text-lg text-gray-400">
          We're on a mission to connect brilliant developers with real-world impact.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Mission</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-gray-300 text-md">
            In a world filled with noise, misaligned incentives, and shady recruiting practices, HireDevs is building a platform where talent meets trust.
            <br /><br />
            We empower developers to work on projects they believe in — while giving teams access to committed, capable builders who get things done.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="max-w-4xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-4 text-center">The Team</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-gray-300">
            HireDevs was founded by devs, for devs. We've been through the broken job boards, the ignored DMs, and the Web2 hiring pipelines that don't understand Web3 talent.
          </p>
          <p className="mt-4 text-gray-300">
            We're building a better path forward — one project, one placement, one token at a time.
          </p>
        </div>
      </section>

      {/* Tagline */}
      <section className="max-w-4xl mx-auto mt-20 text-center">
        <p className="text-lg text-violet-500 italic">
          Talent that builds. Results that scale.
        </p>
      </section>
    </main>
  );
}
