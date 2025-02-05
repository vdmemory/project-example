import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledSocialLink = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    + .social-link {
        margin-top: 12px;
    }

    .social-link-info {
        display: flex;
        align-items: center;
        max-width: 152px;
        height: 29px;
        > span {
            padding: 0 20px 0 8px;
            font-size: 18px;
            font-weight: 450;
            line-height: 29px;
            letter-spacing: 0.002em;
            text-align: left;
        }
        > svg {
            width: 24px;
            min-width: 24px;
            height: auto;
        }
        > button {
            margin-left: auto;
        }
    }

    .link-row {
        display: flex;
        .input-wrapper {
            align-items: flex-end;
            gap: 12px;
        }
    }

    .social-input {
        height: 31px;
        padding: 0 20px;
        max-width: 280px;
    }
`;
