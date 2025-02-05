import numeral from 'numeral';

export const isEstimateExceedingBudget = ({
    budget,
    estimate,
    percent,
}: {
    budget: number;
    estimate: string;
    percent: number;
}) => {
    const parsedEstimate = estimate.split('-');
    const currentEstimate = numeral(
        parsedEstimate[parsedEstimate.length - 1],
    ).value();
    const maximumAllowableEstimate =
        currentEstimate && currentEstimate + (currentEstimate / 100) * percent;
    return maximumAllowableEstimate
        ? budget <= maximumAllowableEstimate
        : false;
};
