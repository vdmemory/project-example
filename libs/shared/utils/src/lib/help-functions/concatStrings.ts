export const concatStrings = (
    values: string[],
    separator: string,
    separatorLast: string,
) => {
    return values.reduce((acc, curr, idx) => {
        if (idx === values.length - 1) return acc + curr;
        if (idx === values.length - 2) return acc + curr + separatorLast;
        return acc + curr + separator;
    }, '');
};
