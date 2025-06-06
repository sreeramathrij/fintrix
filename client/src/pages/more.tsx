import { Button } from "@/components/ui/button";
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
  ArrowRight
} from "lucide-react";
import NavFooter from "@/components/NavFooter";

export default function MoreScreen() {
  const sections = [
    {
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
      items: [
        { icon: MessageSquare, label: "Feedback", link: "/feedback" },
        { icon: User, label: "Alwin Albert", link: "/profile" },
        { icon: Bell, label: "Notifications", link: "/notifications" },
        { icon: ClipboardList, label: "Activity Log", link: "/activity" },
        { icon: Calendar, label: "Calendar", link: "/calendar" },
        { icon: AlarmClock, label: "Scheduled", link: "/scheduled" },
        { icon: Wallet, label: "Subscriptions", link: "/subscriptions" },
        { icon: PiggyBank, label: "Goals", link: "/goals" },
        { icon: Home, label: "Loans", link: "/loans" }
      ]
    },
    {
      items: [
        { icon: Wallet, label: "Accounts", link: "/accounts" },
        { icon: BarChart2, label: "Budgets", link: "/budgets" },
        { icon: Tag, label: "Categories", link: "/categories" },
        { icon: Type, label: "Titles", link: "/titles" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-white px-4 py-6 pb-28">
      <h1 className="text-3xl font-bold tracking-tight mb-4">More Actions</h1>

      <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 rounded-2xl p-4 text-black shadow mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-lg">Cashew <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-sm">Pro</span></p>
            <p className="text-sm mt-1">Budget like a pro with Cashew Pro</p>
          </div>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>

      {sections.map((section, i) => (
        <div key={i} className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            {section.items.map((item, index) => (
              <Link
                to={item.link || "#"}
                key={index}
                className="bg-[#2C2C2E] rounded-xl p-4 flex items-center space-x-4 hover:bg-[#3A3A3C] transition"
              >
                <item.icon className="w-5 h-5 text-white" />
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  {"subtitle" in item && (
                    <p className="text-xs text-gray-400 mt-1">{item.subtitle}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <NavFooter/>

      </div>
  );
}
