import * as React from 'react';
// Types
// Styles
import { StyledTabSelect, StyledTabulation } from './Tabulation.styled';
import { motion } from 'framer-motion';
import LinkButton from '../button/linkButton/LinkButton';

export type TabType = {
    label: string;
    id: number;
};

export type TypeTabulation = {
    tabList: React.ReactNode[];
    activeTab: number;
    isTabs?: boolean;
    tabs?: TabType[];
    handleChooseTab?: (tab: number) => void;
    handleOpenSharedPopup?: () => void;
};

export function Tabulation({
    isTabs = false,
    tabs,
    handleChooseTab,
    handleOpenSharedPopup,
    ...props
}: TypeTabulation): React.ReactElement<TypeTabulation> {
    const [activeTab, setActiveTab] = React.useState<number>(0);

    const handleChangeTab = () => {
        setActiveTab(props.activeTab);
    };

    React.useEffect(() => {
        handleChangeTab();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeTab]);

    return (
        <StyledTabulation className="tab">
            {isTabs && (
                <nav>
                    <ul>
                        {tabs?.map(item => (
                            <ButtonTab
                                key={item.label}
                                tab={item}
                                selectedTab={tabs[activeTab] || tabs[0]}
                                onClick={() =>
                                    handleChooseTab
                                        ? handleChooseTab(item.id)
                                        : setActiveTab(item.id)
                                }
                            />
                        ))}
                    </ul>
                    {handleOpenSharedPopup && (
                        <div className="share">
                            <LinkButton
                                name="Share"
                                className="button-share"
                                onClick={handleOpenSharedPopup}
                                line
                            />
                        </div>
                    )}
                </nav>
            )}

            {props.tabList[activeTab] || props.tabList[0]}
        </StyledTabulation>
    );
}

interface ButtonTab {
    tab: TabType;
    selectedTab: TabType;
    onClick: () => void;
}

export const ButtonTab = ({ tab, selectedTab, onClick }: ButtonTab) => {
    return (
        <StyledTabSelect
            className={tab.label === selectedTab.label ? 'selected' : ''}
            onClick={onClick}
        >
            {tab.label}
            {tab.label === selectedTab.label ? (
                <motion.span
                    className="underline"
                    initial={{ y: 4 }}
                    animate={{ y: 0 }}
                    exit={{ y: 4 }}
                />
            ) : null}
        </StyledTabSelect>
    );
};

// useStage hook
export const useTabulation = () => {
    const [activeTab, setActiveTab] = React.useState<number>(0);

    const handlePrevStage = () => {
        setActiveTab(activeTab - 1);
    };

    const handleNextStage = () => {
        setActiveTab(activeTab + 1);
    };

    return {
        activeTab,
        handlePrevStage,
        handleNextStage,
        setActiveTab,
    };
};
