import { StyledSuccessInfo } from './SuccessInfo.styled';
import { NextSteps } from './nextSteps/NextSteps';
import Button from '../button/Button';
import { UploadIcon } from '@breef/shared/assets';
import LinkButton from '../button/linkButton/LinkButton';
import { useRouteControl } from '@breef/shared/hooks';
import { useEffect, useState } from 'react';

interface SuccessOnboardingProps {
    config: {
        title: string;
        note: string;
        nextSteps: {
            imageUrl: string;
            title: string;
            note: string;
        }[];
        btnArrowAdditional?: boolean;
    };
    buttonTitle: string;
    additionalButtonTitle?: string;
    onButtonClick: () => void;
    onAdditionalButtonClick?: () => void;
    linkButton?: {
        title: string;
        link: string;
    };
    isShowNextStepsNumbers?: boolean;
    handleUnmountSuccessScreen?: () => void;
}

export function SuccessInfo({
    config,
    buttonTitle,
    additionalButtonTitle,
    onButtonClick,
    onAdditionalButtonClick,
    handleUnmountSuccessScreen,
    isShowNextStepsNumbers = false,
    linkButton,
}: SuccessOnboardingProps) {
    const { changePage } = useRouteControl();
    const [isOnButtonClickAction, setIsOnButtonClickAction] = useState(false);
    useEffect(() => {
        return () =>
            !isOnButtonClickAction && handleUnmountSuccessScreen
                ? handleUnmountSuccessScreen()
                : undefined;
    }, []);
    const handleButtonClick = () => {
        setIsOnButtonClickAction(true);
        onButtonClick();
    };
    return (
        <StyledSuccessInfo>
            {linkButton && (
                <div className="link-buttons-wrapper">
                    <LinkButton
                        name={linkButton.title}
                        onClick={() => changePage(linkButton.link)}
                        line
                    />
                </div>
            )}
            <div className="header-onboarding-success-wrapper">
                <h1>{config.title}</h1>
                <span>{config.note}</span>
            </div>
            <div className="content-onboarding-success-wrapper">
                {config.nextSteps.map((item, key) => (
                    <NextSteps
                        key={key}
                        {...item}
                        numeric={key}
                        title={
                            (isShowNextStepsNumbers ? `${key + 1}. ` : '') +
                            item.title
                        }
                    />
                ))}
            </div>
            <div className="button-group">
                {onAdditionalButtonClick && (
                    <Button
                        title={additionalButtonTitle}
                        type="button"
                        className="normal"
                        onClick={onAdditionalButtonClick}
                        arrowRight
                        iconButton={
                            <UploadIcon className="arrow down arrow-right " />
                        }
                        color="secondary"
                        withAnimate
                    />
                )}
                <Button
                    title={buttonTitle}
                    type="button"
                    className="normal"
                    onClick={handleButtonClick}
                    arrowRight={config.btnArrowAdditional ? false : true}
                    withAnimate
                />
            </div>
        </StyledSuccessInfo>
    );
}
