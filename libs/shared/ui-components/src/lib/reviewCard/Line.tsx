export const Line = ({ w }: { w: number }) => {
    if (!w) return null;

    return (
        <svg
            width={w + 1}
            height="3"
            viewBox={`0 0 ${w + 1} 3`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d={`M1.10113 2.13563C45.4791 1.08911 89.7002 0.961428 ${w} 0.819536`}
                stroke="#E69D79"
                strokeLinecap="round"
            />
        </svg>
    );
};
