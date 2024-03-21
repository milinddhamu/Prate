"use client"
import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { SessionProvider } from "next-auth/react";
import { ApolloProviderWrapper } from '@/apollo/ApolloProviderWrapper';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export default function RootLayout({ children,session }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            
          >
            <SessionProvider session={session}>
              <ApolloProviderWrapper>
                {children}
              </ApolloProviderWrapper>
            </SessionProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
