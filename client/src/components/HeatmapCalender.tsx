import { useMemo } from "react"
import { format, subDays, eachDayOfInterval, startOfWeek, addDays } from "date-fns"


type Entry = {
  date: string
  income: number
  expense: number
}

function generateMockData(): Entry[] {
  const today = new Date()
  const startDate = subDays(today, 365)
  const days = eachDayOfInterval({ start: startDate, end: today })

  return days.map((date) => ({
    date: format(date, "yyyy-MM-dd"),
    income: Math.floor(Math.random() * 500),
    expense: Math.floor(Math.random() * 500),
  }))
}

export default function HeatmapCalendar() {
  const data = useMemo(() => generateMockData(), [])
  const dataMap = Object.fromEntries(data.map((d) => [d.date, d]))

  const today = new Date()
  const startDate = startOfWeek(subDays(today, 365), { weekStartsOn: 0 }) // Sunday start
  const allDates: Date[] = []
  for (let i = 0; i < 53 * 7; i++) {
    allDates.push(addDays(startDate, i))
  }

  return (
    <div className="overflow-auto p-4">
      <div className="flex items-start gap-1">
        {Array.from({ length: 53 }).map((_, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, rowIdx) => {
              const date = addDays(startDate, colIdx * 7 + rowIdx)
              const dateStr = format(date, "yyyy-MM-dd")
              const entry = dataMap[dateStr]
              const income = entry?.income ?? 0
              const expense = entry?.expense ?? 0
              const net = income - expense

              const color =
                net > 0
                  ? "bg-green-500"
                  : net < 0
                  ? "bg-red-500"
                  : "bg-neutral-300 dark:bg-neutral-600"

              return (
                <div
                  key={dateStr}
                  className={`w-3.5 h-3.5 rounded-sm ${color} group relative cursor-pointer`}
                >
                  {entry && (
                    <div className="absolute z-10 hidden group-hover:flex p-1 text-xs rounded bg-background text-foreground border shadow top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span>
                        {format(date, "MMM d")}: ₹{income} in, ₹{expense} out
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
