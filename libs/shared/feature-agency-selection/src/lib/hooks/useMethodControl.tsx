import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { useSendSelectedAgencyMutation } from '@breef/shared/data-access-project';
import {
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type ErrorUpdate = {
    data: {
        pitch: string[];
    };
};

export const useMethodControl = ({
    stepper,
    setStepper,
}: {
    stepper: { mainStep: number; subStep: number };
    setStepper: (step: { mainStep: number; subStep: number }) => void;
}) => {
    const router = useRouter();
    const {
        query: { projectId },
    } = router;

    const [selectedItem, setSelectedItem] = useState<number[] | null>(null);
    const [fetchSendSelectedAgency, { isLoading }] =
        useSendSelectedAgencyMutation();

    const handleIncrement = () => {
        if (
            stepper.mainStep === 2 &&
            stepper.subStep === 2 &&
            selectedItem?.length
        ) {
            return fetchSendSelectedAgency({
                pitchId: selectedItem[0],
                projectId: projectId as string,
            }).then(res => {
                if ((res as { error?: object }).error) {
                    toast.error(
                        (res as { error?: ErrorUpdate }).error?.data
                            ? (res as { error?: ErrorUpdate }).error?.data
                                  .pitch[0]
                            : (validationErrorMessages[
                                  ValidationErrorType.default
                              ] as ValidationErrorMessageMethodValueType),
                    );
                } else {
                    router.push(PROJECTS_ROUTE);
                }
            });
        }

        return setStepper({
            mainStep: stepper.mainStep + 1,
            subStep: stepper.subStep + 1,
        });
    };

    const handleSelectAgency = (id: number) => {
        if (selectedItem === null) {
            setSelectedItem([id]);
        } else if (
            selectedItem !== null &&
            selectedItem.findIndex(item => item === id) !== -1
        ) {
            const selectedItems = selectedItem.filter(item => item !== id);
            setSelectedItem(selectedItems);
        } else {
            setSelectedItem([id]);
        }
    };

    return {
        handleIncrement,
        handleSelectAgency,
        selectedItem,
        isLoading,
    };
};
