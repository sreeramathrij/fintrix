import { useState,useEffect } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Home, Globe, Moon } from "lucide-react"
import { useTheme } from "../context/ThemeProvider"





export default function SettingsPage() {
 
  const [language, setLanguage] = useState("system")
  const { theme, setTheme } = useTheme()
  const accentHSLMap: Record<string, string> = {
  indigo: "222.2 84% 60%",
  emerald: "142.1 70.6% 45.3%",
  rose: "346.8 77.2% 49.8%",
  sky: "204.8 100% 50%",
  amber: "43.9 96.3% 56.1%",
  violet: "262.1 83.3% 57.8%",
  cyan: "187.7 95.7% 40.1%",
  orange: "24.6 95.9% 53.1%",
  pink: "327.9 90% 67.6%",
  lime: "86.4 81.2% 43.9%",
  none:"inherit",
}
const [accentColor, setAccentColor] = useState(
  localStorage.getItem("accent-color") || "indigo"
)



useEffect(() => {
  const root = document.documentElement

  if (accentColor === "none") {
    root.style.removeProperty("--accent")
    root.style.removeProperty("--primary")
  } else {
    const accent = accentHSLMap[accentColor] || accentHSLMap.indigo
    root.style.setProperty("--accent", accent)
    root.style.setProperty("--primary", accent)
  }

  localStorage.setItem("accent-color", accentColor)
}, [accentColor])

  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-4">

        {/* Accent Color */}
        <Card className="hover:bg-muted transition-colors rounded-xl">
          <CardContent className="flex items-center gap-4 p-4">
            <Palette className="text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col flex-1">
              <p className="font-medium">Accent Color</p>
              <p className="text-sm text-muted-foreground">Select a color theme for the interface</p>
            </div>
            <Select value={accentColor} onValueChange={setAccentColor}>
  <SelectTrigger className="min-w-[100px] w-auto focus-visible:outline-none">
    <SelectValue placeholder="Color" />
  </SelectTrigger>
  <SelectContent>
    {Object.keys(accentHSLMap).map((color) => (
      <SelectItem key={color} value={color}>
        {color.charAt(0).toUpperCase() + color.slice(1)}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

          </CardContent>
        </Card>

        {/* Theme Mode */}
        <Card className="hover:bg-muted transition-colors rounded-xl">
          <CardContent className="flex items-center gap-4 p-4">
            <Moon className="text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col flex-1">
              <p className="font-medium">Theme Mode</p>
              <p className="text-sm text-muted-foreground">Select light or dark theme</p>
            </div>
            <Select  value={theme || "system"} onValueChange={(val) => setTheme(val)}>
  <SelectTrigger className="min-w-[80px] w-auto focus-visible:outline-none">
    <SelectValue placeholder="Dark" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
          </CardContent>
        </Card>

        {/* Edit Home Page */}
        <Card className="hover:bg-muted transition-colors rounded-xl cursor-pointer">
          <CardContent className="flex items-center gap-4 p-4">
            <Home className="text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col">
              <p className="font-medium">Edit Home Page</p>
              <p className="text-sm text-muted-foreground">Customize your homepage layout</p>
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="hover:bg-muted transition-colors rounded-xl">
          <CardContent className="flex items-center gap-4 p-4">
            <Globe className="text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col flex-1">
              <p className="font-medium">Language</p>
              <p className="text-sm text-muted-foreground">App language preference</p>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="min-w-[100px] w-auto focus-visible:outline-none">
                <SelectValue placeholder="System" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
