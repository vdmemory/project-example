/* eslint-disable-next-line */
import { StyledNavControl } from './NavControl.styled';
import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { PrevNavArrow, NextNavArrow } from '@breef/shared/assets';

const PortalContent = ({
    handleNext,
    handleBack,
    isDisabledNext = false,
    isDisabledPrev = false,
    step = 0,
    isStatic,
    isSticky,
    children,
    rightComponent,
    leftComponent,
    isNewNav,
}: NavControlProps) => {
    const [isLockedNavControl, setIsLockedNavControl] = useState(false);
    const [prevStep, setPrevStep] = useState(step);
    const [isDisableNextState, setIsDisableNextState] =
        useState(isDisabledNext);

    const transitionExpectation = 500;

    useEffect(() => {
        setIsDisableNextState(isDisabledNext);
    }, [isDisabledNext, isDisableNextState]);

    useEffect(() => {
        if (step !== prevStep) lockTimeoutNavControl();
        setPrevStep(step);
    }, [step, prevStep]);

    const lockTimeoutNavControl = () => {
        setIsLockedNavControl(true);
        setTimeout(() => {
            setIsLockedNavControl(false);
        }, transitionExpectation);
    };

    const getCutSection = () => {
        if (!!children && !handleBack) return 'cut-right';
        if (!!children && !handleNext) return 'cut-left';
        return '';
    };

    return (
        <StyledNavControl
            isNewNav={isNewNav}
            data-testid="nav-control"
            cut={getCutSection()}
            noFlexLeft={!!leftComponent && !handleBack}
            noFlexRight={!!rightComponent && !handleNext}
            isStatic={isStatic}
            className={
                isSticky ? 'nav-control nav-control-sticky' : 'nav-control'
            }
            isChildren={!!children}
        >
            <div className="left-section">
                {leftComponent && !handleBack ? leftComponent : null}
                {!!children && !handleBack && !leftComponent ? children : null}
                {handleBack && (
                    <button
                        data-testid="back-button"
                        className="control-btn"
                        type="button"
                        onClick={handleBack}
                        disabled={isDisabledPrev || isLockedNavControl}
                    >
                        <PrevNavArrow />
                    </button>
                )}
            </div>

            <div className="right-section">
                {rightComponent && !handleNext ? rightComponent : null}
                {!!children && !handleNext && !rightComponent ? children : null}
                {handleNext && (
                    <button
                        data-testid="next-button"
                        className="control-btn"
                        type="button"
                        onClick={handleNext}
                        disabled={isDisableNextState || isLockedNavControl}
                    >
                        <NextNavArrow />
                    </button>
                )}
            </div>
        </StyledNavControl>
    );
};

export interface NavControlProps {
    handleNext?: (e: React.SyntheticEvent) => void;
    handleBack?: (e: React.SyntheticEvent) => void;
    isDisabledNext?: boolean;
    isViewNavControl?: boolean;
    isDisabledPrev?: boolean;
    step?: number;
    isStatic?: boolean;
    children?: ReactNode;
    isSticky?: boolean;
    rightComponent?: ReactNode;
    leftComponent?: ReactNode;
    isNewNav?: boolean;
}

export const NavControl: React.FC<NavControlProps> = ({
    isViewNavControl = true,
    isStatic = false,
    isSticky = false,
    ...rest
}) => {
    if (isViewNavControl) {
        if (isStatic)
            return <PortalContent isStatic isSticky={isSticky} {...rest} />;
        return ReactDOM.createPortal(
            <PortalContent {...rest} />,
            document.body,
        );
    }

    return null;
};

export default NavControl;
