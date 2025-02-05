import { EditableLink } from '@breef/shared/ui-components';
import styled from '@emotion/styled';
import { useState } from 'react';
import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFieldArrayUpdate,
} from 'react-hook-form';
import { PitchCreatePortfolioFormType } from '../../../../types/pitchCreateType';

const StyledAdditionalLinks = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;

    .editable-link .input > span {
        padding-top: 5px;
    }
`;

export const AdditionalLinks = ({
    field,
    update,
    remove,
    index,
    length,
}: {
    field: FieldArrayWithId<
        PitchCreatePortfolioFormType,
        'additionalLinks',
        'id'
    >;
    update: UseFieldArrayUpdate<
        PitchCreatePortfolioFormType,
        'additionalLinks'
    >;
    remove: UseFieldArrayRemove;
    index: number;
    length: number;
}) => {
    const [isEditable, setIsEditable] = useState(
        !!field && (!field.link || !field.name),
    );

    const updateField = (value: { title: string; link: string } | null) => {
        if (!value) return;
        update(index, { name: value.title, link: value.link });
    };

    const preValue = {
        title: field.name,
        link: field.link,
    } as { title: string; link: string };

    const isOnlyOne = length === 1;

    return (
        <StyledAdditionalLinks>
            <EditableLink
                key={field.id}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
                onSave={updateField}
                onRemove={() => remove(index)}
                preValue={preValue}
                isLastItem={isOnlyOne}
                titlePlaceholder="Case Study"
            />
        </StyledAdditionalLinks>
    );
};
