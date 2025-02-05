import { Fragment, useContext } from 'react';
import dynamic from 'next/dynamic';
import { LinkUpRightIcon, TabPaymentType } from '@breef/ui-kit';
import { BREEF_PAY_INFORMATION_ROUTE } from '@breef/shared/constants';
import { Button } from '@breef/shared/ui-components';
import { StyledBreefPaySection } from './BreefPaySection.styled';
import { Tabulation } from '../Tabulation';
import { linkClick } from '@breef/shared/utils';
import { useMediaContext } from '@breef/shared/hooks';

const BreefPayImage = dynamic(
    () =>
        import('@breef/ui-kit').then(module => ({
            default: module.BreefPayImage,
        })),
    {
        ssr: false,
    },
);
const BreefPayMinImage = dynamic(
    () =>
        import('@breef/ui-kit').then(module => ({
            default: module.BreefPayMinImage,
        })),
    {
        ssr: false,
    },
);

interface BreefPaySectionProps {
    onClick: (key: string) => void;
    isHideTabs?: boolean;
    tabs: TabPaymentType[];
    paymentMethod?: string;
    amount: number;
}

export const BreefPaySection = ({
    onClick,
    isHideTabs,
    tabs,
    paymentMethod,
    amount,
}: BreefPaySectionProps) => {
    const { isMaxMobile } = useMediaContext();

    const handleConfirm = () => {
        return linkClick(BREEF_PAY_INFORMATION_ROUTE);
    };

    return (
        <Fragment>
            <Tabulation
                amount={amount}
                onClick={onClick}
                isHideTabs={isHideTabs}
                tabs={tabs}
                paymentMethod={paymentMethod}
            />
            <StyledBreefPaySection>
                {isMaxMobile ? <BreefPayMinImage /> : <BreefPayImage />}
                <h2 className="breef-pay-title">GROW NOW, PAY LATER</h2>
                <p className="breef-pay-subtitle">
                    Breef(Pay) is a revolutionary approach to project payments.
                    Start on time, pay over time. Grow faster!
                </p>
                <Button
                    type="button"
                    className="normal btn-breef-pay"
                    onClick={handleConfirm}
                    title={'Learn More'}
                    arrowRight
                    withAnimate
                    color="transparent"
                    iconButton={<LinkUpRightIcon />}
                />
            </StyledBreefPaySection>
        </Fragment>
    );
};

export default BreefPaySection;
