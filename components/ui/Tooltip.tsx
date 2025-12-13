import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TooltipProps {
    content: string;
    className?: string;
}

export function Tooltip({ content, className }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const tooltipWidth = 256; // w-64 = 16rem = 256px
            const padding = 12; // padding from screen edges

            let left = rect.left + (rect.width / 2);

            // Prevent overflow on left edge
            if (left - (tooltipWidth / 2) < padding) {
                left = (tooltipWidth / 2) + padding;
            }
            // Prevent overflow on right edge
            if (left + (tooltipWidth / 2) > window.innerWidth - padding) {
                left = window.innerWidth - (tooltipWidth / 2) - padding;
            }

            setPosition({
                top: rect.top - 4,
                left: left,
            });
        }
    };

    useEffect(() => {
        if (isVisible) {
            updatePosition();
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition, true);
        }
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isVisible]);

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onMouseEnter={() => {
                    updatePosition();
                    setIsVisible(true);
                }}
                onMouseLeave={() => setIsVisible(false)}
                onClick={(e) => {
                    e.preventDefault(); // Prevent form submit or focus issues
                    e.stopPropagation(); // Prevent triggering parent click handlers (like checkbox toggle)
                    updatePosition();
                    setIsVisible(!isVisible);
                }}
                className="inline-flex items-center ml-2 text-gray-500 hover:text-blue-400 transition-colors focus:outline-none z-10"
                aria-label="Mais informações"
            >
                <Info className="w-4 h-4" />
            </button>

            {isVisible && createPortal(
                <div
                    className={cn(
                        "fixed -translate-x-1/2 -translate-y-full w-64 p-3 pointer-events-none", // Fixed position relative to viewport
                        "bg-[#2a2a2a] border border-white/10 rounded-xl shadow-2xl",
                        "text-xs text-gray-300 leading-relaxed text-center",
                        "animate-in fade-in zoom-in-95 duration-200",
                        "z-[99999]", // Extremely high indexing
                        className
                    )}
                    style={{
                        top: position.top,
                        left: position.left,
                    }}
                >
                    {content}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-[#2a2a2a]" />
                </div>,
                document.body
            )}
        </>
    );
}
