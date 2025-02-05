import { useEffect } from 'react';
import { StyledProfile, StyledProfileContent } from './Profile.styled';
import Header from './header/Header';
import { useRouter } from 'next/router';
import { useRouteControl } from '@breef/shared/hooks';
import { Spinner } from '@breef/shared/ui-components';
import { TabsProfile } from '@breef/shared/constants';
import { TabProfileType } from '@breef/shared/types';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';

export default function Profile({
    children,
    tabsConfig,
}: {
    children: React.ReactNode;
    tabsConfig: TabProfileType[];
}) {
    const router = useRouter();
    const { changePage, pathname } = useRouteControl();
    const { data, isSuccess } = useGetSelfQuery();

    const removeTab =
        isSuccess && data.companyPosition === 'member'
            ? TabsProfile.payments
            : '';
    const tabs = tabsConfig.filter(item => item.tab !== removeTab);

    useEffect(() => {
        if (router.isReady && !tabs.some(item => item.route === pathname)) {
            changePage(tabs[0].route);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, router.isReady, tabs]);

    return (
        <StyledProfile>
            <Header tabsConfig={tabs} />
            <StyledProfileContent
                data-testid="profile-content-wrapper"
                className="profile"
            >
                {children}
            </StyledProfileContent>
        </StyledProfile>
    );
}
