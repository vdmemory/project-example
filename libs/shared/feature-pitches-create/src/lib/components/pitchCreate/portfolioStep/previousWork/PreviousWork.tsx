import { useMediaContext } from '@breef/shared/hooks';
import { PreviousWorkType } from '@breef/shared/types';
import { Popup, WorkCard, usePopup } from '@breef/shared/ui-components';
import { colors, LinkUi } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { PitchCreatePortfolioFormType } from '../../../../types/pitchCreateType';
import { PreviousWorkForm } from './previousWorkForm/PreviousWorkForm';
import {
    getPopupStylePreset,
    tooltipPopupStyleCssPreset,
} from './previousWorkForm/PreviousWorkForm.styled';

export const StyledPreviousWork = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

interface PreviousWorkProps {
    className?: string;
}

export const PreviousWork = ({ className }: PreviousWorkProps) => {
    const formPopupControl = usePopup();
    const { isMobile } = useMediaContext();

    const [innerHeight, setInnerHeight] = useState('0px');
    const [currentId, setCurrentId] = useState<number | null>(null);

    const { control } = useFormContext<PitchCreatePortfolioFormType>();

    const {
        field: { value: previousWork, onChange: onChangePreviousWork },
    } = useController({
        control,
        name: 'previousWork',
    });

    const appendPrevious = (data: PreviousWorkType) => {
        onChangePreviousWork([...previousWork, data]);
    };

    const updatePrevious = (id: number, data: PreviousWorkType) => {
        const newPreviousWork = previousWork.map(prevWork =>
            prevWork.id === id ? data : prevWork,
        );
        onChangePreviousWork(newPreviousWork);
    };

    const removePrevious = (id: number) => {
        const newPreviousWork = previousWork.filter(
            prevWork => prevWork.id !== id,
        );
        onChangePreviousWork(newPreviousWork);
    };

    const handleOpenPopup = (id?: number) => {
        if (id) setCurrentId(id);
        if (!id) setCurrentId(null);
        setInnerHeight(window.innerHeight + 'px');
        formPopupControl.open();
    };

    const handleClickCard = (id: number, mode: 'remove' | 'edit') => {
        if (mode === 'remove') return removePrevious(id);
        handleOpenPopup(id);
    };

    const MAX_PREVIOUS_WORK = 5;
    const isExistPrevious = previousWork.length !== 0;
    const lengthPrevious = previousWork.length;

    const currentPrevWorkData = previousWork.find(
        prevWork => prevWork.id === currentId,
    );
    const formData = currentPrevWorkData ?? undefined;

    const handleUpdateForm = (values: PreviousWorkType) => {
        if (!currentId) appendPrevious(values);
        if (currentId) updatePrevious(currentId, values);

        formPopupControl.close();
    };

    const previousClassName = className
        ? `previous-work ${className}`
        : 'previous-work';

    return (
        <StyledPreviousWork className={previousClassName}>
            {formPopupControl.isOpen && (
                <Popup
                    isClosable={false}
                    style={getPopupStylePreset(isMobile, innerHeight)}
                    styleCss={tooltipPopupStyleCssPreset}
                >
                    <PreviousWorkForm
                        formData={formData}
                        onClick={handleUpdateForm}
                        onClose={() => formPopupControl.close()}
                    />
                </Popup>
            )}
            {isExistPrevious &&
                previousWork.map(field => (
                    <WorkCard
                        key={field.id}
                        workData={{
                            ...field,
                            titleFirst: field.clientName,
                            titleLast: field.projectName,
                        }}
                        onClick={mode => handleClickCard(field.id, mode)}
                    />
                ))}
            {lengthPrevious < MAX_PREVIOUS_WORK && (
                <LinkUi
                    title="+ Add Project"
                    variant="button"
                    onClick={() => handleOpenPopup()}
                />
            )}
        </StyledPreviousWork>
    );
};
