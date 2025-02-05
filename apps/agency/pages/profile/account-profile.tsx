import { CompanyTypeFormNames } from '@breef/shared/constants';
import {
    CompanyProfile,
    getTabsConfigAgency,
    Profile,
} from '@breef/shared/feature-profile';
import { AnimateLayoutPage } from '@breef/shared/ui-components';
import Layout from '../../components/layout/Layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const AccountProfilePage: NextPageWithLayout = () => {
    return <CompanyProfile companyType={CompanyTypeFormNames.AGENCY} />;
};

AccountProfilePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AnimateLayoutPage headTitle="Agency Profile">
                <Profile tabsConfig={getTabsConfigAgency()}>{page}</Profile>
            </AnimateLayoutPage>
        </Layout>
    );
};

export default AccountProfilePage;
