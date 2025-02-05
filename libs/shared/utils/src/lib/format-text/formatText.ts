import numeral from 'numeral';

export const shotBudgetToLongBudget = ({ value }: { value: string }) => {
    const valueArray = value?.split('-');
    if (valueArray?.length < 2) {
        return (
            valueArray &&
            `${numeral(valueArray[0].trim().replace('+', '')).format(
                '$0,0.00',
            )}`
        );
    }
    return (
        valueArray &&
        `${numeral(valueArray[0].trim()).format('$0,0')} - ${numeral(
            valueArray[1].trim(),
        ).format('$0,0')}`
    );
};

export const shotBudgetToMinMax = (value: string) => {
    if (!value) return { min: 0, max: 0 };
    const valueArray = value?.split('-');
    let maxBudget = 0;
    let minBudget = 0;

    if (valueArray?.length < 2) {
        minBudget = numeral(valueArray[0].trim().replace('+', '')).value() || 0;
        maxBudget = minBudget && minBudget * 1.2;
    }
    if (valueArray?.length >= 2) {
        minBudget = numeral(valueArray[0].trim()).value() || 0;
        maxBudget = numeral(valueArray[1].trim()).value() || 0;
    }

    return {
        min: minBudget,
        max: maxBudget,
    };
};

export const formatBudgetCost = (value: number) => {
    return numeral(value).format('$0,0.00');
};
export const formatShortBudgetCost = (value: number | null) => {
    if (value === null) return '0';
    return numeral(value).format('$0,0');
};

export const ucFirst = (str: string) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
};

export const replaceAmountToString = (amount: number): string => {
    return Number.isInteger(amount)
        ? formatShortBudgetCost(amount)
        : formatBudgetCost(amount);
};
