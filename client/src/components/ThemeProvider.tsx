import { useEffect, useState,  } from "react"
import type { ReactNode } from "react"

interface ThemeProviderProps {
children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
const [theme, setTheme] = useState<"light" | "dark">("light")

useEffect(() => {
const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
const resolvedTheme = storedTheme ?? (prefersDark ? "dark" : "light")
}, [])

return <>{children}</>
}