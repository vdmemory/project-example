import { useEffect } from 'react';
import { StyledCompanyInfoForm } from './CompanyInfoForm.styled';
import {
    defaultPhoneNumberObj,
    InnerForm,
    LogoEditor,
    SaveButton,
} from '@breef/shared/ui-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { companyInfoAgencyFormConfig } from './companyInfoAgencyFormConfig';
import {
    useChangeCompanyInfoMutation,
    useChangeCompanyMutation,
} from '@breef/shared/data-access-profile';
import { companyInfoAgencySchema } from '../../../utils/validation-forms/companyInfoAgencySchema';
import {
    ControlTypeInnerForm,
    CompanyInfoMergedResponseType,
    CompanyInfoRequestType,
    CompanyRequestType,
} from '@breef/shared/types';
import { useSaveLogoImage } from '@breef/shared/hooks';
import { companyInfoClientFormConfig } from './companyInfoClientFormConfig';
import { companyInfoClientSchema } from '../../../utils/validation-forms/companyInfoClientSchema';
import _ from 'lodash';

const defaultValuesCompanyInfo = {
    companyName: '',
    website: '',
    officeLocations: [],
    numberEmployees: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    companyOverview: '',
    companySize: '',
    logo: null,
    logoUrl: '',
};

const defaultValuesCompanyInfoAgency = {
    companyName: '',
    website: '',
    contactEmail: '',
    contactPhoneNumber: { ...defaultPhoneNumberObj },
    officeLocations: [],
    teamSize: '',
    yearsInBusiness: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    meta: '',
    tagline: '',
    companyOverview: '',
    logo: null,
    logoUrl: '',
};

interface CompanyInfoFormProps {
    isLoading?: boolean;
    companyInfoData?: CompanyInfoMergedResponseType;
    companyType?: string;
    isActiveForm?: boolean;
}

export default function CompanyInfoForm({
    isLoading,
    companyInfoData,
    companyType,
    isActiveForm = true,
}: CompanyInfoFormProps) {
    const methodsCompanyInfo = useForm<ControlTypeInnerForm>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues:
            companyType === 'client'
                ? defaultValuesCompanyInfo
                : defaultValuesCompanyInfoAgency,
        resolver: yupResolver(
            companyType === 'client'
                ? companyInfoClientSchema
                : companyInfoAgencySchema,
        ),
    });

    const currentFormData = methodsCompanyInfo.getValues();

    useEffect(() => {
        checkIsEqualCompanyInfoForm(currentFormData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [methodsCompanyInfo.watch()]);

    const [changeCompanyInfo, changeCompanyInfoRequest] =
        useChangeCompanyInfoMutation();
    const [changeAgencyCompanyInfo, changeAgencyCompanyInfoRequest] =
        useChangeCompanyMutation();

    const { uploadCroppedImage, objectImage } = useSaveLogoImage();

    const checkIsEqualCompanyInfoForm = (formData: ControlTypeInnerForm) => {
        return _.isEqual(formData, companyInfoData);
    };

    const onSubmitCompanyInfo: SubmitHandler<
        ControlTypeInnerForm
    > = formData => {
        if (!checkIsEqualCompanyInfoForm(formData)) {
            if (companyType === 'client') {
                changeCompanyInfo(formData as CompanyInfoRequestType);
            } else {
                changeAgencyCompanyInfo(formData as CompanyRequestType);
            }
        }
    };

    useEffect(() => {
        if (companyInfoData) {
            methodsCompanyInfo.reset(companyInfoData);
        }
    }, [companyInfoData, methodsCompanyInfo]);

    useEffect(() => {
        if (objectImage) {
            methodsCompanyInfo.setValue('logo', objectImage[0]?.id);
            methodsCompanyInfo.setValue('logoUrl', objectImage[0]?.url);
        }
    }, [methodsCompanyInfo, objectImage]);

    const isSubmitting =
        changeCompanyInfoRequest.isLoading ||
        changeAgencyCompanyInfoRequest.isLoading;
    const isSuccess =
        changeCompanyInfoRequest.isSuccess ||
        changeAgencyCompanyInfoRequest.isSuccess;
    const isDisabled =
        isLoading ||
        changeCompanyInfoRequest.isLoading ||
        changeAgencyCompanyInfoRequest.isLoading ||
        Object.keys(methodsCompanyInfo.formState.errors).length !== 0 ||
        !isActiveForm ||
        checkIsEqualCompanyInfoForm(currentFormData);

    return (
        <StyledCompanyInfoForm
            onSubmit={methodsCompanyInfo.handleSubmit(onSubmitCompanyInfo)}
        >
            <div className="form-container">
                <div className="left-section">
                    <LogoEditor
                        logoUrl={methodsCompanyInfo.getValues('logoUrl')}
                        onChange={uploadCroppedImage}
                        isDisabled={!isActiveForm}
                        tip="Your Logo"
                    />
                </div>

                <InnerForm
                    config={
                        companyType === 'client'
                            ? companyInfoClientFormConfig
                            : companyInfoAgencyFormConfig
                    }
                    control={methodsCompanyInfo.control}
                    cleanErrors={methodsCompanyInfo.clearErrors}
                    isActiveForm={isActiveForm}
                />
            </div>
            <SaveButton
                type="submit"
                isSubmitting={isSubmitting}
                isSuccess={isSuccess}
                disabled={isDisabled}
            />
        </StyledCompanyInfoForm>
    );
}
