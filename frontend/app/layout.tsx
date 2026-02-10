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
                const originalError = console.error;
                const originalWarn = console.warn;
                
                // Intercept console errors/warnings from extensions
                console.error = function(...args) {
                  const msg = args.join(' ');
                  if (msg.includes('chrome-extension://') || msg.includes('extension') || msg.includes('ethereum')) {
                    return;
                  }
                  originalError.apply(console, args);
                };

                console.warn = function(...args) {
                  const msg = args.join(' ');
                  if (msg.includes('chrome-extension://') || msg.includes('extension')) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };

                // Catch uncaught runtime errors from extensions
                window.addEventListener('error', function(event) {
                  if (event.filename && event.filename.includes('chrome-extension://')) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                  if (event.message && (event.message.includes('chrome.runtime') || event.message.includes('ethereum'))) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);

                // Catch unhandled promise rejections from extensions
                window.addEventListener('unhandledrejection', function(event) {
                  const reason = event.reason && event.reason.stack ? event.reason.stack : '';
                  if (reason.includes('chrome-extension://')) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);
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
