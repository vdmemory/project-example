import { mediaScreen } from '@breef/shared/assets/variables';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledLeftSectionHeader = styled.div`
    margin-bottom: 40px;
    width: 100%;
    h3 {
        ${mixinTypography.display.dSm.displaySmMedium};
        margin: 0 0 12px;

        @media (${mediaScreen.maxMobile}) {
            ${mixinTypography.mobile.text.mobileTextLg};
            margin: 0 0 4px;
        }
    }
    .invoice {
        &-code {
            display: flex;
            align-items: center;
            ${mixinTypography.text.tLg.textLgMedium};
            .tag-status {
                margin-left: 8px;

                @media (${mediaScreen.maxMobile}) {
                    ${mixinTypography.mobile.label.mobileLabelXs};
                }
            }
            margin-bottom: 12px;

            @media (${mediaScreen.maxMobile}) {
                ${mixinTypography.mobile.text.mobileTextSm};
            }
        }
        &-date {
            ${mixinTypography.label.lS.labelSMedium};
            margin: 0;
            span {
                font-weight: 600;
            }

            @media (${mediaScreen.maxMobile}) {
                display: none;
            }
        }
    }
`;
