import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "INQ — Full Stack Developer & Systems Builder",
  description: "Portfolio of Sriram Satya Srivatsa Nanduri (INQ). Full Stack Developer. AI-Integrated Systems. Production-grade products.",
  keywords: ["Full Stack Developer", "AI", "Next.js", "FastAPI", "Portfolio", "INQ"],
  authors: [{ name: "INQ" }],
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('INQ_THEME');
                  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  if (stored === 'light' || (!stored && prefersLight)) {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased transition-colors duration-500">
        <ThemeProvider>
          <CustomCursor />
          {children}
          <div className="grain-overlay" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}
