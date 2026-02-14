export const metadata = {
  title: "Contact Us - TeluguDB",
  description: "Contact TeluguDB",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-text mb-8">Contact Us</h1>
        <div className="space-y-4 text-muted">
          <p>We would love to hear from you! Get in touch with us for any inquiries, feedback, or support.</p>
          <h2 className="text-xl font-semibold text-text pt-4">Email</h2>
          <p>For general inquiries: <a href="mailto:telugudbmovies1@gmail.com" className="text-primary hover:underline">telugudbmovies1@gmail.com</a></p>
          <h2 className="text-xl font-semibold text-text pt-4">Social Media</h2>
          <div className="flex gap-4 pt-2">
            <a href="https://t.me/telugudbmovies1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telegram</a>
            <a href="https://www.instagram.com/telugu.db?igsh=ancxNjhtdXdyZ2p5" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram</a>
          </div>
          <h2 className="text-xl font-semibold text-text pt-4">Support</h2>
          <p>For technical support or content removal requests, please email us with details about your inquiry.</p>
        </div>
      </div>
    </main>
  );
}
