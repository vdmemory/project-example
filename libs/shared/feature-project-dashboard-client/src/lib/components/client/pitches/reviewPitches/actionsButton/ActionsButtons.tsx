import { Button, CheckMarkSmallIcon, CloseIcon, colors } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { ReviewDecisionNames } from '@breef/shared/constants';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';
import { ReactNode } from 'react';

const setIconColor = (color: string) => css`
    svg path {
        stroke: ${color};
        fill: unset;
    }

    svg line {
        stroke: ${color};
        fill: unset;
    }
`;

const setSizeIcon = (size: number) => css`
    svg {
        width: ${size}px;
        min-width: ${size}px;
        height: ${size}px;
    }
`;

const StyledActionsButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    .text {
        font-family: 'SuisseIntlMono';
        font-size: 16px;
        line-height: 24px;
        text-transform: uppercase;
        color: ${colors.grey.grey900};
    }

    .buttons-group {
        display: flex;
        gap: 20px;
        justify-content: space-between;
        width: 100%;

        @media screen and (max-width: 768px) {
            margin-left: 0;
            padding: 0 32px;
        }

        button {
            border-radius: 4px;
            min-width: 133px;
            font-size: 16px;
            line-height: 20px;
            height: 40px;

            @media screen and (max-width: 768px) {
                font-size: 14px;
                line-height: 18px;
            }

            .icon-wrapper.icon-wrapper-left {
                width: 20px;
                height: 20px;
                position: relative;

                > svg {
                    position: absolute;

                    top: 50%;
                    left: 50%;
                    display: flex;
                    transform: translate(-50%, -50%);
                }
            }
        }

        .skip-button {
            background-color: ${colors.white};
            color: ${colors.primary.primary400};
            ${setIconColor(colors.primary.primary400)};
            border-color: ${colors.primary.primary400};
            ${setSizeIcon(34)}

            &:hover {
                color: ${colors.white};
                background-color: ${colors.primary.primary200};
                ${setIconColor(colors.white)};
                border-color: ${colors.primary.primary200};

                @media screen and (${mediaScreen.tablet}) {
                    background-color: ${colors.white};
                    color: ${colors.primary.primary400};
                    ${setIconColor(colors.primary.primary400)};
                    border-color: ${colors.primary.primary400};
                }
            }
        }

        .add-to-shortlist-button {
            ${setSizeIcon(26)}
            border-color: ${colors.primary.primary500};
            ${setIconColor(colors.white)};

            &:hover {
                border-color: ${colors.primary.primary300};

                @media screen and (${mediaScreen.tablet}) {
                    border-color: ${colors.primary.primary500};
                }
            }

            &:disabled .label svg path {
                fill: unset;
            }
        }

        .active-view {
            display: flex;
            align-items: center;
            min-width: max-content;
            font-size: 18px;
            line-height: 20px;
            height: 40px;
            font-weight: 600;

            color: ${colors.primary.primary400};
            ${setIconColor(colors.primary.primary400)};
            border-color: ${colors.primary.primary400};
            ${setSizeIcon(40)}

            &.add {
                ${setSizeIcon(32)}
            }
        }
    }
`;

interface ActionsButtonsProps {
    onClick: (type: ReviewDecisionNames) => void;
    isSubmitted?: boolean;
    currentType?: ReviewDecisionNames;
}

export const ActionsButtons = ({
    onClick,
    isSubmitted,
    currentType,
}: ActionsButtonsProps) => {
    const isSelectedYes = currentType === ReviewDecisionNames.ACCEPTED;
    const isSelectedNo = currentType === ReviewDecisionNames.REJECTED;

    const handleSelect = (type: ReviewDecisionNames) => {
        if (isSubmitted) return;
        if (currentType === type) {
            onClick(ReviewDecisionNames.VIEWED);
            return;
        }

        onClick(type);
    };

    return (
        <StyledActionsButtons>
            <div className="buttons-group">
                {isSelectedNo ? (
                    <Active
                        name={'Skipped'}
                        className="skip"
                        icon={<CloseIcon />}
                    />
                ) : (
                    <Button
                        className="skip-button"
                        label={'Skip'}
                        onClick={() =>
                            handleSelect(ReviewDecisionNames.REJECTED)
                        }
                        variant="outlined"
                        isDisabled={isSubmitted}
                        size="small"
                        icon={<CloseIcon />}
                        iconPlacement="left"
                    />
                )}

                {isSelectedYes ? (
                    <Active
                        name={'Added to Shortlist'}
                        className="add"
                        icon={<CheckMarkSmallIcon />}
                    />
                ) : (
                    <Button
                        className="add-to-shortlist-button"
                        label={'Add to Shortlist'}
                        onClick={() =>
                            handleSelect(ReviewDecisionNames.ACCEPTED)
                        }
                        isDisabled={isSubmitted}
                        size="small"
                        icon={<CheckMarkSmallIcon />}
                        iconPlacement="left"
                    />
                )}
            </div>
        </StyledActionsButtons>
    );
};

const Active = ({
    name,
    icon,
    className,
}: {
    name: string;
    icon: ReactNode;
    className: string;
}) => {
    return (
        <div className={`active-view ${className}`}>
            {icon}
            {name}
        </div>
    );
};
