interface ArrowIconProps {
    className: string;
}

export function ArrowIcon({ className }: ArrowIconProps) {
    return (
        <svg
            className={className}
            width="70"
            height="45"
            viewBox="0 0 70 45"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M46.5024 43.5L68.5024 22.5L46.5024 1.5"
                fill="none"
                strokeWidth="2"
            />
            <path
                d="M68.5024 22.5C16.0112 22.5 1.29776 22.5 0.502441 22.5"
                fill="none"
                strokeWidth="2"
            />
        </svg>
    );
}
