import { Navigate, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeProvider"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"

import { useAuthStore } from "./store/useAuthStore"

import Layout from "./components/layout"
import HomePage from "./pages/HomePage"
import TransactionsPage from "./pages/transcations"
import BudgetsScreen from "./pages/budgets"
import MoreScreen from "./pages/more"
import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import SettingsPage from "./pages/setting"
import ScheduledPage from "./pages/scheduled"
import AboutPage from "./pages/about"
import EditCategories from "./pages/category"
import AccountPage from "./pages/account."
import GitHubStyleHeatmap from "./pages/calender"
import GoalForm from "./pages/goals"
import { Loader } from "lucide-react"

export default function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore(); 

  useEffect(() => {
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={authUser ? <TransactionsPage /> : <Navigate to="/login" />} />
          <Route path="/budgets" element={authUser ? <BudgetsScreen /> : <Navigate to="/login" />} />
          <Route path="/more" element={authUser ? < MoreScreen/> : <Navigate to="/login" />} />
          <Route path="/register" element={!authUser ? < RegisterPage/> : <Navigate to="/" />} />
          <Route path="/Login" element={!authUser ? < LoginPage/> : <Navigate to="/" />} />
          <Route path="/settings" element={< SettingsPage />} />
          <Route path="/calendar" element={<  GitHubStyleHeatmap />} />
          <Route path="/scheduled" element={< ScheduledPage />} />
          <Route path="/about" element={< AboutPage />} />
          <Route path="/categories" element={< EditCategories />} />
          <Route path="/accounts" element={< AccountPage />} />
          <Route path="/goals" element={< GoalForm />} />
        </Routes>
      </Layout>
      <Toaster />
    </ThemeProvider>
  )
}