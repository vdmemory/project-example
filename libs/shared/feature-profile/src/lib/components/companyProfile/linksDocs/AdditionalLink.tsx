import { ControlTypeInnerForm, LinksType } from '@breef/shared/types';
import { EditableLink, EditableLinkOld } from '@breef/shared/ui-components';
import styled from '@emotion/styled';
import { useState } from 'react';
import {
    FieldArrayWithId,
    UseFieldArrayRemove,
    UseFieldArrayUpdate,
} from 'react-hook-form';

const StyledAdditionalLinks = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
`;

export const AdditionalLinks = ({
    field,
    update,
    remove,
    index,
    length,
}: {
    field: FieldArrayWithId<ControlTypeInnerForm, 'links', 'id'>;
    update: UseFieldArrayUpdate<ControlTypeInnerForm, 'links'>;
    remove: UseFieldArrayRemove;
    index: number;
    length: number;
}) => {
    const [isEditable, setIsEditable] = useState(
        !!field && (!field.link || !field.title),
    );

    const updateField = (value: LinksType | null) => {
        if (!value) return;
        update(index, { id: value.id, title: value.title, link: value.link });
    };

    const preValue = {
        id: field.id,
        title: field.title,
        link: field.link,
    } as LinksType;

    const isOnlyOne = length === 1;

    return (
        <StyledAdditionalLinks>
            <EditableLinkOld
                key={field.id}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
                onSave={() => updateField(preValue)}
                onRemove={() => remove(index)}
                preValue={preValue}
                isLastItem={isOnlyOne}
            />
        </StyledAdditionalLinks>
    );
};
