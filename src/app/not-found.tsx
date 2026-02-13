import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-muted" />
        </div>
        <h2 className="text-3xl font-bold text-text mb-2">Page Not Found</h2>
        <p className="text-muted mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. The page might have been removed or renamed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-text rounded-xl hover:bg-card/80 transition-colors"
          >
            <Search className="w-5 h-5" />
            Browse Content
          </Link>
        </div>
      </div>
    </div>
  );
}