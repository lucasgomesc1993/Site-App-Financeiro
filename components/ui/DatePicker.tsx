import React, { useState, useEffect, useRef } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, getYear, getMonth, setMonth, setYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DatePickerProps {
    value?: string | Date;
    onChange: (date: string) => void;
    label?: string;
    id?: string;
    className?: string;
    placeholder?: string;
    error?: string;
}

export function DatePicker({ value, onChange, label, id, className, placeholder = "Selecione uma data", error }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<'days' | 'months' | 'years'>('days');

    // Initialize selectedDate from value
    useEffect(() => {
        if (value) {
            const date = typeof value === 'string' ? new Date(value + 'T12:00:00') : value;
            if (!isNaN(date.getTime())) {
                setSelectedDate(date);
                setCurrentDate(date);
            }
        } else {
            setSelectedDate(null);
        }
    }, [value]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setView('days');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const nextYear = () => setCurrentDate(addMonths(currentDate, 12));
    const prevYear = () => setCurrentDate(subMonths(currentDate, 12));

    const onDateClick = (day: Date) => {
        // Format to YYYY-MM-DD for consistency with input type="date"
        const formattedDate = format(day, 'yyyy-MM-dd');
        onChange(formattedDate);
        setIsOpen(false);
        setView('days');
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-4 px-2">
                <button
                    type="button"
                    onClick={view === 'days' ? prevMonth : prevYear}
                    className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                    type="button"
                    onClick={() => setView(view === 'days' ? 'months' : 'years')}
                    className="font-semibold text-white hover:bg-white/10 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
                >
                    {view === 'days' && format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                    {view === 'months' && format(currentDate, 'yyyy', { locale: ptBR })}
                    {view === 'years' && `${getYear(currentDate) - 5} - ${getYear(currentDate) + 6}`}
                    <ChevronDown className={`w-4 h-4 transition-transform ${view !== 'days' ? 'rotate-180' : ''}`} />
                </button>

                <button
                    type="button"
                    onClick={view === 'days' ? nextMonth : nextYear}
                    className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

        return (
            <>
                <div className="grid grid-cols-7 mb-2">
                    {daysOfWeek.map((d, i) => (
                        <div key={i} className="text-center text-xs font-medium text-gray-500 py-1">
                            {d}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {(() => {
                        const calendarDays = [];
                        let currentDay = startDate;

                        while (currentDay <= endDate) {
                            calendarDays.push(currentDay);
                            currentDay = addDays(currentDay, 1);
                        }

                        return calendarDays.map((date, idx) => {
                            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                            const isCurrentMonth = isSameMonth(date, monthStart);

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => onDateClick(date)}
                                    className={cn(
                                        "h-8 w-8 rounded-lg text-sm flex items-center justify-center transition-all",
                                        !isCurrentMonth && "text-gray-600",
                                        isCurrentMonth && !isSelected && "text-gray-300 hover:bg-white/10 hover:text-white",
                                        isSelected && "bg-blue-500 text-white shadow-lg shadow-blue-500/20 font-medium"
                                    )}
                                >
                                    {format(date, 'd')}
                                </button>
                            );
                        });
                    })()}
                </div>
            </>
        );
    };

    const renderMonths = () => {
        const months = [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];

        return (
            <div className="grid grid-cols-3 gap-2">
                {months.map((month, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => {
                            setCurrentDate(setMonth(currentDate, idx));
                            setView('days');
                        }}
                        className={cn(
                            "p-2 rounded-lg text-sm transition-colors",
                            getMonth(currentDate) === idx
                                ? "bg-blue-500 text-white"
                                : "text-gray-300 hover:bg-white/10"
                        )}
                    >
                        {month}
                    </button>
                ))}
            </div>
        );
    };

    const renderYears = () => {
        const currentYear = getYear(currentDate);
        const startYear = currentYear - 5;
        const years = Array.from({ length: 12 }, (_, i) => startYear + i);

        return (
            <div className="grid grid-cols-3 gap-2">
                {years.map((year) => (
                    <button
                        key={year}
                        type="button"
                        onClick={() => {
                            setCurrentDate(setYear(currentDate, year));
                            setView('months');
                        }}
                        className={cn(
                            "p-2 rounded-lg text-sm transition-colors",
                            year === currentYear
                                ? "bg-blue-500 text-white"
                                : "text-gray-300 hover:bg-white/10"
                        )}
                    >
                        {year}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className={cn("space-y-2", className)} ref={containerRef}>
            {label && <label htmlFor={id} className="text-sm text-gray-400">{label}</label>}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-left flex items-center justify-between transition-all focus:outline-none focus:border-blue-500/50",
                        !selectedDate && "text-gray-400",
                        selectedDate && "text-white",
                        isOpen && "border-blue-500/50"
                    )}
                >
                    <span className="truncate">
                        {selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : placeholder}
                    </span>
                    <CalendarIcon className="w-4 h-4 text-gray-400 shrink-0" />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 z-50 mt-2 w-[300px] p-4 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                        {renderHeader()}
                        {view === 'days' && renderDays()}
                        {view === 'months' && renderMonths()}
                        {view === 'years' && renderYears()}
                    </div>
                )}
            </div>
            {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
    );
}
