import React, { FC } from 'react';
import { StyledAdditionalLink } from './AdditionalLink.styled';
import { Input } from '@breef/ui-kit';
import { TrashIconButton } from '@breef/shared/ui-components';
import { useController, useFormContext } from 'react-hook-form';

interface AdditionalLinkProps {
    path: string;
    className: string;
    onRemove: () => void;
    isLastLink: boolean;
}
export const AdditionalLink: FC<AdditionalLinkProps> = ({
    path,
    className,
    onRemove,
    isLastLink,
}) => {
    const { control } = useFormContext();
    const { field: fieldTitle, fieldState: fieldTitleState } = useController({
        control,
        name: `${path}.title`,
    });
    const { field: fieldLink, fieldState: fieldLinkState } = useController({
        control,
        name: `${path}.link`,
    });

    const handleRemove = () => {
        onRemove();
        onBlur();
    };

    const onBlur = () => {
        fieldTitle.onBlur();
        fieldLink.onBlur();
    };

    return (
        <StyledAdditionalLink
            className={className}
            data-testid="additional-link"
        >
            <div className="additional-link-fields-wrapper">
                <Input
                    {...fieldTitle}
                    error={fieldTitleState.error?.message}
                    placeholder="Link Name"
                    className="input-link-name"
                    maxLength={30}
                    onBlur={onBlur}
                />
                <Input
                    {...fieldLink}
                    error={fieldLinkState.error?.message}
                    placeholder="https://breef.com"
                    className="input-link"
                    maxLength={950}
                    onBlur={onBlur}
                />
            </div>
            <TrashIconButton
                onClick={handleRemove}
                className="remove-button"
                disabled={!fieldTitle.value && !fieldLink.value && isLastLink}
            />
        </StyledAdditionalLink>
    );
};

export default AdditionalLink;
