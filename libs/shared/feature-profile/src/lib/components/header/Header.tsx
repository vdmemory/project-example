import { TabButton } from '@breef/shared/ui-components';
import { StyledHeader, StyledTabsNav } from './Header.styled';
import { TabProfileType } from '@breef/shared/types';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';

export default function Header({
    tabsConfig,
}: {
    tabsConfig: TabProfileType[];
}) {
    const { isMobile } = useMediaContext();

    return (
        <StyledHeader>
            <h1>{isMobile ? 'Profile' : 'Your Profile'}</h1>
            <TabsNav config={tabsConfig} />
        </StyledHeader>
    );
}

interface TabsNavProps {
    config: TabProfileType[];
    companyPosition?: string;
}

function TabsNav({ config }: TabsNavProps) {
    const { changePage, pathname } = useRouteControl();

    const renderProfileTab = (
        { title, route, tab }: TabProfileType,
        key: number,
    ) => (
        <TabButton
            key={`tab-link-${tab}-${key}`}
            title={title}
            onClick={() => changePage(route)}
            isActive={pathname === route}
        />
    );

    return (
        <StyledTabsNav className="tabs-nav">
            <div className="tabs-inner">{config?.map(renderProfileTab)}</div>
            <div className="row" />
        </StyledTabsNav>
    );
}
