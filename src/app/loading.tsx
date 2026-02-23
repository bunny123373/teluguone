export default function Loading() {
  return (
    <main className="min-h-screen pv-bg flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="pv-logo-loading">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" fill="#00A8E1"/>
              <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="#fff" strokeWidth="2"/>
              <polygon points="20,18 32,24 20,30" fill="#fff"/>
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
