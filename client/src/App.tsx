import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import Layout from "./components/layout"
import HomePage from "./pages/HomePage"
import TransactionsPage from "./pages/transcations"
import BudgetsScreen from "./pages/budgets"
import MoreScreen from "./pages/more"
import RegisterPage from "./pages/Register"

export default function App() {
return (
<ThemeProvider>
<Layout>
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/transactions" element={<TransactionsPage />} />
<Route path="/budgets" element={<BudgetsScreen />} />
<Route path="/more" element={< MoreScreen/>} />
<Route path="/Register" element={< RegisterPage/>} />

</Routes>
</Layout>
<Toaster />
</ThemeProvider>
)
}