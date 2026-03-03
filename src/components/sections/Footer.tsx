'use client'

export function Footer() {
  return (
    <footer className="relative px-6 lg:px-8 py-12">
      {/* Crimson top line */}
      <div className="hr-blood mb-12" />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-serif text-xl font-black text-parchment">INQ</span>
          <span className="text-mono text-steel">© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="https://github.com/inqgamerz48"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mono text-mist hover:text-flame transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:inqgamerz48@gmail.com"
            className="text-mono text-mist hover:text-flame transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
