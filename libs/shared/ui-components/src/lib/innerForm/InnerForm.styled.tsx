import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

interface StyledRowFieldsProps {
    fieldsCount: number;
}

interface StyledInnerFormProps {
    isActive: boolean;
}

export const StyledInnerForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    background-color: ${colors.mainBlack};
    border-bottom: 1px solid ${colors.mainBlack};
    flex: 1;
    pointer-events: ${({ isActive }: StyledInnerFormProps) =>
        isActive ? 'inherit' : 'none'};
`;

export const StyledRowFields = styled.div`
    display: flex;
    gap: 1px;
    background-color: ${colors.mainBlack};
    @media (${mediaScreen.tablet}) {
        flex-direction: column;
    }
    label {
        min-width: calc(
            100% / ${({ fieldsCount }: StyledRowFieldsProps) => fieldsCount} -
                ${({ fieldsCount }: StyledRowFieldsProps) => fieldsCount - 1}px
        );

        input:disabled {
            color: inherit;
        }
    }
`;
