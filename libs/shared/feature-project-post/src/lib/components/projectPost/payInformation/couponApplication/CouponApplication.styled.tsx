import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { fonts, mediaScreen } from '@breef/shared/assets/variables';

export const StyledCouponApplication = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    .coupon-view {
        display: flex;
        flex-direction: column;
        width: 100%;
        transition: height 0.3s ease-in-out;

        .applied-coupon {
            display: flex;
            justify-content: space-between;
        }

        .applied-coupon-row {
            display: flex;
            justify-content: space-between;
            ${mixinTypography.text.tMd.textMdMedium};
            align-items: center;
            gap: 5px;

            .coupon-name {
                font-size: 14px;
                line-height: 20px;
                color: #d96e34;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            & span {
                font-size: 14px;
                line-height: 16px;
                color: #68737d;
            }

            button {
                display: flex;
                outline: none;
                border: none;
                width: fit-content;
                height: fit-content;
                padding: 0;
                cursor: pointer;
                gap: 5px;
                background-color: #f9f7f3;
                padding: 4px 5px 4px 10px;
                font-weight: 600;

                svg {
                    width: auto;
                    min-width: 20px;
                    height: 20px;
                }

                svg path,
                line {
                    stroke: #d96e34;
                }
            }
        }

        .discount-field {
            position: relative;
            display: flex;
            padding-bottom: 0;
            height: 40px;
            gap: 20px;

            .coupon-field {
                flex: 1;
                ${mixinTypography.text.tMd.textMdMedium};
                font-size: 14px;
                line-height: 16px;
                padding: 12px;
                border: 1px solid #d8dcde;
                border-radius: 0;

                :focus-visible {
                    outline: none;
                }

                ::placeholder {
                    color: ${colors.grey.grey400};
                }
            }

            .btn-apply {
                width: 70px;
                min-width: 70px;
                padding: 0;
                border-radius: 0;
                text-transform: uppercase;
                font-family: ${fonts.accent};

                &.submitted {
                    font-size: 10px;
                }
            }
        }
        .coupon-field-error {
            margin: 5px 0 0;
            ${mixinTypography.text.tXs.textXsRegular};
            color: ${colors.error.error700};
            position: absolute;
            bottom: -17px;
            left: 2px;
        }
    }
`;
