"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { JSX, ReactNode } from "react"

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: "light" | "dark" | "system"
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "finance-theme",
}: ThemeProviderProps): JSX.Element {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      storageKey={storageKey}
    >
      {children}
    </NextThemesProvider>
  )
}