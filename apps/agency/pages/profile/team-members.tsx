import { getTabsConfigAgency, Profile } from '@breef/shared/feature-profile';
import { AnimateLayoutPage, TeamMembers } from '@breef/shared/ui-components';
import Layout from '../../components/layout/Layout';
import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from '../_app';
import { useGetTeamMembersQuery } from '@breef/shared/data-access-profile';
import { toast } from 'react-toastify';

const TeamMembersPage: NextPageWithLayout = () => {
    const { data, isLoading, isError, error } = useGetTeamMembersQuery();

    useEffect(() => {
        if (isError) {
            console.log(error);
            toast.error('An error occurred while loading team members');
        }
    }, [error, isError]);

    return <TeamMembers isLoading={isLoading} teamMembersInfo={data} />;
};

TeamMembersPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AnimateLayoutPage headTitle="Agency Profile">
                <Profile tabsConfig={getTabsConfigAgency()}>{page}</Profile>
            </AnimateLayoutPage>
        </Layout>
    );
};

export default TeamMembersPage;
