import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (date: string) => void;
  placeholder?: string;
  error?: boolean;
  minYear?: number;
  maxYear?: number;
  label?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  error = false,
  minYear = 1940,
  maxYear = new Date().getFullYear() + 5,
  label
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value
  const initialDate = value ? new Date(value) : new Date();
  const isValidValue = value && !isNaN(initialDate.getTime());

  // Calendar view state (year and month currently viewing in calendar)
  const [viewYear, setViewYear] = useState(isValidValue ? initialDate.getFullYear() : new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(isValidValue ? initialDate.getMonth() : new Date().getMonth());

  // Whenever value changes to a valid date, keep calendar view in sync
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Handle outside click to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date for user display: "Mar 12, 1995"
  const getFormattedDisplay = () => {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    const day = d.getDate();
    const month = MONTHS[d.getMonth()].substring(0, 3);
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Generate days array for grid
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfWeek = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = getFirstDayOfWeek(viewYear, viewMonth);

  const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);

  const calendarDays: Array<{ day: number; monthOffset: number; dateString: string }> = [];

  // Previous month padding
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevDay = prevMonthDays - i;
    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const monthStr = String(prevMonth + 1).padStart(2, '0');
    const dayStr = String(prevDay).padStart(2, '0');
    calendarDays.push({
      day: prevDay,
      monthOffset: -1,
      dateString: `${prevYear}-${monthStr}-${dayStr}`
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    calendarDays.push({
      day: d,
      monthOffset: 0,
      dateString: `${viewYear}-${monthStr}-${dayStr}`
    });
  }

  // Next month padding to fill standard 42-grid (6 rows * 7 days)
  const totalSlots = 42;
  const nextMonthPadding = totalSlots - calendarDays.length;
  for (let d = 1; d <= nextMonthPadding; d++) {
    const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    const monthStr = String(nextMonth + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    calendarDays.push({
      day: d,
      monthOffset: 1,
      dateString: `${nextYear}-${monthStr}-${dayStr}`
    });
  }

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (dateStr: string) => {
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  // Generate Year dropdown options
  const years = [];
  for (let y = maxYear; y >= minYear; y--) {
    years.push(y);
  }

  return (
    <div className="relative w-full text-left font-sans" ref={containerRef}>
      {label && (
        <label className="text-[14px] font-semibold text-slate-700 block mb-1">
          {label}
        </label>
      )}

      {/* Styled Input Container Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center h-10 border rounded-xl bg-white overflow-hidden transition-all duration-200 cursor-pointer shadow-3xs select-none
          ${error 
            ? 'border-rose-400 bg-rose-50/10 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500' 
            : isOpen 
              ? 'border-[#7553FF] ring-1 ring-[#7553FF] shadow-md' 
              : 'border-slate-200 hover:border-slate-300'
          }`}
      >
        <div className="absolute left-3.5 text-slate-700 pointer-events-none flex items-center justify-center">
          <CalendarIcon className={`w-4 h-4 transition-colors duration-200 ${isOpen ? 'text-[#7553FF]' : 'text-slate-700'}`} />
        </div>

        <div className="w-full pl-10 pr-10 text-[14px] text-slate-800 font-medium truncate">
          {isValidValue ? (
            getFormattedDisplay()
          ) : (
            <span className="text-slate-700 font-normal">{placeholder}</span>
          )}
        </div>

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full text-slate-700 hover:text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 mt-2 w-[290px] bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-slate-800"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between gap-1 mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg border border-slate-100 text-slate-700 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1">
                {/* Month Select */}
                <select
                  value={viewMonth}
                  onChange={(e) => setViewMonth(Number(e.target.value))}
                  className="px-2 py-1 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-transparent rounded-lg cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#7553FF]"
                >
                  {MONTHS.map((m, idx) => (
                    <option key={m} value={idx}>
                      {m.substring(0, 3)}
                    </option>
                  ))}
                </select>

                {/* Year Select */}
                <select
                  value={viewYear}
                  onChange={(e) => setViewYear(Number(e.target.value))}
                  className="px-2 py-1 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-transparent rounded-lg cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#7553FF]"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg border border-slate-100 text-slate-700 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Weekdays Labels */}
            <div className="grid grid-cols-7 gap-y-1 text-center mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, index) => (
                <span key={index} className="text-[10px] font-bold tracking-wider text-slate-700">
                  {d}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((cell, index) => {
                const isSelected = value === cell.dateString;
                const isToday = new Date().toISOString().split('T')[0] === cell.dateString;
                const isCurrentMonth = cell.monthOffset === 0;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectDay(cell.dateString)}
                    className={`h-7 w-7 text-[11px] font-medium rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer
                      ${isSelected 
                        ? 'bg-[#7553FF] text-white shadow-xs font-semibold' 
                        : isToday 
                          ? 'border border-[#7553FF]/40 text-[#7553FF] hover:bg-[#7553FF]/5' 
                          : isCurrentMonth
                            ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                            : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  const todayStr = new Date().toISOString().split('T')[0];
                  handleSelectDay(todayStr);
                }}
                className="text-[11px] font-bold text-[#7553FF] hover:underline cursor-pointer bg-transparent border-none"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-semibold text-slate-700 hover:text-slate-600 cursor-pointer bg-transparent border-none"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
