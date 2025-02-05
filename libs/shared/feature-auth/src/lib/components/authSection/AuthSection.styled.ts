import styled from '@emotion/styled';
import { fonts } from '@breef/shared/assets';
import { colors } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';
import { motion } from 'framer-motion';
import { AnimationOpacity } from '@breef/shared/ui-components';
import { css } from '@emotion/react';

interface StyledAuthSectionProps {
    formMaxWidth: number;
    isTermsNode?: boolean;
}
export const StyledAuthSection = styled(
    AnimationOpacity,
)<StyledAuthSectionProps>`
    display: flex;
    flex-direction: column;

    > h1 {
        margin: 0;
        font-size: 56px;
        font-weight: 450;
        line-height: 56px;
        text-align: center;
    }

    p.note {
        margin: 0;
        padding-top: 10px;
        font-size: 22px;
        font-weight: 450;
        line-height: 25.17px;
        letter-spacing: 0;
        text-align: center;
        color: #68737d;
    }

    .form-block {
        display: flex;
        flex-direction: column;
        width: ${({ formMaxWidth }) => formMaxWidth}px;
        max-width: calc(100vw - 32px);
        margin-top: 48px;
        background-color: ${colors.white};
        padding: 48px;
        ${({ isTermsNode }) =>
            isTermsNode &&
            css`
                padding-bottom: 24px;
            `};

        .fields-wrapper {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .auth-section-button {
            font-family: ${fonts.accent};
            width: 100%;
            height: 48px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 1px;
            text-align: center;
            margin-top: 24px;
        }
    }

    .under-form-section {
        margin-top: 16px;
    }

    @media screen and (${mediaScreen.tablet}) {
        > h1 {
            font-size: 26px;
            font-weight: 450;
            line-height: 29.74px;
            letter-spacing: 0;
        }

        p.note {
            margin: 0;
            padding-top: 8px;
            font-size: 18px;
            font-weight: 450;
            line-height: 20.59px;
            letter-spacing: 0;
        }

        .form-block {
            padding: 16px;
            margin-top: 24px;
        }
    }
`;
