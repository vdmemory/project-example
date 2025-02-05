import styled from '@emotion/styled';
import { colors } from '../../styles/colors';
import { mixinTypography } from '../../styles/mixins/typography.styled';

export const StyledSwitch = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;

    .wrapper {
        .input {
            display: none;

            :checked + .toggle {
                background: ${colors.primary.primary500};
            }

            :checked + .toggle:before {
                background: ${colors.white};
                left: 14px;
            }
        }
        .toggle {
            position: relative;
            cursor: pointer;
            display: block;
            width: 36px;
            height: 22px;
            background: ${colors.white};
            border: 1px solid ${colors.grey.grey900};
            border-radius: 50px;
            transition: 200ms linear;

            :before {
                position: absolute;
                top: 50%;
                left: 2px;
                transform: translateY(-50%);
                content: '';
                display: block;
                width: 16px;
                height: 16px;
                background: ${colors.grey.grey900};
                border: 1px solid ${colors.grey.grey900};
                border-radius: 50%;
                transition: left 200ms linear;
            }
        }
    }

    .label {
        ${mixinTypography.text.tMd.textMdRegular};
    }
`;
