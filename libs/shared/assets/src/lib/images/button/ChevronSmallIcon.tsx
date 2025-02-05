import React from 'react';

interface ChevronSmallIconProps {
    className?: string;
}

export function ChevronSmallIcon({ className }: ChevronSmallIconProps) {
    return (
        <svg
            className={className}
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 1C5.2991 3.56696 8 8 8 8C8 8 11.0607 3.56696 15 1"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
