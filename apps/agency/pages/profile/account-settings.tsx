import { CompanyTypeFormNames } from '@breef/shared/constants';
import {
    AccountSettings,
    getTabsConfigAgency,
    Profile,
} from '@breef/shared/feature-profile';
import { AnimateLayoutPage } from '@breef/shared/ui-components';
import Layout from '../../components/layout/Layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const AccountSettingPage: NextPageWithLayout = () => {
    return <AccountSettings companyType={CompanyTypeFormNames.AGENCY} />;
};

AccountSettingPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AnimateLayoutPage headTitle="Agency Profile">
                <Profile tabsConfig={getTabsConfigAgency()}>{page}</Profile>
            </AnimateLayoutPage>
        </Layout>
    );
};

export default AccountSettingPage;
