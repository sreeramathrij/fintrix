import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ThemeProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import HomePage from "@/pages/HomePage"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="finance-theme">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* You can add more routes like login, profile, etc */}
          </Routes>
        </Router>
        <Toaster richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App