export const metadata = {
  title: "About Us - TeluguDB",
  description: "About TeluguDB",
};

export default function About() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-text mb-8">About TeluguDB</h1>
        <div className="space-y-4 text-muted">
          <p>Welcome to TeluguDB - your ultimate destination for Telugu movies and web series.</p>
          <h2 className="text-xl font-semibold text-text pt-4">Who We Are</h2>
          <p>TeluguDB is a streaming platform that provides easy access to the latest Telugu movies and web series. We aggregate content from various publicly available sources to bring you the best entertainment in one place.</p>
          <h2 className="text-xl font-semibold text-text pt-4">Our Mission</h2>
          <p>Our mission is to make Telugu entertainment accessible to audiences worldwide. We strive to provide high-quality streaming experience with the latest movies and series.</p>
          <h2 className="text-xl font-semibold text-text pt-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 pt-2">
            <li>Latest Telugu movies</li>
            <li>Web series</li>
            <li>Hindi dubbed content</li>
            <li>Multiple quality options</li>
          </ul>
          <h2 className="text-xl font-semibold text-text pt-4">Contact Us</h2>
          <p>For any inquiries or feedback, please reach out to us at telugudbmovies1@gmail.com</p>
          <p className="pt-4">Follow us on:</p>
          <div className="flex gap-4 pt-2">
            <a href="https://t.me/telugudbmovies1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telegram</a>
            <a href="https://www.instagram.com/telugu.db?igsh=ancxNjhtdXdyZ2p5" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram</a>
          </div>
        </div>
      </div>
    </main>
  );
}
