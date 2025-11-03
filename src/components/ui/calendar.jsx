import * as React from "react";
import { cn } from "@/lib/utils";

const Calendar = React.forwardRef(
  ({ className, showOutsideDays = true, ...props }, ref) => {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState(null);

    // Get first day of month and number of days
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const isToday = (date) => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    };

    const isCurrentMonth = (date) => {
      return date.getMonth() === currentDate.getMonth();
    };

    const isSelected = (date) => {
      return (
        selectedDate && date.toDateString() === selectedDate.toDateString()
      );
    };

    const nextMonth = () => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    };

    const prevMonth = () => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    };

    const handleDateClick = (date) => {
      setSelectedDate(date);
      if (props.onSelect) {
        props.onSelect(date);
      }
    };

    return (
      <div className={cn("p-3", className)} ref={ref}>
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
            ←
          </button>
          <h2 className="text-lg font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 p-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={cn(
                "p-2 text-sm rounded-md hover:bg-gray-100 transition-colors",
                {
                  "text-gray-400": !isCurrentMonth(day),
                  "bg-blue-600 text-white hover:bg-blue-700": isSelected(day),
                  "bg-blue-100 text-blue-900": isToday(day) && !isSelected(day),
                  "font-semibold": isToday(day),
                }
              )}
            >
              {day.getDate()}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
Calendar.displayName = "Calendar";

export { Calendar };
