"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// "system" = Auto: follows the device's light/dark setting until the user picks one
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
