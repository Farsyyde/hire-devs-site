export default function ContactPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        Let us know how we can help. Whether you're a dev or a founder, we're listening.
      </p>
      <form className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />
        <textarea
          placeholder="Tell us about your project or interest"
          rows={5}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
