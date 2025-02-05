import React, { FC, useEffect, useState } from 'react';
import { Popup } from '@breef/shared/ui-components';
import {
    PreferencesFormType,
    ProjectCreationFormType,
} from '../../../../types/projectCreateTypes';
import { getPopupStylePreset, StyledHelpUsPopup } from './HelpUsPopup.styled';
import { useMediaContext } from '@breef/shared/hooks';
import { ArrowSmallIcon, Button, CloseIcon } from '@breef/ui-kit';
import { AgencyPreferencesStepFields } from '../../agencyPreferencesStep/agencyPreferencesStepFields/AgencyPreferencesStepFields';
import { useForm } from 'react-hook-form';
import { agencyPreferencesSchema } from '../../../../utils/validation/projectCreateSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProjectCreationStepsEnum } from '@breef/shared/constants';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SeverErrorData } from '../../../../hooks/useServerErrorHandler';
import {
    useCreateProjectMutation,
    useUpdateProjectMutation,
} from '@breef/shared/data-access-project-create';

interface HelpUsPopupProps {
    onClose?: () => void;
    onBack: () => void;
    projectData: ProjectCreationFormType & {
        agenciesAdvantages?: { id: number; name: string }[];
    };
    projectId?: number;
    handleServerErrors: (error: SeverErrorData) => void;
    onSuccessCallbackFn: (values: PreferencesFormType) => void;
}

export const HelpUsPopup: FC<HelpUsPopupProps> = ({
    onBack,
    onClose,
    projectData,
    projectId,
    handleServerErrors,
    onSuccessCallbackFn,
}) => {
    const { isMobile } = useMediaContext();
    const {
        openToRemoteAgencies,
        agencyTags,
        idealAgencyDescription,
        agencyLocation,
    } = projectData;
    const {
        getValues,
        control,
        clearErrors,
        reset,
        setError,
        formState,
        handleSubmit,
    } = useForm<PreferencesFormType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            openToRemoteAgencies,
            agencyTags,
            idealAgencyDescription,
            agencyLocation,
        },
        resolver: yupResolver(agencyPreferencesSchema),
    });
    const [createProject] = useCreateProjectMutation();
    const [updateProject] = useUpdateProjectMutation();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const values = getValues();
            const data = {
                ...projectData,
                ...values,
                step: ProjectCreationStepsEnum.Review,
            };
            if (!projectId) {
                await createProject(data);
            } else {
                await updateProject({
                    id: projectId,
                    data,
                }).unwrap();
            }
            onSuccessCallbackFn(values);
        } catch (e) {
            handleServerErrors(
                (e as FetchBaseQueryError).data as SeverErrorData,
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => reset();
    }, []);

    const title = !isMobile
        ? 'Help us prepare for your call'
        : 'Prepare for your call';
    const subtitle = !isMobile
        ? 'What are you looking for in an agency? We guarantee you’ll find the perfect team.'
        : 'Tell us what you’re looking for in an agency. We guarantee you’ll find the perfect team on Breef.';

    return (
        <Popup
            key="popup-book-a-call-modified"
            style={getPopupStylePreset(isMobile)}
            isClosable={false}
        >
            <StyledHelpUsPopup onSubmit={handleSubmit(onSubmit)}>
                <div className="form-header">
                    <div className="group">
                        <h3 className="title">{title}</h3>
                        <p className="subtitle">{subtitle}</p>
                        <div className="divider"></div>
                    </div>
                    {!!onClose && (
                        <div className="close-wrapper">
                            <CloseIcon
                                className="close-button"
                                role="button"
                                onClick={onClose}
                            />
                        </div>
                    )}
                </div>
                <div className="form-body">
                    <AgencyPreferencesStepFields
                        control={control}
                        isAgencyPreferencesEndField
                        isDisplayOptional
                        clearErrors={clearErrors}
                    />
                </div>
                <div className="form-footer">
                    {!!onBack && (
                        <button
                            className="button-back"
                            onClick={onBack}
                            disabled={isLoading}
                            type="button"
                        >
                            <ArrowSmallIcon />
                        </button>
                    )}
                    <Button
                        label="Next"
                        size="medium"
                        type="submit"
                        isSubmitted={isLoading}
                        className="button-save"
                        iconPlacement="right"
                    />
                </div>
            </StyledHelpUsPopup>
        </Popup>
    );
};
