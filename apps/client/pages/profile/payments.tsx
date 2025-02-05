import {
    getTabsConfigClient,
    Payments,
    Profile,
} from '@breef/shared/feature-profile';
import { AnimateLayoutPage, StripeElements } from '@breef/shared/ui-components';
import Layout from '../../components/layout/Layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const PaymentsPage: NextPageWithLayout = () => {
    return (
        <StripeElements>
            <Payments />
        </StripeElements>
    );
};

PaymentsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AnimateLayoutPage headTitle="Client Profile">
                <Profile tabsConfig={getTabsConfigClient()}>{page}</Profile>
            </AnimateLayoutPage>
        </Layout>
    );
};

export default PaymentsPage;
