import { StyledCompanyProfile } from './CompanyProfile.styled';
import { Accordion, LipsLoader } from '@breef/shared/ui-components';
import CompanyInfoForm from './companyInfoForm/CompanyInfoForm';
import BillingAddressForm from '../billingAddressForm/BillingAddressForm';
import { useGetRestrictions, useMediaContext } from '@breef/shared/hooks';
import { Restrictions } from '@breef/shared/constants';
import { useCompProfileAsyncMethods } from './useCompProfileAsyncMethods';
import { Fragment, useEffect } from 'react';
import IndustriesTagsForm from './industriesTags/IndustriesTagsForm';
import LinksDocsForm from './linksDocs/LinksDocsForm';
import ServicesForm from './servicesForm/ServicesForm';

interface CompanyProfileProps {
    companyType: 'client' | 'agency';
}

export default function CompanyProfile({ companyType }: CompanyProfileProps) {
    const { isMobile } = useMediaContext();
    const { checkIsHaveRestriction } = useGetRestrictions();
    const { isLoading, getFetchData, companyInfo, billingData } =
        useCompProfileAsyncMethods({
            companyType,
        });

    useEffect(() => {
        getFetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <LipsLoader />;
    const isAgencyProfile = companyType === 'agency';

    return (
        <StyledCompanyProfile className="company-info">
            <Accordion
                title={isMobile ? 'Company Info' : 'Company Information'}
                isShowImage
                defaultIsOpen
                isAccent
            >
                <CompanyInfoForm
                    companyType={companyType}
                    companyInfoData={companyInfo}
                    isActiveForm={checkIsHaveRestriction({
                        restriction: Restrictions.editCompanyInfo,
                    })}
                />
            </Accordion>
            {isAgencyProfile && (
                <Fragment>
                    <Accordion title="Services" isAccent hideBorder>
                        <ServicesForm companyInfoData={companyInfo} />
                    </Accordion>
                    <Accordion title="Industries + Tags" isAccent>
                        <IndustriesTagsForm
                            companyType={companyType}
                            companyInfoData={companyInfo}
                        />
                    </Accordion>
                    <Accordion title="Links + Docs" isAccent>
                        <LinksDocsForm
                            companyType={companyType}
                            companyInfoData={companyInfo}
                        />
                    </Accordion>
                </Fragment>
            )}
            <Accordion title="Legal billing address" isAccent>
                <BillingAddressForm
                    billingAddressData={billingData}
                    isActiveForm={checkIsHaveRestriction({
                        restriction: Restrictions.billingAccess,
                    })}
                />
            </Accordion>
        </StyledCompanyProfile>
    );
}
