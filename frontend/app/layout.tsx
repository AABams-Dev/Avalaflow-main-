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
  title: "Avaflow - Physical meets Digital",
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
                // Pre-emptively handle window.ethereum conflicts to prevent "only has a getter" errors
                try {
                  const originalEth = window.ethereum;
                  let _eth = undefined;
                  Object.defineProperty(window, 'ethereum', {
                    get() { return _eth || window._eth || originalEth; },
                    set(v) { _eth = v; window._eth = v; },
                    configurable: true,
                    enumerable: true
                  });
                } catch (e) {
                  // If we can't redefine it, we'll at least try to suppress the errors it causes
                  console.log('Note: window.ethereum is locked by an extension.');
                }

                // Robust error suppression for browser extensions and common noise
                const originalError = console.error;
                const originalWarn = console.warn;
                const suppressPatterns = [/chrome-extension/i, /extension/i, /ethereum/i, /getter/i, /coop/i, /opener-policy/i, /chrome.runtime/i];

                const shouldSuppress = (args) => {
                  return args.some(arg => {
                    const str = typeof arg === 'string' ? arg : (arg?.message || String(arg));
                    return suppressPatterns.some(pattern => pattern.test(str));
                  });
                };

                console.error = function(...args) {
                  if (shouldSuppress(args)) return;
                  originalError.apply(console, args);
                };

                console.warn = function(...args) {
                  if (shouldSuppress(args)) return;
                  originalWarn.apply(console, args);
                };

                const errorHandler = function(e) {
                  const msg = (e.message || e.reason?.message || '').toLowerCase();
                  const file = e.filename || '';
                  if (shouldSuppress([msg, file])) {
                    e.stopImmediatePropagation?.();
                    e.preventDefault?.();
                    return true;
                  }
                };

                window.addEventListener('error', errorHandler, true);
                window.addEventListener('unhandledrejection', errorHandler, true);
                
                // Also patch window.onerror for older error reporting
                const originalOnerror = window.onerror;
                window.onerror = function(m, u, l, c, e) {
                  if (shouldSuppress([m, u])) return true;
                  if (originalOnerror) return originalOnerror.apply(window, arguments);
                  return false;
                };
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
