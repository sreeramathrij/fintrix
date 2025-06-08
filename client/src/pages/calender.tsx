import { useState } from "react"
import { Plus } from "lucide-react"
import {cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function CalendarPage() {
  const today = new Date()
  const currentYear = today.getFullYear()

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(today.getDate())

  const months = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(currentYear, i, 1))
  )

  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date(2025, 5, i + 1))
  )

  const daysInMonth = new Date(currentYear, selectedMonthIndex + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, selectedMonthIndex, 1).getDay()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="p-4 pb-24 sm:pb-32 max-w-md mx-auto min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        
        <h1 className="text-2xl sm:text-3xl font-bold">Calendar</h1>
      </div>

      {/* Month Selector */}
      <div className="flex overflow-x-auto no-scrollbar gap-4 pb-3 mb-4 border-b border-border scroll-smooth snap-x">
        {months.map((month, idx) => (
          <button
            key={month}
            onClick={() => setSelectedMonthIndex(idx)}
            className={cn(
              "px-2 pb-2 text-sm sm:text-base font-medium relative whitespace-nowrap snap-start",
              selectedMonthIndex === idx ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {month}
            {selectedMonthIndex === idx && (
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-xs sm:text-sm text-muted-foreground mb-2">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-4 text-center text-base font-medium">
        {Array(firstDayOfMonth).fill(null).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={cn(
              "w-8 h-8 sm:w-9 sm:h-9 rounded-full mx-auto flex items-center justify-center",
              selectedDay === day
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-foreground"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Floating Add Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 rounded-2xl bg-muted text-foreground shadow-xl"
      >
        <Plus />
      </Button>
    </div>
  )
}
