import React, { ChangeEvent, FC } from 'react';
import { StyledServicesForm } from './ServicesForm.styled';
import { InnerField, SaveButton } from '@breef/shared/ui-components';
import ServiceCard from './serviceCard/ServiceCard';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import {
    CompanyInfoMergedResponseType,
    ControlTypeInnerForm,
    HookFormEventType,
    ServiceType,
} from '@breef/shared/types';
import { toast } from 'react-toastify';
import { useChangeCapabilitiesMutation } from '@breef/shared/data-access-profile';
import _ from 'lodash';

export type ServicesFormType = {
    services: ServiceType[];
};
interface ServicesFormProps {
    companyInfoData?: CompanyInfoMergedResponseType;
    isActiveForm?: boolean;
}
export const ServicesForm: FC<ServicesFormProps> = ({
    companyInfoData,
    isActiveForm = true,
}) => {
    const defaultValues = {
        services: companyInfoData?.services ?? [],
    };
    const methods = useForm<ServicesFormType>({
        defaultValues,
    });
    const servicesFieldArray = useFieldArray({
        control: methods.control,
        name: 'services',
    });
    const { data: capabilities } = useGetCapabilitiesQuery({});
    const [updateCapabilities, { isLoading, isSuccess, error }] =
        useChangeCapabilitiesMutation();

    const currentFormData = methods.watch();
    const checkIsEqualForm = (formData: ServicesFormType) => {
        return _.isEqual(formData, defaultValues);
    };

    const handleSelectService = (e: HookFormEventType) => {
        const service = capabilities?.find(
            item => item.id === Number(e.target.value),
        );
        const isNotExistServiceInForm =
            !!service &&
            !servicesFieldArray.fields.some(
                field => field.serviceId === service.id,
            );
        if (isNotExistServiceInForm) {
            servicesFieldArray.append({
                ...service,
                serviceId: service.id,
                pricing: null,
                portfolio: [],
            });
        } else {
            toast.error('This service has already been added!');
        }
    };

    const handleSubmitServices = async () => {
        try {
            await updateCapabilities(methods.getValues()).unwrap();
        } catch (e) {
            const message = 'Something went wrong when saving services.';
            toast.error(message, { toastId: message });
        }
    };

    return (
        <StyledServicesForm>
            <div className="services-dropdown-wrapper">
                <InnerField
                    label="services"
                    onChange={handleSelectService}
                    value=""
                    type="dropdown"
                    listType="capabilities"
                    placeholder="Select your top services"
                    isDisabled={servicesFieldArray.fields.length >= 6}
                />
            </div>
            <FormProvider {...methods}>
                {servicesFieldArray.fields.map((item, index) => (
                    <ServiceCard
                        key={item.id}
                        name={item.name}
                        onRemove={() => servicesFieldArray.remove(index)}
                        index={index}
                    >
                        {index === servicesFieldArray.fields.length - 1 && (
                            <SaveButton
                                type="submit"
                                isSubmitting={isLoading}
                                isSuccess={isSuccess}
                                disabled={
                                    isLoading ||
                                    !isActiveForm ||
                                    checkIsEqualForm(currentFormData)
                                }
                                className="save-button"
                                onClick={handleSubmitServices}
                            />
                        )}
                    </ServiceCard>
                ))}
            </FormProvider>
        </StyledServicesForm>
    );
};

export default ServicesForm;
