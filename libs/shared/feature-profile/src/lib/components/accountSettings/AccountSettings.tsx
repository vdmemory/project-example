import { useContext, useEffect, useState } from 'react';
import { StyledAccountSettings } from './AccountSettings.styled';
import {
    Accordion,
    ConfigInnerFormType,
    LipsLoader,
} from '@breef/shared/ui-components';
import AccountInfoForm from './accountInfoForm/AccountInfoForm';
import SetPasswordForm from './setPasswordForm/SetPasswordForm';
import ChangePasswordForm from './changePasswordForm/ChangePasswordForm';
import { changePasswordFormConfig } from './changePasswordForm/changePasswordFormConfig';
import { setPasswordFormConfig } from './setPasswordForm/setPasswordFormConfig';
import { useGetAccountInfoQuery } from '@breef/shared/data-access-profile';
import { toast } from 'react-toastify';
import { useGetRestrictions, useMediaContext } from '@breef/shared/hooks';

export interface AccountSettingsProps {
    companyType: 'client' | 'agency';
}

export default function AccountSettings({ companyType }: AccountSettingsProps) {
    const {
        data,
        isLoading: isLoadingAccountInfo,
        isError: isErrorAccountInfo,
        error: errorAccountInfo,
    } = useGetAccountInfoQuery({
        companyType,
    });

    useEffect(() => {
        if (isErrorAccountInfo) {
            toast.error('An error occurred while loading account info');
        }
    }, [isErrorAccountInfo, errorAccountInfo]);

    const [triggerClosePasswordAccordion, setTriggerClosePasswordAccordion] =
        useState(false);
    const closeAccordionFunc = () => {
        setTriggerClosePasswordAccordion(true);
    };

    const { isMobile } = useMediaContext();

    const modifyConfigWithNewPassword = (config: ConfigInnerFormType) => {
        const modifiedConfig: ConfigInnerFormType = [...config];
        const indexNewPasswordObj = modifiedConfig.findIndex(
            item => item.name === 'newPassword',
        );
        if (indexNewPasswordObj !== -1) {
            modifiedConfig[indexNewPasswordObj].placeholder =
                'Create new password.';
        }
        return modifiedConfig;
    };
    if (isLoadingAccountInfo) return <LipsLoader />;

    return (
        <StyledAccountSettings>
            <Accordion
                title={isMobile ? 'Account info' : 'Account information'}
                defaultIsOpen
                isAccent
            >
                <AccountInfoForm
                    accountInfoData={data}
                    companyType={companyType}
                />
            </Accordion>
            <Accordion
                title={data?.hasPassword ? 'Edit password' : 'Set password'}
                triggerCloseAccordion={triggerClosePasswordAccordion}
            >
                {data?.hasPassword ? (
                    <ChangePasswordForm
                        closeAccordionFunc={closeAccordionFunc}
                        config={changePasswordFormConfig}
                    />
                ) : (
                    <SetPasswordForm
                        closeAccordionFunc={closeAccordionFunc}
                        config={modifyConfigWithNewPassword(
                            setPasswordFormConfig,
                        )}
                    />
                )}
            </Accordion>
        </StyledAccountSettings>
    );
}
