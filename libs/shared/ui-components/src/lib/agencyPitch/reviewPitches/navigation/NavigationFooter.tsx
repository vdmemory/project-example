import {
    ArrowRightIcon,
    NextNavArrow,
    PrevNavArrow,
} from '@breef/shared/assets';
import { useMediaContext } from '@breef/shared/hooks';
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledNavigation = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    border-top: 1px solid ${colors.grey.grey900};
    border-bottom: 1px solid ${colors.grey.grey900};
    background-color: ${colors.beige};
    height: 81px;
    z-index: 9;

    .button-wrapper {
        display: flex;
        align-items: center;
        width: 95px;
        position: relative;
    }

    .button-nav {
        display: flex;
        align-items: center;
        gap: 12px;
        border: none;
        background-color: transparent;
        height: 48px;
        width: max-content;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        position: absolute;

        &.prev {
            left: 0;
        }

        &.next {
            right: 0;
        }

        :disabled {
            cursor: not-allowed;
            opacity: 0.3;

            :hover svg path {
                fill: ${colors.grey.grey900};
            }
        }

        svg path {
            transition: all 0.2s ease-in-out;
        }

        :hover svg path {
            fill: ${colors.grey.grey500};
        }

        @media (hover: hover) {
            :hover svg rect {
                fill: ${colors.beige};
            }
        }

        .text {
            transition: all 0.2s ease-in-out;
            margin: 0;
            ${mixinTypography.label.lS.labelSMedium};
            color: ${colors.grey.grey900};
        }

        :hover .text {
            color: ${colors.grey.grey500};
        }
    }

    .mobile-arrow {
        transform: rotate(180deg);

        path {
            stroke: ${colors.grey.grey900};
        }
    }
`;

interface NavigationProps {
    children?: React.ReactNode;
    onClickNext?: () => void;
    onClickPrev?: () => void;
    buttonTitleLeft?: string;
    buttonTitleRight?: string;
    hideNextButton?: boolean;
}

export const NavigationFooter = ({
    children,
    onClickNext,
    onClickPrev,
    buttonTitleLeft = 'prev',
    buttonTitleRight = 'next',
    hideNextButton,
}: NavigationProps) => {
    const { isMobile } = useMediaContext();

    return (
        <StyledNavigation className="navigation">
            <div className="button-wrapper">
                <button
                    onClick={onClickPrev}
                    type="button"
                    className="button-nav prev"
                    disabled={!onClickPrev}
                >
                    {isMobile ? (
                        <ArrowRightIcon className="mobile-arrow" />
                    ) : (
                        <PrevNavArrow />
                    )}
                    <p className="text">{buttonTitleLeft}</p>
                </button>
            </div>

            {children}
            {!hideNextButton && (
                <div className="button-wrapper">
                    <button
                        onClick={onClickNext}
                        type="button"
                        className="button-nav next"
                        disabled={!onClickNext}
                    >
                        <p className="text">{buttonTitleRight}</p>
                        <NextNavArrow />
                    </button>
                </div>
            )}
        </StyledNavigation>
    );
};
