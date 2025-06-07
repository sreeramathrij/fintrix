
import { Link } from "react-router-dom";
import {
  User,
  Bell,
  Calendar,
  ClipboardList,
  Wallet,
  AlarmClock,
  PiggyBank,
  Home,
  Settings,
  LayoutDashboard,
  BarChart2,
  Tag,
  Type,
  MessageSquare,
  ArrowRight,
  Info
} from "lucide-react";
import NavFooter from "@/components/NavFooter";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function MoreScreen() {
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
       
        { icon: User, label: "Alwin Albert", link: "/profile" },
      
       
        { icon: Calendar, label: "Calendar", link: "/calendar" },
        { icon: AlarmClock, label: "Scheduled", link: "/scheduled" },
       
        { icon: PiggyBank, label: "Goals", link: "/goals" },
       
        {icon:Info,label:"About", subtitle:"Learn more about the app",link:"/about"},
      ]
    },
    {
       name:"Utilities",
      items: [
        { icon: Wallet, label: "Accounts", link: "/accounts" },
        { icon: BarChart2, label: "Budgets", link: "/budgets" },
        { icon: Tag, label: "Categories", link: "/categories" },
   
      ]
    }
  ];

  return (
    
    
     <div className="min-h-screen bg-background text-primary px-4 py-6 pb-28">
      {/* Top Row: Title + Theme Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight">More Actions</h1>
        <ThemeToggle />
      </div>

      {/* Promo Card */}
      <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 rounded-2xl p-4 text-black shadow mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-lg">
              Cashew{" "}
              <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-sm">
                Pro
              </span>
            </p>
            <p className="text-sm mt-1">Budget like a pro with Cashew Pro</p>
          </div>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>

      {sections.map((section, i) => (
        <div key={i} className="space-y-3 mb-8">
           <div>
              <p className="ml-4 text-xl font-bold">{section.name}</p>
              </div>
          <div className="grid grid-cols-4 gap-3">
           
            {section.items.map((item, index) => (
              <Link
                to={item.link || "#"}
                key={index}
                className="bg-background rounded-xl p-4 flex flex-col justify-center items-center space-x-4 hover:bg-secondary border-2 border-solid border-secondary hover:border-muted-foreground transition h-72"
              >
                <item.icon className="size-32 text-primary" />
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  {"subtitle" in item && (
                    <p className="text-xs text-balance mt-1">{item.subtitle}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <NavFooter page="morePage"/>

      </div>
  );
}
