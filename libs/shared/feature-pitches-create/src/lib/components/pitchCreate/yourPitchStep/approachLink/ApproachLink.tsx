import { FC, useEffect, useState } from 'react';
import { EditableLink } from '@breef/shared/ui-components';
import { useController, useFormContext } from 'react-hook-form';
import { PitchCreateYourPitchFormType } from '../../../../types/pitchCreateType';
import styled from '@emotion/styled';

interface ApproachLinkProps {
    index: number;
    onRemove: () => void;
}
export const ApproachLink: FC<ApproachLinkProps> = ({ index, onRemove }) => {
    const { control } = useFormContext<PitchCreateYourPitchFormType>();
    const linkField = useController({
        control,
        name: `approach.links.${index}`,
    });
    const [isEditableLink, setIsEditable] = useState(
        !!linkField.field.value &&
            (!linkField.field.value.link || !linkField.field.value.title),
    );

    return (
        <StyledEditableLink
            isEditable={isEditableLink}
            setIsEditable={setIsEditable}
            onSave={linkField.field.onChange}
            onRemove={onRemove}
            preValue={linkField.field.value}
            isLastItem={false}
        />
    );
};

const StyledEditableLink = styled(EditableLink)`
    :first-of-type {
        margin-top: 20px;
    }
`;

export default ApproachLink;
