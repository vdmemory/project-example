import { Section } from '@breef/shared/ui-components';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TabPaymentType, Tabs } from '@breef/ui-kit';
import { Fragment } from 'react';
import { TotalNote } from './TotalNote';

interface HeaderTabsProps {
    amount: number;
    onClick: (key: string) => void;
    isHideTabs?: boolean;
    tabs: TabPaymentType[];
    paymentMethod?: string;
}

export const Tabulation = ({
    amount,
    onClick,
    isHideTabs,
    tabs,
    paymentMethod,
}: HeaderTabsProps) => {
    const handleSelectTab = (key: string) => {
        onClick(key);
    };

    if (isHideTabs) return <TotalNote total={amount} />;

    return (
        <Fragment>
            <h3 className="title">Make Payment</h3>
            <Section label="select a payment method">
                <Tabs
                    className="tabs"
                    tabs={tabs}
                    onClick={handleSelectTab}
                    activeTab={paymentMethod}
                />
            </Section>
        </Fragment>
    );
};
