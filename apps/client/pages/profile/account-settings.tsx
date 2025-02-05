import { CompanyTypeFormNames } from '@breef/shared/constants';
import {
    AccountSettings,
    getTabsConfigClient,
    Profile,
} from '@breef/shared/feature-profile';
import { AnimateLayoutPage } from '@breef/shared/ui-components';
import Layout from '../../components/layout/Layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const AccountSettingPage: NextPageWithLayout = () => {
    return <AccountSettings companyType={CompanyTypeFormNames.CLIENT} />;
};

AccountSettingPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AnimateLayoutPage headTitle="Client Profile">
                <Profile tabsConfig={getTabsConfigClient()}>{page}</Profile>
            </AnimateLayoutPage>
        </Layout>
    );
};

export default AccountSettingPage;
