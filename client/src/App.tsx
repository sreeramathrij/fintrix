import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ThemeProvider } from "../components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"

import HomePage from "@/pages/HomePage"
import type { JSX } from "react"
// import LoginPage from "@/pages/login" // Optional

const queryClient = new QueryClient()

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="finance-theme">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
          </Routes>
        </Router>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
