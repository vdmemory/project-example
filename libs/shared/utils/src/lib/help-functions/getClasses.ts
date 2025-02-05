export const getClasses = (base: string, className?: string[] | string) => {
    const classes = [base];

    if (Array.isArray(className)) classes.push(...className);
    else if (className) classes.push(className);
    const filteredClasses = classes.filter(c => c);
    return filteredClasses.join(' ');
};
