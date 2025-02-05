import { BreefLogo, CloseIcon } from '@breef/shared/assets';
import {
    AUTH_FRONT_APP_URL,
    PROFILE_ROUTE,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';
import { useMediaContext } from '@breef/shared/hooks';
import { logout, redirectToApp } from '@breef/shared/utils';
import { Button, worktable } from '@breef/ui-kit';
import { Global } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { CustomDropdownMenu } from '../../customDropdown/customDropdownMenu';
import NavControl from '../../navControl/NavControl';
import { Popup } from '../Popup';
import {
    getPopupStylePreset,
    navGlobalStyles,
    popupGlobalStyles,
    StyledFinishPitchPopup,
} from './FinishPitchPopup.styled';

interface FinishPitchPopupProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    onSubmit?: () => void;
    onClose?: () => void;
    isSubmitted?: boolean;
    isDisabled?: boolean;
    buttonTitle?: string;
    bodyOffsetTop?: number;
    bodyOffsetBottom?: number;
}

export const FinishPitchPopup = ({
    title,
    description,
    children,
    onSubmit,
    onClose,
    isSubmitted,
    isDisabled,
    buttonTitle = 'SUBMIT',
    bodyOffsetTop,
    bodyOffsetBottom,
}: FinishPitchPopupProps) => {
    const { isMobile } = useMediaContext();

    const handleClick = () => onSubmit?.();

    const isSubmitDisplay = !!handleClick;
    const isCloseButtonDisplay = !!onClose;

    return (
        <Fragment>
            <HeaderNav key="header-nav" />
            <Popup
                key={'popup-choice-of-interest'}
                isClosable={false}
                style={getPopupStylePreset(isMobile)}
            >
                <StyledFinishPitchPopup
                    bodyOffsetTop={bodyOffsetTop}
                    bodyOffsetBottom={bodyOffsetBottom}
                >
                    <Global styles={popupGlobalStyles} />
                    <div className="left-section">
                        <img
                            src={worktable.src}
                            alt="Coffee Break"
                            className="pitch-popup-start"
                        />
                    </div>
                    <div className="right-section">
                        <div className="form-header">
                            <div className="group">
                                <h3 className="title">{title}</h3>
                                {description && (
                                    <p className="description">{description}</p>
                                )}
                            </div>
                            {isCloseButtonDisplay && (
                                <div className="close-wrapper">
                                    <CloseIcon
                                        className="close-button"
                                        role="button"
                                        onClick={onClose}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="divider" />
                        <div className="form-body">{children}</div>
                        <div className="form-footer">
                            {isSubmitDisplay && (
                                <Button
                                    label={buttonTitle}
                                    size="medium"
                                    isSubmitted={isSubmitted}
                                    isDisabled={isDisabled}
                                    onClick={handleClick}
                                    className="button-save"
                                />
                            )}
                        </div>
                    </div>
                </StyledFinishPitchPopup>
            </Popup>
        </Fragment>
    );
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

export const HeaderNav = () => {
    const router = useRouter();

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
        <Fragment>
            <Global key="global-styles" styles={navGlobalStyles} />
            <NavControl
                key="nav-control"
                isNewNav
                isSticky
                leftComponent={
                    <Link
                        className="link-logo"
                        href={PROJECTS_ROUTE}
                        shallow={true}
                    >
                        <BreefLogo />
                    </Link>
                }
            >
                <CustomDropdownMenu
                    dropdownList={dropMenuListNew}
                    customChange={dropMenuActionNew}
                />
            </NavControl>
        </Fragment>
    );
};
