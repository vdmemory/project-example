import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledPopupList = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px 0 25px;
    gap: 23px;

    .list {
        display: flex;
        flex-direction: row;

        gap: 16px;
        flex-wrap: wrap;

        @media screen and (max-width: 1024px) {
            justify-content: center;
        }

        .item {
            width: 100%;
            border-radius: 4px;
            border: 1px solid ${colors.grey.grey100};
            background-color: rgb(211 211 211 / 20%);
            padding: 16px 20px 16px;
            min-height: 76px;

            @media screen and (max-width: 512px) {
                max-width: 100%;
                min-height: 89px;
            }

            .title {
                ${mixinTypography.text.tLg.textLgMedium};
                line-height: 24px;
                text-transform: none;
                font-weight: 600;
                margin: 0 0 6px;
            }

            .description {
                ${mixinTypography.text.tLg.textLgMedium};
                font-size: 12px;
                line-height: 12px;
                text-transform: none;
                color: ${colors.grey.grey700};
                letter-spacing: unset;
            }
        }
    }
`;
