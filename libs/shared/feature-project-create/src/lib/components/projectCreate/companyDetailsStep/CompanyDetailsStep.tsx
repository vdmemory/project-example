import { FC, useEffect } from 'react';
import { StyledCompanyDetailsStep } from './CompanyDetailsStep.styled';
import {
    Autocomplete,
    HyperlinkIcon,
    Input,
    Label,
    Switch,
    Textarea,
} from '@breef/ui-kit';
import SocialLink from './socialLink/SocialLink';
import { PenNavNames, SocialNameEnum } from '@breef/shared/constants';
import {
    Controller,
    useController,
    useFieldArray,
    useFormContext,
} from 'react-hook-form';
import { CompanyDetailsFormType } from '../../../types/projectCreateTypes';

export const CompanyDetailsStep: FC = () => {
    const { control, trigger } = useFormContext<CompanyDetailsFormType>();
    const { field: companyNameField, fieldState: companyNameFieldState } =
        useController({ control, name: 'companyName' });
    const {
        field: companyDescriptionField,
        fieldState: companyDescriptionFieldState,
    } = useController({ control, name: 'companyDescription' });

    useEffect(() => {
        if (companyDescriptionField.value) return;
        trigger('companyDescription');
    }, []);

    const { field: fieldCompanyWebsite, fieldState: fieldCompanyWebsiteState } =
        useController({ control, name: 'companyWebsite' });

    const { field: fieldConfidential } = useController({
        control,
        name: 'isConfidential',
    });

    const { fields: fieldsSocialLinks } = useFieldArray({
        control,
        name: 'socialLinks',
    });
    const {
        field: fieldCompanyLocation,
        fieldState: fieldCompanyLocationState,
    } = useController({ control, name: 'companyLocation' });

    const getSocialFieldIndex = (socialName: SocialNameEnum) =>
        fieldsSocialLinks.findIndex(item => item.title === socialName);

    const onClickLocation = (id: number, name: string) => {
        fieldCompanyLocation.onChange(name);
    };

    const renderSocialLink = (socialName: SocialNameEnum) => (
        <Controller
            control={control}
            name={`socialLinks.${getSocialFieldIndex(socialName)}.link`}
            render={({ field, fieldState }) => (
                <SocialLink
                    {...field}
                    key={socialName}
                    socialName={socialName}
                    error={fieldState.error?.message}
                />
            )}
        />
    );

    return (
        <StyledCompanyDetailsStep>
            <Label
                id="company-name-field"
                forId="company-name-field-input"
                text="Company Name"
            >
                <Input
                    {...companyNameField}
                    error={companyNameFieldState.error?.message}
                    placeholder="Acme"
                    maxLength={255}
                />
            </Label>
            <Label text="Website" forId="website-field-input">
                <Input
                    {...fieldCompanyWebsite}
                    error={fieldCompanyWebsiteState.error?.message}
                    placeholder="breef.com"
                    maxLength={950}
                    placeholderIcon={<HyperlinkIcon />}
                />
            </Label>
            <Label text="Your Location" forId="location-field-input">
                <Autocomplete
                    {...fieldCompanyLocation}
                    onClick={onClickLocation}
                    placeholder="City, State"
                    error={fieldCompanyLocationState.error?.message}
                    maxLength={255}
                />
            </Label>
            <Label
                id={PenNavNames.COMPANY_DESCRIPTION_FIELD}
                forId="company-description-field-textarea"
                text="About My Company"
                subtext="Share more about your company’s background, mission and goals."
            >
                <Textarea
                    {...companyDescriptionField}
                    error={companyDescriptionFieldState.error?.message}
                    maxLength={2000}
                    placeholder=""
                />
            </Label>
            <Label text="Hide Company Details?" forId="confidential">
                <Switch
                    label={
                        fieldConfidential.value
                            ? `Don’t reveal company details to \npotential agencies`
                            : `Allow potential agencies to view \ncompany details (recommended)`
                    }
                    isOn={fieldConfidential.value}
                    onToggle={() =>
                        fieldConfidential.onChange(!fieldConfidential.value)
                    }
                />
            </Label>
            <Label text="Social Links" forId="social-links">
                {renderSocialLink(SocialNameEnum.Instagram)}
                {renderSocialLink(SocialNameEnum.Tiktok)}
                {renderSocialLink(SocialNameEnum.Twitter)}
            </Label>
        </StyledCompanyDetailsStep>
    );
};

export default CompanyDetailsStep;
