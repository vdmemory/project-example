import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledNavigationList = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .label {
        ${mixinTypography.label.lS.labelSMedium};
        color: ${colors.grey.grey500};
    }

    .list {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        @media (${mediaScreen.maxMobile}) {
            padding: 10.5px 0;
            height: 66px;
            align-items: center;
        }
    }
`;

export const StyledItem = styled.div<{
    isActive: boolean;
    isNoViewed: boolean;
    isScalingOnMobile?: boolean;
}>`
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    width: 47px;
    height: 47px;
    border-radius: 50%;
    overflow: visible;

    ${({ isActive }) =>
        isActive
            ? css`
                  border: 4px solid ${colors.orange.orange500};
              `
            : css`
                  border: 1px solid transparent;
              `};

    transition: all 0.2s ease-in-out;

    .group {
        display: flex;
        position: relative;

        .logo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            transition: all 0.2s ease-in-out;
        }

        .status {
            position: absolute;
            bottom: -3px;
            right: -5px;
            display: flex;
            justify-content: center;
            align-items: center;

            @media (${mediaScreen.maxMobile}) {
                right: 0;

                svg {
                    width: 10.5px;
                    height: 10.5px;
                }
            }

            ${({ isNoViewed }) =>
                isNoViewed &&
                css`
                    top: -0.5px;
                    right: -0.5px;
                    bottom: unset;
                `};

            ${({ isActive }) =>
                isActive &&
                css`
                    display: none;
                `};
        }
    }

    ${({ isScalingOnMobile, isActive }) =>
        isScalingOnMobile &&
        css`
      @media (${mediaScreen.maxMobile}) {
        width: 26px;
        height: 26px;
        ${
            isActive
                ? css`
                      width: 45px;
                      height: 45px;
                      border: 3px solid ${colors.orange.orange500};
                      .group .logo {
                          width: 40px;
                          height: 40px;
                      }
                  `
                : css`
                      .group .logo {
                          width: 28px;
                          height: 28px;
                      }
                  `
        };
    `};
`;

export const customStyle = {
    background: '#FFFFFF',
    padding: '6px 10px',
    border: '1px solid black',
};
