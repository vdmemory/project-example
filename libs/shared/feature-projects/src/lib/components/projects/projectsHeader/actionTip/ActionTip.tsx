import { StyledActionTip } from './ActionTip.styled';
import { Button } from '@breef/shared/ui-components';
import { ReactNode } from 'react';
import { itemAnimationSettings } from '@breef/shared/utils';

interface ActionTipProps {
    title: string;
    btnTitle: string | ReactNode;
    imageConfig: {
        imageUrl: string;
        position: {
            top?: number;
            right?: number;
            bottom?: number;
        };
    };
    onClick?: () => void;
}

export function ActionTip({
    title,
    onClick,
    btnTitle,
    imageConfig,
}: ActionTipProps) {
    return (
        <StyledActionTip {...imageConfig.position} {...itemAnimationSettings}>
            <div className="content-action-tip-wrapper">
                <h2>{title}</h2>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img src={imageConfig.imageUrl} alt="Tip image" />
            </div>
            <div className="footer-action-tip-wrapper">
                <Button
                    arrowRight
                    onClick={onClick}
                    type="button"
                    className="normal"
                    withAnimate
                    disabled={!onClick}
                    isDisabledWithActiveText
                >
                    {btnTitle}
                </Button>
            </div>
        </StyledActionTip>
    );
}
