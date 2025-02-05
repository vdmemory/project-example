import styled from '@emotion/styled';
import { BackgroundCompanyLogo } from '@breef/shared/assets';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledCompanyInfoForm = styled.form`
    position: relative;

    .form-container {
        display: flex;

        @media (${mediaScreen.tablet}) {
            flex-direction: column;
        }

        .left-section {
            display: flex;
            background-color: ${colors.darkPurple};
            min-width: 220px;
            width: 220px;
            border-right: 1px solid ${colors.mainBlack};
            border-bottom: 1px solid ${colors.mainBlack};
            justify-content: center;

            @media (${mediaScreen.tablet}) {
                min-width: 100%;
                width: 100%;
                border-right: unset;
            }
        }

        .inner-form {
            width: 74%;

            @media (${mediaScreen.tablet}) {
                width: 100%;
            }
        }

        .link-field {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
        }

        .logo-wrapper {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid ${colors.mainOrange};
            margin-top: 50px;
            background-color: ${colors.darkPurple};
            background-image: url(${BackgroundCompanyLogo.src});
            cursor: pointer;

            .plus-wrapper {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: ${colors.mainOrange};
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 6px;
                svg {
                    line {
                        stroke: ${colors.mainWhite};
                        stroke-width: 2.5px;
                    }
                }
            }
        }
    }
`;
