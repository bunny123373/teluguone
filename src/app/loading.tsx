export default function Loading() {
  return (
    <main className="min-h-screen pv-bg flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="pv-logo-loading">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              <g>
                <polyline points="32.1313 11.85 24 36.15 15.8687 11.85" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <g>
                <circle cx="24" cy="24" r="21.5" fill="none" stroke="#00A8E1" strokeWidth="3"/>
              </g>
            </svg>
          </div>
          <span className="text-white text-2xl font-bold">Telugu<span className="text-orange-500">DB</span></span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </main>
  );
}
