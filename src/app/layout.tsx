import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";

const inter = Inter({
  subsets: ['latin']
})
export const metadata: Metadata = {
  title: "G Docs",
  description: "A Google Docs clone built for seamless real-time editing and collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter} antialiased`}
      >
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
