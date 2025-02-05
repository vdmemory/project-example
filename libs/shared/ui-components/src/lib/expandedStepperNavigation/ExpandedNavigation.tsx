import { ChatIcon, PhoneIcon } from '@breef/shared/assets';

import { ReactNode } from 'react';
import Button from '../button/Button';
import { useIntercom } from 'react-use-intercom';
import { usePopup } from '../popup/usePopup';
import { css } from '@emotion/react';
import { CustomDropdownMenu } from '../customDropdown/customDropdownMenu';
import { useRouter } from 'next/router';
import { PROFILE_ROUTE, PROJECTS_ROUTE } from '@breef/shared/constants';
import { logout } from '@breef/shared/utils';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { useMediaContext } from '@breef/shared/hooks';
import { Button as ButtonLink, ListIcon24 } from '@breef/ui-kit';
import { StyledExpandedNavigation } from './ExpandedNavigation.styled';
import { BookACallPopup } from '../popup/bookACallPopup/BookACallPopup';

interface StyledExpandedNavigationProps {
    title?: string;
    customPopup?: ReactNode;
    customPopupControl?: {
        isOpen: boolean;
        close: () => void;
        open: () => void;
    };
    children?: ReactNode;
    text?: string;
    displayPhone?: boolean;
    displayChat?: boolean;
    isDisplayListIcon?: boolean;
}

export const ExpandedNavigation = ({
    title,
    children,
    text,
    displayPhone,
    displayChat = true,
    isDisplayListIcon,
    customPopup,
    customPopupControl,
}: StyledExpandedNavigationProps) => {
    const { isMobile } = useMediaContext();
    const bookACallPopupControl = usePopup();
    const intercom = useIntercom();
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

    return (
        <StyledExpandedNavigation>
            {customPopupControl?.isOpen && customPopup}
            {bookACallPopupControl.isOpen && (
                <BookACallPopup close={bookACallPopupControl.close} />
            )}
            <div className="expanded-navigation-title">
                <h1>{title}</h1>
                {!!customPopupControl && (
                    <div className="link">
                        {isDisplayListIcon && <ListIcon24 />}
                        <ButtonLink
                            label="View Scope"
                            size="large"
                            isUppercase
                            onClick={customPopupControl.open}
                            variant="ghost"
                            isDisabled={false}
                        />
                    </div>
                )}
            </div>
            <div className="panel-navigation">
                {!isMobile ? (
                    <div className="right-section-wrapper">
                        <div className="wrapper">
                            {text ? <span className="text">{text}</span> : null}
                            <div className="btn-group">
                                {displayChat && (
                                    <Button
                                        type="button"
                                        className="only-icon chat-icon"
                                        onClick={handleShowIntercom}
                                    >
                                        <ChatIcon />
                                    </Button>
                                )}
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
                        </div>
                        {children}
                    </div>
                ) : (
                    <CustomDropdownMenu
                        dropdownList={dropMenuListNew}
                        customChange={dropMenuActionNew}
                    />
                )}
            </div>
        </StyledExpandedNavigation>
    );
};

export default ExpandedNavigation;

const tooltipPopupStyleCssPreset = css`
    backdrop-filter: blur(20px);
`;
