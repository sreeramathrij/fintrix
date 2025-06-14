
import { Link } from "react-router-dom";
import {
  User,
  Calendar,
  Wallet,
  AlarmClock,
  PiggyBank,
  Settings,
  LayoutDashboard,
  BarChart2,
  Tag,
  ArrowRight,
  Info
} from "lucide-react";
import { motion } from "motion/react";
import useMeasure from "react-use-measure";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";

export default function MoreScreen() {
  const [ref, { width }] = useMeasure();
  const {authUser}=useAuthStore();
  

  const user = {
    icon: User,
    name: "Alwin Albert",
    email: "alwin@email.com",
   
    link: "/profile",
   
  }

  const sections = [
    {
      name:"Customization",
      items: [
        {
          icon: Settings,
          label: "Settings & Customization",
          subtitle: "Theme, Language, Import/Export CSV",
          link: "/settings"
        },
        {
          icon: LayoutDashboard,
          label: "All Spending Summary",
          subtitle: "Your spending statistics all in one place",
          link: "/summary"
        }
      ]
    },
    
    {
       name:"Info",
      items: [
        { icon: Calendar, label: "Calendar", link: "/calendar" },
        { icon: AlarmClock, label: "Scheduled", link: "/scheduled" },
        { icon: PiggyBank, label: "Goals", link: "/goals" },
        {icon:Info,label:"About", subtitle:"Learn more about the app",link:"/about"},
      ]
    },
    {
       name:"Utilities",
      items: [
        
        { icon: BarChart2, label: "Budgets", link: "/budgets" },
        { icon: Tag, label: "Categories", link: "/categories" },
   
      ]
    }
  ];

  const [theme, setTheme] = useState("dark");
  

  return (
    
    
     <motion.div className="flex">
      <Sidebar />
      <motion.div
        ref={ref}
        animate={{ width, transition: {duration: 2} }}
        className="min-h-screen flex-1 bg-background text-primary px-4 py-6 pb-28"
      >
        {/* Top Row: Title + Theme Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold tracking-tight">More Actions</h1>
          <div onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}><ThemeToggle /></div>
        </div>

        {/* Promo Card */}
        <Link to={user.link} className="h-32 w-[100%] group relative flex items-center justify-center overflow-hidden text-primary-foreground shadow rounded-2xl">
          <div className={`text-primary-foreground absolute left-0 z-[1] h-[100%] w-[200%] bg-gradient-to-r ${theme === "dark" ? "from-pink-200 via-purple-200  to-indigo-300" : "from-purple-400 via-blue-500  to-indigo-700"} px-8 py-4 transition-all duration-400 group-hover:left-[-100%]`}></div>
          <div className="z-10 flex w-[95%] items-center justify-between">    
            <div className="gap-2 flex justify-between items-center">
              <img className="border size-20 rounded-full object-cover" 
              src={authUser?.profilePic}/>
              <div>
              <p className="font-bold text-xl">
                {authUser?.name}
              </p>
                <p className="text-lg">{authUser?.email}</p>
               
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />   
          </div> 
        </Link>

        {sections.map((section, i) => (
          <div key={i} className="space-y-3 my-8">
            <div>
                <p className="ml-4 text-xl font-bold">{section.name}</p>
                </div>
            <div className="flex flex-wrap gap-8">
            
              {section.items.map((item, index) => (
                <Link
                  to={item.link || "#"}
                  key={index}
                  className="bg-background rounded-xl p-4 flex flex-col justify-center items-center hover:bg-secondary border-2 border-solid border-secondary-foreground/10 hover:border-muted-foreground transition size-64"
                >
                  <item.icon className="size-36 text-primary" />
                  <div className="flex flex-col items-center justify-center h-12">
                    <p className="font-medium text-sm size-fit">{item.label}</p> 
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        </motion.div>
      </motion.div>
  );
}
