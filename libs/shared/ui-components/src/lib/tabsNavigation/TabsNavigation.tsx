import { useCallback, useEffect, useRef } from 'react';
import { StyledTabsNavigation } from './TabsNavigation.styled';
import { useRouter } from 'next/router';
import { TabButton } from '../button/tabButton/TabButton';

interface TabsNavigationProps {
    config: { title: string; tab: string; disabled?: boolean }[];
    companyPosition?: string;
}

export default function TabsNavigation({ config }: TabsNavigationProps) {
    const router = useRouter();
    const query: { tab?: string; projectId?: string } = router.query;
    const routerRef = useRef(router);

    const getQueryParams = (newTab: string) => {
        return {
            query: {
                ...(query.projectId && { projectId: query.projectId }),
                tab: newTab,
            },
        };
    };

    const onChangeTab = useCallback(
        (newTab: string) => {
            routerRef.current
                .push(
                    {
                        pathname: router.pathname,
                        ...getQueryParams(newTab),
                    },
                    undefined,
                    { shallow: true },
                )
                .then(() => null);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.pathname],
    );

    useEffect(() => {
        if (!router.isReady) return;

        const tab = config.find(item => item.tab === query.tab);
        const isSelectableTab = tab && !tab.disabled;

        if (!query.tab || !isSelectableTab) {
            onChangeTab(config[0].tab);
        }
    }, [router.isReady, onChangeTab, query.tab]);

    return (
        <StyledTabsNavigation className="tabs-navigation">
            <div className="tabs-container">
                {config.map((tab, key) => {
                    return (
                        <TabButton
                            key={key}
                            title={tab.title}
                            onClick={() => onChangeTab(tab.tab)}
                            isActive={query.tab === tab.tab}
                            disabled={tab.disabled || false}
                        />
                    );
                })}
            </div>
            <div className="row" />
        </StyledTabsNavigation>
    );
}
