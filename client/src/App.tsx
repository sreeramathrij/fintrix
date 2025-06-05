import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import Layout from "./components/layout"
import HomePage from "./pages/HomePage"
import TransactionsPage from "./pages/transcations"

export default function App() {
return (
<ThemeProvider>
<Layout>
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/transactions" element={<TransactionsPage />} />
</Routes>
</Layout>
<Toaster />
</ThemeProvider>
)
}