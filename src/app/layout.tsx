import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "INQ — Full Stack Developer & Systems Builder",
  description: "Portfolio of Sriram Satya Srivatsa Nanduri (INQ). Full Stack Developer. AI-Integrated Systems. Production-grade products.",
  keywords: ["Full Stack Developer", "AI", "Next.js", "FastAPI", "Portfolio", "INQ"],
  authors: [{ name: "INQ" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      <body className="antialiased">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
