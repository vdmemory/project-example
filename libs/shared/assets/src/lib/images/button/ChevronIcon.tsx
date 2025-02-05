import React from 'react';

interface ChevronIconProps {
    className: string;
}

export function ChevronIcon({ className }: ChevronIconProps) {
    return (
        <svg
            className={className}
            width="26"
            height="13"
            viewBox="0 0 26 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M24.41 12C17.3472 7.96621 12.91 1 12.91 1C12.91 1 7.88171 7.96621 1.40997 12"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
