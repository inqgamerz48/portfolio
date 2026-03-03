import { Metadata } from 'next'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { MarqueeStrip } from '@/components/MarqueeStrip'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { Blog } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'INQ — Full Stack Developer & Systems Builder',
  description: 'Portfolio of Sriram Satya Srivatsa Nanduri (INQ). Full Stack Developer. AI-Integrated Systems. Production-grade products.',
  keywords: ['Full Stack Developer', 'AI', 'Next.js', 'FastAPI', 'Portfolio', 'INQ'],
  authors: [{ name: 'INQ' }],
  openGraph: {
    title: 'INQ — Full Stack Developer & Systems Builder',
    description: 'Portfolio of Sriram Satya Srivatsa Nanduri (INQ)',
    url: 'https://portfolio-inq.pages.dev',
    siteName: 'INQ',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
