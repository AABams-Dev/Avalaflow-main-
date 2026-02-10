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
                
                // Intercept console errors/warnings from extensions and third-party noise
                console.error = function(...args) {
                  const msg = args.join(' ').toLowerCase();
                  if (
                    msg.includes('chrome-extension://') || 
                    msg.includes('extension') || 
                    msg.includes('ethereum') ||
                    msg.includes('cross-origin-opener-policy') ||
                    msg.includes('coop')
                  ) {
                    return;
                  }
                  originalError.apply(console, args);
                };

                console.warn = function(...args) {
                  const msg = args.join(' ').toLowerCase();
                  if (
                    msg.includes('chrome-extension://') || 
                    msg.includes('extension') ||
                    msg.includes('cross-origin-opener-policy')
                  ) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };

                // Catch uncaught runtime errors
                window.addEventListener('error', function(event) {
                  const fileName = event.filename || '';
                  const message = (event.message || '').toLowerCase();
                  
                  if (
                    fileName.includes('chrome-extension://') || 
                    message.includes('chrome.runtime') || 
                    message.includes('ethereum') ||
                    message.includes('cross-origin-opener-policy') ||
                    message.includes('getter') // Captures the 'only has a getter' error
                  ) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);

                // Catch unhandled promise rejections
                window.addEventListener('unhandledrejection', function(event) {
                  const reason = event.reason?.stack || event.reason?.message || '';
                  const msg = reason.toLowerCase();
                  if (
                    msg.includes('chrome-extension://') ||
                    msg.includes('cross-origin-opener-policy')
                  ) {
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
