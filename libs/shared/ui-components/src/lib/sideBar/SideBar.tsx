import { useMediaContext } from '@breef/shared/hooks';
import { Button, colors, ListIcon24, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

const StyledSideBar = styled.aside`
    display: flex;
    flex-direction: column;
    max-width: 445px;
    width: 100%;
    border-right: 1px solid ${colors.grey.grey200};
    padding: 40px 40px 40px 75px;
    gap: 32px;
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    overflow-y: auto;

    .group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .title {
        ${mixinTypography.display.dMd.displayMdMedium}
        margin: 0;
        white-space: pre-wrap;
        font-size: 30px;
        line-height: 34px;
        font-weight: 600;
    }

    .subtitle {
        ${mixinTypography.mobile.text.mobileTextXs};
        font-weight: 600;
    }

    .link {
        display: flex;
        gap: 6px;

        button {
            font-size: 12px;
            font-family: 'SuisseIntlMono';
            min-width: auto;
            padding: 0;

            .label {
                text-decoration: underline;
            }
        }

        svg {
            margin-left: -3px;
        }
    }

    @media screen and (max-width: 1176px) {
        padding: 40px;
        max-width: 375px;
    }
`;

const tooltipPopupStyleCssPreset = css`
    backdrop-filter: blur(20px);
`;

interface ActionsButtonsProps {
    title: string;
    prefixNode?: ReactNode;
    children: ReactNode;
    subtitle?: string;
    popupControl?: {
        isOpen: boolean;
        open: () => void;
        close: () => void;
    };
    popup?: ReactNode;
}

export const SideBar = ({
    title,
    prefixNode,
    children,
    subtitle,
    popupControl,
    popup,
}: ActionsButtonsProps) => {
    const { isMobile } = useMediaContext();

    return (
        <StyledSideBar className="side-bar">
            {popupControl?.isOpen && popup}
            <div className="group">
                {prefixNode}
                {isMobile && !!subtitle && (
                    <div className="subtitle">{subtitle}</div>
                )}
                <h2 className="title">{title}</h2>
                {!!popupControl && (
                    <div className="link">
                        <ListIcon24 />
                        <Button
                            label="View Scope"
                            size="large"
                            isUppercase
                            onClick={popupControl.open}
                            variant="ghost"
                            isDisabled={false}
                        />
                    </div>
                )}
            </div>

            {children}
        </StyledSideBar>
    );
};
