import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export interface StylePopup {
    isActive: boolean;
}

export const StyledSharedPopup = styled.div`
    position: relative;
    width: 860px;
    .shared {
        &-top--section {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: ${colors.mainPurple};
            padding: 48px 68px;
            border-bottom: ${({ isActive }: StylePopup) =>
                isActive ? '1px solid black' : 'none'};
            .shared-title {
                font-style: normal;
                font-weight: 450;
                font-size: 48px;
                line-height: 110%;
                margin: 0;
                letter-spacing: 0.002em;
                text-transform: uppercase;
            }
        }
        &-bottom--section {
            height: ${({ isActive }: StylePopup) => (isActive ? '232px' : '0')};
            overflow: ${({ isActive }: StylePopup) =>
                isActive ? 'hidden' : 'auto'};
            transition: height 0.3s ease;
        }

        &-button {
            font-weight: 450;
            font-size: 24px;
            line-height: 120%;
            letter-spacing: 0.015em;
            height: 85px;
            border-top: 1px solid ${colors.mainBlack};
        }
    }

    @media (${mediaScreen.tablet}) {
        width: 100%;
        .shared {
            &-top--section {
                padding: 44px 20px;

                .shared-title {
                    font-weight: 400;
                    font-size: 32px;
                    line-height: 110%;
                    letter-spacing: 0.002em;
                    text-transform: uppercase;
                }
            }
            &-bottom--section {
                height: ${({ isActive }: StylePopup) =>
                    isActive ? '100%' : '0'};
            }
        }
    }
`;
