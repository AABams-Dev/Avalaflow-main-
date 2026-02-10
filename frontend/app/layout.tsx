import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avalaflow - Physical meets Digital",
  description: "Collect figures, scan via NFC, and own dynamic NFTs on Avalanche.",
};

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
                // Handle window.ethereum conflicts pre-emptively
                try {
                  const originalEth = window.ethereum;
                  Object.defineProperty(window, 'ethereum', {
                    get() { return window._eth || originalEth; },
                    set(v) { window._eth = v; },
                    configurable: true,
                    enumerable: true
                  });
                } catch (e) { /* ignore if already defined as non-configurable */ }

                const originalError = console.error;
                const originalWarn = console.warn;
                
                console.error = function(...args) {
                  const msg = args.join(' ').toLowerCase();
                  if (msg.includes('chrome-extension://') || msg.includes('extension') || msg.includes('ethereum') || msg.includes('getter') || msg.includes('coop')) return;
                  originalError.apply(console, args);
                };

                console.warn = function(...args) {
                  const msg = args.join(' ').toLowerCase();
                  if (msg.includes('chrome-extension://') || msg.includes('extension') || msg.includes('coop')) return;
                  originalWarn.apply(console, args);
                };

                const handler = function(e) {
                  const msg = (e.message || e.reason?.message || '').toLowerCase();
                  const file = e.filename || '';
                  if (file.includes('chrome-extension://') || msg.includes('ethereum') || msg.includes('getter') || msg.includes('chrome.runtime') || msg.includes('opener-policy')) {
                    e.stopImmediatePropagation?.();
                    e.preventDefault?.();
                    return true;
                  }
                };

                window.addEventListener('error', handler, true);
                window.addEventListener('unhandledrejection', handler, true);
                window.onerror = (m, u) => (u?.includes('extension') || m?.toLowerCase?.().includes('ethereum')) ? true : false;
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
