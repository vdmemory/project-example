import { useEffect, useState } from 'react';
import { StyledTabs } from './Tabs.styled';
import { TabPaymentType } from './tab/Tab.types';
import { Tab } from './tab/Tab.component';

interface TabsProps {
    tabs: TabPaymentType[];
    className?: string;
    onClick?: (key: string) => void;
    activeTab?: string | null;
}

const Tabs = ({ tabs, className, onClick, activeTab }: TabsProps) => {
    const [active, setActive] = useState<string | null>(activeTab || null);

    useEffect(() => {
        if (activeTab !== undefined) setActive(activeTab);
    }, [activeTab]);

    const handleClick = (key: string) => {
        setActive(key);
        onClick && onClick(key);
    };

    return (
        <StyledTabs className={className}>
            {tabs.map(({ label, icon, key }) => (
                <Tab
                    key={key}
                    value={key}
                    title={label}
                    icon={icon}
                    onClick={handleClick}
                    isActive={active === key}
                />
            ))}
        </StyledTabs>
    );
};

export { Tabs, type TabPaymentType };
