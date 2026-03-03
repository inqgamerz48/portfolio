'use client'

const techStack = [
    'Next.js', 'TypeScript', 'React', 'FastAPI', 'Python', 'PostgreSQL',
    'Docker', 'Prisma', 'TailwindCSS', 'Node.js', 'Redis', 'MongoDB',
    'LangChain', 'OpenAI', 'Firebase', 'Vercel', 'Nginx', 'Linux',
    'GraphQL', 'REST APIs', 'Framer Motion', 'Git',
]

export function MarqueeStrip() {
    const items = [...techStack, ...techStack] // duplicate for seamless loop

    return (
        <div className="marquee-container">
            <div className="marquee-track">
                {items.map((tech, i) => (
                    <span key={i} className="flex items-center gap-6 px-6">
                        <span className="text-mono-sm text-mist whitespace-nowrap">{tech}</span>
                        <span className="text-blood opacity-30 text-xs">◆</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
