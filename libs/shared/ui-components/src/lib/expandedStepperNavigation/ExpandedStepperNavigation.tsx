import { ChatIcon, ExitIcon, InfoIcon, PhoneIcon } from '@breef/shared/assets';

import { Fragment, ReactNode, useRef, useState } from 'react';
import { StyledExpandedStepperNavigation } from './ExpandedStepperNavigation.styled';
import Button from '../button/Button';
import { BookACallPopup } from '../popup/bookACallPopup/BookACallPopup';
import { useIntercom } from 'react-use-intercom';
import { CustomDropdown } from '../customDropdown/customDropdown';
import { usePopup } from '../popup/usePopup';
import { getDefaultStylesPopupPreset, Popup } from '../popup/Popup';
import { css } from '@emotion/react';
import { CustomDropdownMenu } from '../customDropdown/customDropdownMenu';
import { useRouter } from 'next/router';
import {
    AUTH_FRONT_APP_URL,
    PROFILE_ROUTE,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';
import { logout, redirectToApp } from '@breef/shared/utils';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { useMediaContext } from '@breef/shared/hooks';
import { Button as ButtonLink, colors } from '@breef/ui-kit';

interface StyledExpandedStepperNavigationProps {
    title?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    maxLength?: number;
    isShowIconInfo?: boolean;
    isShowLinkInfo?: boolean;
    tooltipInfoContent?: ReactNode;
    customPopup?: ReactNode;
    customPopupControl?: {
        isOpen: boolean;
        close: () => void;
        open: () => void;
    };
    isFieldError?: boolean;
    onButtonClick?: () => void;
    isDisabledButton?: boolean;
    buttonTitle?: string;
    displayPhone?: boolean;
    isSubmitting?: boolean;
    brandLead?: {
        firstName: string;
        lastName: string;
    };
    estimation?: string;
    isTitleSection?: boolean;
    isNewNav?: boolean;
}

export const ExpandedStepperNavigation = ({
    title,
    onChange,
    placeholder = '',
    maxLength = 255,
    readOnly = false,
    isShowIconInfo = false,
    isShowLinkInfo = false,
    tooltipInfoContent,
    isFieldError = false,
    onButtonClick,
    buttonTitle = 'Dashboard',
    isDisabledButton = false,
    displayPhone = false,
    isSubmitting = false,
    brandLead = {
        firstName: 'BREEF',
        lastName: 'LEAD',
    },
    estimation = '',
    isTitleSection = true,
    isNewNav,
    customPopup,
    customPopupControl,
}: StyledExpandedStepperNavigationProps) => {
    const { isMobile } = useMediaContext();
    const refInput = useRef<HTMLInputElement | null>(null);
    const bookACallPopupControl = usePopup();
    const tooltipPopupControl = usePopup();
    const intercom = useIntercom();
    const [innerHeight, setInnerHeight] = useState('0px');
    const router = useRouter();

    const { data, isSuccess } = useGetSelfQuery();

    const handleShowIntercom = () => {
        if (intercom && isSuccess && data) {
            intercom.boot({
                userId: String(data.id),
                email: data.email,
                createdAt: data.dateJoined,
                name: `${data.firstName} ${data.lastName}`,
                company: {
                    companyId: String(data.id),
                    name: data.companyName,
                    createdAt: data.dateJoined,
                },
                customAttributes: {
                    type: data.companyType,
                },
            });
            intercom.show();
        }
    };

    const handleShowTooltipPopup = () => {
        setInnerHeight(window.innerHeight + 'px');
        if (customPopup && customPopupControl) {
            customPopupControl.open();
        } else {
            tooltipPopupControl.open();
        }
    };

    const dropMenuListNew = [
        {
            value: 'projects',
            label: 'Projects',
        },
        {
            value: 'profile',
            label: 'Profile',
        },
        {
            value: 'logout',
            label: 'Log out',
        },
    ];

    const dropMenuActionNew = (value: string) => {
        switch (value) {
            case 'projects':
                return router.push(PROJECTS_ROUTE);
            case 'profile':
                return router.push(PROFILE_ROUTE);
            case 'logout':
                return logout();
            default:
                return;
        }
    };

    const dropMenuList = [
        {
            value: 'bookChat',
            label: 'Book a chat',
        },
        {
            value: 'bookCall',
            label: 'Book a call',
        },
    ].filter(item => (displayPhone ? item : item.value !== 'phone'));

    const dropMenuAction = (value: string) => {
        switch (value) {
            case 'bookChat':
                return handleShowIntercom();
            case 'bookCall':
                return bookACallPopupControl.open();
            default:
                return;
        }
    };
    return (
        <StyledExpandedStepperNavigation
            isFieldError={isFieldError}
            isReadOnlyInput={readOnly}
        >
            {tooltipPopupControl.isOpen && (
                <Popup
                    close={tooltipPopupControl.close}
                    style={getDefaultStylesPopupPreset(isMobile, innerHeight)}
                    styleCss={tooltipPopupStyleCssPreset}
                >
                    {tooltipInfoContent}
                </Popup>
            )}
            {customPopupControl?.isOpen && customPopup}
            {bookACallPopupControl.isOpen && (
                <BookACallPopup close={bookACallPopupControl.close} />
            )}
            {isTitleSection &&
                (readOnly ? (
                    <div className="expanded-navigation-title">
                        <h1>{title}</h1>

                        {isShowIconInfo && (
                            <InfoIcon
                                className="icon-info"
                                onClick={handleShowTooltipPopup}
                            />
                        )}
                        {isShowLinkInfo && (
                            <div className="link">
                                <ButtonLink
                                    label="View Scope"
                                    size="large"
                                    isUppercase
                                    onClick={handleShowTooltipPopup}
                                    variant="ghost"
                                    isDisabled={false}
                                />
                            </div>
                        )}
                        {!!estimation.length && !isMobile && (
                            <span className="expanded-navigation-title-estimation">
                                {estimation}
                            </span>
                        )}
                    </div>
                ) : (
                    <h1>
                        <input
                            ref={refInput}
                            className="title-project"
                            type="text"
                            value={title}
                            onChange={e => onChange && onChange(e.target.value)}
                            placeholder={placeholder}
                            readOnly={readOnly}
                            maxLength={maxLength}
                        />
                        {isShowIconInfo && (
                            <InfoIcon
                                className="icon-info"
                                onClick={handleShowTooltipPopup}
                            />
                        )}
                    </h1>
                ))}
            <div className="panel-navigation">
                {!isMobile ? (
                    <Fragment>
                        <div
                            className={
                                !!buttonTitle.length && onButtonClick
                                    ? 'btn-group'
                                    : 'btn-group btn-group-only-icons'
                            }
                        >
                            <Button
                                type="button"
                                className="only-icon chat-icon"
                                onClick={handleShowIntercom}
                            >
                                <ChatIcon />
                            </Button>
                            {displayPhone && (
                                <Button
                                    type="button"
                                    className="only-icon phone-icon"
                                    onClick={bookACallPopupControl.open}
                                >
                                    <PhoneIcon />
                                </Button>
                            )}
                        </div>
                        {!!buttonTitle.length && onButtonClick && (
                            <Button
                                title={buttonTitle}
                                type="button"
                                className="small-accent"
                                color="primary"
                                withAnimate
                                onClick={onButtonClick}
                                disabled={isDisabledButton}
                                isSubmitting={isSubmitting}
                            />
                        )}
                    </Fragment>
                ) : isNewNav ? (
                    <CustomDropdownMenu
                        dropdownList={dropMenuListNew}
                        customChange={dropMenuActionNew}
                    />
                ) : (
                    <Fragment>
                        <CustomDropdown
                            value=""
                            dropdownList={dropMenuList}
                            customChange={dropMenuAction}
                            type="header-menu"
                        />

                        <Button
                            onClick={onButtonClick}
                            type="button"
                            className="mobile-button-only-icon mobile-action-button"
                            disabled={isDisabledButton}
                            isSubmitting={isSubmitting}
                        >
                            <ExitIcon />
                        </Button>
                    </Fragment>
                )}
            </div>
        </StyledExpandedStepperNavigation>
    );
};

export default ExpandedStepperNavigation;

const tooltipPopupStyleCssPreset = css`
    backdrop-filter: blur(20px);
`;
