import { createBrowserRouter } from "react-router-dom"
import App from "../App.tsx"
import Login from "../pages/Login"
import Register from "../pages/Register"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
])
