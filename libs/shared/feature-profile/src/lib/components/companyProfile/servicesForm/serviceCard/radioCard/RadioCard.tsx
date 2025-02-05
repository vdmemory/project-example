import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { CheckIcon24x24, CheckMark } from '@breef/shared/assets';
import { FC } from 'react';
import { css } from '@emotion/react';

interface RadioCardProps {
    checked: boolean;
    onChange: () => void;
    title: string;
    description: string;
    name: string;
}

export const RadioCard: FC<RadioCardProps> = ({
    checked,
    onChange,
    title,
    description,
    name,
}) => {
    return (
        <StyledRadioCard isChecked={checked}>
            <input
                type="radio"
                name={name}
                onClick={onChange}
                checked={checked}
            />
            <div className="title-wrapper">
                <CheckIcon24x24 />
                <h4 className="title">{title}</h4>
            </div>
            <span className="description">{description}</span>
        </StyledRadioCard>
    );
};

interface StyledRadioCardProps {
    isChecked: boolean;
}
const StyledRadioCard = styled.label`
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    margin: 0 !important;
    background-color: ${colors.white};
    border: 1px solid ${colors.grey.grey900};
    border-radius: 4px;
    max-width: 242px;
    flex: 1;
    cursor: pointer;

    input {
        display: none;
    }

    .title-wrapper {
        display: flex;
        gap: 8px;
        align-items: center;
        height: 25px;

        svg {
            display: none;
        }

        h4 {
            ${mixinTypography.label.lLg.labelLgMedium};
            color: ${colors.grey.grey900};
            margin: 0;
        }
    }

    .description {
        ${mixinTypography.text.tSmall.textSmallMedium};
        margin-top: 16px;
        text-transform: none;
        color: ${colors.grey.grey900};
    }

    ${({ isChecked }: StyledRadioCardProps) =>
        isChecked &&
        css`
            background-color: ${colors.secondary.secondary400};
            .title-wrapper svg {
                display: flex;
            }
        `};
`;
