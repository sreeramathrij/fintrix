import { Camera, Home, MoreHorizontal, PieChart } from "lucide-react"
import { Link } from "react-router-dom"


const NavFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around py-2">
        <Link to="/" className="flex flex-col items-center text-primary">
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/transactions" className="flex flex-col items-center text-muted-foreground">
          <Camera size={20} />
          <span className="text-xs">Transactions</span>
        </Link>
        <Link to="/budgets" className="flex flex-col items-center text-muted-foreground">
          <PieChart size={20} />
          <span className="text-xs">Budgets</span>
        </Link>
        <Link to="/more" className="flex flex-col items-center text-muted-foreground">
          <MoreHorizontal size={20} />
          <span className="text-xs">More</span>
        </Link>
      </div>
  
  )
}

export default NavFooter