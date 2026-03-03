'use client'

export function Footer() {
  return (
    <footer className="px-6 lg:px-8 py-10 border-t border-parchment/[0.04]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-display text-xl text-parchment tracking-wider">INQ</span>
          <span className="text-mono-sm text-ash/40">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/inqgamerz48" target="_blank" rel="noopener noreferrer" className="text-mono-sm text-mist hover:text-flame transition-colors" data-cursor-hover>GitHub</a>
          <a href="mailto:inqgamerz48@gmail.com" className="text-mono-sm text-mist hover:text-flame transition-colors" data-cursor-hover>Email</a>
        </div>
      </div>
    </footer>
  )
}
