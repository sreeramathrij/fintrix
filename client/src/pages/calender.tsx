import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface DayData {
  date: string
  income: number
  expense: number
}

function generateMockData(): DayData[] {
  const today = new Date()
  const days: DayData[] = []
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push({
      date: d.toISOString().split("T")[0],
      income: Math.random() > 0.5 ? Math.floor(Math.random() * 200) : 0,
      expense: Math.random() > 0.5 ? Math.floor(Math.random() * 200) : 0,
    })
  }
  return days.reverse()
}

function getColor(income: number, expense: number): string {
  if (income > expense) return "bg-green-500 hover:bg-green-600"
  if (expense > income) return "bg-red-500 hover:bg-red-600"
  if (income === 0 && expense === 0) return "bg-gray-300 dark:bg-gray-700"
  return "bg-gray-400"
}

function groupDataByWeek(data: DayData[]) {
  const weeks: DayData[][] = []
  let currentWeek: DayData[] = []
  data.forEach((item) => {
    const date = new Date(item.date)
    if (date.getDay() === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    currentWeek.push(item)
  })
  if (currentWeek.length > 0) weeks.push(currentWeek)
  return weeks
}

const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export default function GitHubStyleHeatmap() {
  const [data, setData] = useState<DayData[]>([])

  useEffect(() => {
    setData(generateMockData())
  }, [])

  const weeks = groupDataByWeek(data)

  return (
    <TooltipProvider>
      <div className="w-full max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">
          📅 Calendar
        </h1>

        <div className="bg-background p-4">
         
          {/* Month Labels */}
<div className="flex ml-[30px] text-xs text-muted-foreground">
  {weeks.map((week, i) => {
    const firstDate = new Date(week[0]?.date || "")
    const isFirstWeekOfMonth = firstDate.getDate() <= 7
    return (
      <div
        key={i}
        className="w-4 h-4 min-w-[16] flex justify-center items-center text-[10px]"
        style={{ minWidth: 16 }}
      >
        {isFirstWeekOfMonth ? monthNames[firstDate.getMonth()] : ""}
      </div>
    )
  })}
</div>


          {/* Grid */}
          <div className="flex mt-1">
            {/* Weekday Labels */}
           
<div className="flex flex-col text-[10px] text-muted-foreground mr-1">
  {weekdayNames.map((name, idx) => (
    <div key={idx} className="h-4 flex items-center justify-end pr-1">
      {name}
    </div>
  ))}
</div>


            {/* Day Squares */}
            <div className="flex">
              {weeks.map((week, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-[2px] mx-[1px]"
                  style={{ minWidth: 16 }}
                >
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const d = week.find(
                      (d) => new Date(d.date).getDay() === dayIndex
                    )
                    return (
                      <Tooltip key={dayIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "w-4 h-4 min-w-[16] rounded-sm transition-colors",
                              d
                                ? getColor(d.income, d.expense)
                                : "bg-gray-100 dark:bg-gray-800"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {d ? (
                            <div className="text-sm">
                              <p className="font-medium">{d.date}</p>
                              <p>Income: ₹{d.income}</p>
                              <p>Expense: ₹{d.expense}</p>
                            </div>
                          ) : (
                            <span>No data</span>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
