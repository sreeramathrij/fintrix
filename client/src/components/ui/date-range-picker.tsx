import * as React from "react"
import { type DateRange } from "react-day-picker"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface DateRangePickerProps {
  value?: DateRange
  onChange: (range: DateRange | undefined) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "MMM dd, yyyy")} -{" "}
                {format(value.to, "MMM dd, yyyy")}
              </>
            ) : (
              format(value.from, "MMM dd, yyyy")
            )
          ) : (
            <span>Select a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
