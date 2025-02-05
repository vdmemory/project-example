import { MethodsPitchCreateType } from '../types/pitchCreateType';
import {
    PITCH_EDIT_ROUTE,
    PitchCreationStepsEnum,
    PitchStep,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';
import {
    useCreatePitchMutation,
    useUpdatePitchMutation,
} from '@breef/shared/data-access-pitch-create';
import { usePitchCreateActions, usePitchCreateSelector } from '../store/hooks';
import { useRouteControl } from '@breef/shared/hooks';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getStepKeyByValue } from '../utils/getStep';
import { useValidationSaveExit } from './useValidationSaveExit';
import { PitchCreateType } from '@breef/shared/types';
import { defaultErrorHandler } from '@breef/shared/utils';

interface UsePitchSubmitProps {
    methods: MethodsPitchCreateType;
    step: PitchStep;
    isCreate: boolean;
    projectId: number;
    pitchId: number;
    handleNext: () => void;
    successCallback: () => void;
}

const pitchAccessDeniedMessage =
    'You do not have access to this pitch, or this pitch does not exist anymore.';

export const usePitchSubmit = ({
    methods,
    step,
    isCreate,
    projectId,
    pitchId,
    handleNext,
    successCallback,
}: UsePitchSubmitProps) => {
    const { changePage } = useRouteControl();
    const [createPitch] = useCreatePitchMutation();
    const [updatePitch] = useUpdatePitchMutation();
    const { setIsSubmitting } = usePitchCreateActions();
    const { isPenMode } = usePitchCreateSelector(state => state).pitchCreate;
    const { triggerValidationSaveExit } = useValidationSaveExit(methods);

    const handleSubmit = async (
        isNextAction?: boolean,
        isPostAction?: boolean,
    ) => {
        const data: PitchCreateType = {
            ...getDataByStep(isNextAction),
            step: getSubmitStep(isNextAction, isPostAction),
        };
        setIsSubmitting({
            isSubmitting: true,
            isNextAction: isNextAction || isPostAction,
        });

        try {
            if (isCreate) {
                const result = await createPitch({
                    projectId,
                    body: data,
                }).unwrap();
                const redirectPath = isNextAction
                    ? PITCH_EDIT_ROUTE.reverse({
                          projectId,
                          pitchId: result.id,
                      }) || ''
                    : PROJECTS_ROUTE;
                await changePage(redirectPath);
            } else {
                await updatePitch({ projectId, pitchId, body: data }).unwrap();
                if (isPostAction) {
                    successCallback();
                } else if (isNextAction) {
                    handleNext();
                } else {
                    await changePage(PROJECTS_ROUTE);
                }
            }
        } catch (error) {
            const typedError = error as FetchBaseQueryError;
            defaultErrorHandler(typedError);
        } finally {
            setIsSubmitting({
                isSubmitting: false,
                isNextAction: isNextAction || isPostAction,
            });
        }
    };

    const getAllData = () => ({
        ...methods.ourAgency.getValues(),
        ...methods.yourPitch.getValues(),
        ...methods.portfolio.getValues(),
        ...methods.projectFit.getValues(),
    });

    const getDataByStep = (isNextAction?: boolean) => {
        const fullFormData = getAllData();
        if (isPenMode && isNextAction) {
            return fullFormData;
        }
        switch (step) {
            case PitchStep.OUR_AGENCY:
                return {
                    ...methods.ourAgency.getValues(),
                };
            case PitchStep.YOUR_PITCH:
                return {
                    ...methods.ourAgency.getValues(),
                    ...methods.yourPitch.getValues(),
                };
            case PitchStep.PORTFOLIO:
                return {
                    ...methods.ourAgency.getValues(),
                    ...methods.yourPitch.getValues(),
                    ...methods.portfolio.getValues(),
                };
            default:
                return fullFormData;
        }
    };

    const getSubmitStep = (isNextAction?: boolean, isPostAction?: boolean) => {
        if (isPostAction) {
            return PitchCreationStepsEnum.Post;
        }
        if (isPenMode && isNextAction) {
            return PitchCreationStepsEnum.Review;
        }
        return getStepKeyByValue(isNextAction ? step + 1 : step);
    };

    const handleSaveExit = async () => {
        const errors = await triggerValidationSaveExit(step);
        if (errors) {
            const toastMessage = 'Please adjust all necessary fields.';
            toast.error(toastMessage, { toastId: toastMessage });
            return;
        }
        return handleSubmit();
    };
    const handleSubmitNext = () => handleSubmit(true);

    return {
        handleSubmit,
        handleSaveExit,
        handleSubmitNext,
        getAllData,
    };
};
