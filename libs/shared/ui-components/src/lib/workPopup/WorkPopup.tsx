import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { CloseMediumIcon, colors, mixinTypography } from '@breef/ui-kit';
import { Popup } from '../popup/Popup';
import { useMediaContext } from '@breef/shared/hooks';
import { css } from '@emotion/react';

interface WorkPopupProps {
    children: ReactNode;
    close: () => void;
    title: string;
}
export const WorkPopup: FC<WorkPopupProps> = ({ children, close, title }) => {
    const { isMobile } = useMediaContext();
    return (
        <Popup
            style={getPopupStylePreset(isMobile)}
            styleCss={tooltipPopupStyleCssPreset}
        >
            <StyledWorkPopup>
                <div className="work-popup-header">
                    <h3>{title}</h3>
                    <CloseMediumIcon
                        className="close-button"
                        role="button"
                        onClick={close}
                    />
                </div>
                {children}
            </StyledWorkPopup>
        </Popup>
    );
};

export default WorkPopup;

const StyledWorkPopup = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.white};
    position: relative;

    .work-popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 14px 5px 20px;
        height: 48px;
        background-color: ${colors.secondary.secondary500};
        border-bottom: 1px solid ${colors.grey.grey900};
        position: sticky;
        top: 0;
        z-index: 11;

        h3 {
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            margin: 0;
            ${mixinTypography.text.tXl.textXlMedium};
        }

        .close-button {
            cursor: pointer;

            :hover {
                opacity: 0.6;
            }
        }
    }
`;

const tooltipPopupStyleCssPreset = css`
    backdrop-filter: blur(20px);
`;
const getPopupStylePreset = (isMobile?: boolean, height?: string) => {
    return {
        height: isMobile ? height : 'auto',
        maxHeight: isMobile ? height : '-webkit-fill-available',
        minHeight: isMobile ? height : 'unset',
        padding: 0,
        margin: 0,
        minWidth: isMobile ? '100vw' : '850px',
        maxWidth: '850px',
        border: isMobile ? 'none' : '1px solid black',
        borderRadius: '4px',
    };
};

export const StyledWorkPopupRow = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;

    .radio-label {
        display: flex;
        padding: 0;
        width: fit-content;
        height: 20px;
        align-items: center;
        + .radio-label {
            margin-top: 12px;
        }
        .radio-label {
            ${mixinTypography.text.tLg.textLgMedium};
            margin: -5.5px 0 -5.5px 8px;
        }
    }

    .radio {
        min-width: 16px !important;
        height: 16px !important;

        svg {
            font-size: 8px !important;
        }
    }

    input {
        max-width: 350px;

        @media screen and (max-width: 768px) {
            max-width: 650px;
        }
    }

    input.dropdown-input {
        height: 48px;
        border-radius: 4px;
        ${mixinTypography.text.tMd.textMdMedium};
    }
    .chevron {
        top: 50%;
        transform: translateY(-50%);
    }
`;

interface StyledWorkPopupFieldLabelProps {
    isShortPadding?: boolean;
}
export const StyledWorkPopupFieldLabel = styled.label`
    ${mixinTypography.label.lMd.labelMdMedium};
    color: ${colors.grey.grey400};
    margin: -3px 0;
    padding-bottom: ${({ isShortPadding }: StyledWorkPopupFieldLabelProps) =>
        isShortPadding ? 9 : 20}px;
`;
