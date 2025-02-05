import { useEffect, useState } from 'react';
import { AgenciesSchedulesList } from '@breef/shared/types';
import { useRouter } from 'next/router';
import { useUpdateAgenciesSchedulesListMutation } from '@breef/shared/data-access-project';
import { toast } from 'react-toastify';

type ErrorUpdate = {
    data: {
        pitches: string[];
        detail: string;
    };
};

interface UseMakeIntroProps {
    agencies: AgenciesSchedulesList[];
    projectId: number | string;
    onSuccess: () => void;
}

export const useMakeIntro = ({
    agencies,
    projectId,
    onSuccess,
}: UseMakeIntroProps) => {
    const router = useRouter();
    const [isSubmittingNext, setIsSubmittingNext] = useState(false);
    const [isSubmittingSaveExit, setIsSubmittingSaveExit] = useState(false);
    const [updatePitches] = useUpdateAgenciesSchedulesListMutation();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const getIsShortlistedPitches = (pitches: AgenciesSchedulesList[]) => {
        const selectedPitchesIds: number[] = [];
        pitches.forEach((pitch, i) => {
            if (pitch.isShortlisted) selectedPitchesIds.push(pitch.id);
        });
        return selectedPitchesIds;
    };

    const getIsSchedulesPitches = (pitches: AgenciesSchedulesList[]) => {
        const selectedPitchesIds: number[] = [];
        pitches.forEach((pitch, i) => {
            if (pitch.schedule) selectedPitchesIds.push(pitch.id);
        });
        return selectedPitchesIds;
    };

    useEffect(() => {
        if (agencies.length && agencies.some(agency => agency.isShortlisted)) {
            const shortlistedPitchesIds = getIsShortlistedPitches(agencies);
            setSelectedIds(shortlistedPitchesIds);
        }

        if (agencies.length && agencies.some(agency => agency.schedule)) {
            const schedulesPitchesIds = getIsSchedulesPitches(agencies);
            setSelectedIds(schedulesPitchesIds);
        }
    }, [agencies, router.pathname]);

    const isCheckedAgency = (id: number) => selectedIds.includes(id);

    const handleSelectAgency = (id: number) => {
        if (isCheckedAgency(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const setIsSubmitting = (isSubmitting: boolean, isSaveExit?: boolean) => {
        if (isSaveExit) {
            setIsSubmittingSaveExit(isSubmitting);
        } else {
            setIsSubmittingNext(isSubmitting);
        }
    };

    const fetchData = async () => {
        try {
            await updatePitches({
                id: projectId,
                agencies: selectedIds,
            }).unwrap();
            return onSuccess();
        } catch (error) {
            const errorData = (error as ErrorUpdate).data;
            if (errorData.pitches) {
                return toast.error(errorData.pitches[0]);
            }
            if (errorData.detail) {
                return toast.error(errorData.detail);
            }
            return toast.error(
                'An error occurred while sending data to the server',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = (isSaveExit?: boolean) => {
        if (selectedIds?.length) {
            setIsSubmitting(true, isSaveExit);
            fetchData();
        }
    };
    return {
        selectedIds,
        isCheckedAgency,
        handleSelectAgency,
        handleNext,
        isSubmittingNext,
        isSubmittingSaveExit,
    };
};
