import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "Contabl",
  description: "Simplify your finances with our all-in-one platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}; // TODO: Ver metadata de sidebar-master

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
  );
}
