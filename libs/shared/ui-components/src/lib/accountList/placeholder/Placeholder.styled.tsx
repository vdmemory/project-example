import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { colors, mixinTypography } from '@breef/ui-kit';

import styled from '@emotion/styled';

interface StyledPlaceholderProps {
    isError: boolean;
}
export const StyledPlaceholder = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    gap: 16px;

    button {
        @media (${mediaScreen.tablet}) {
            text-transform: capitalize;
            font-size: 18px;
        }
    }
    ${simpleAnimation}

    .notification {
        width: 100%;
        height: 40px;
    }

    .placeholder {
        display: flex;
        align-items: center;
        height: 64px;
        width: 100%;
        font-size: 18px;
        white-space: pre-wrap;
        text-align: center;
        padding: 0 16px;
        gap: 16px;

        ${mixinTypography.label.lS.labelSMedium}
        background-color: ${colors.grey.grey50};
        border: 1px dashed
            ${({ isError }: StyledPlaceholderProps) =>
                isError ? colors.error.error500 : colors.black};

        @media (${mediaScreen.tablet}) {
            padding: 0 15px;
            text-align: center;
        }
        @media (${mediaScreen.maxMobile}) {
            margin-bottom: 16px;
        }
    }
`;
