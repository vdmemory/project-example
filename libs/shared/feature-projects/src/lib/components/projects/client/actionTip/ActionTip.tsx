import { StyledActionTip } from './ActionTip.styled';
import { ReactNode } from 'react';
import { itemAnimationSettings } from '@breef/shared/utils';
import { Card } from '../card/Card';
import { ArrowRightIcon, Button } from '@breef/ui-kit';
import { Tag } from '../tag/Tag';
import { AccessDeniedButton } from '@breef/shared/ui-components';

interface ActionTipProps {
    title: string;
    tag: string;
    description: string;
    btnTitle: string | ReactNode;
    onClick?: () => void;
    isAccessDenied?: boolean;
}

const MAX_CHARACTERS = 24;

export function ActionTip({
    title,
    onClick,
    tag,
    description,
    btnTitle,
    isAccessDenied,
}: ActionTipProps) {
    const isMoreOneLine = title.length > MAX_CHARACTERS;

    const renderButton = () => {
        if (isAccessDenied) {
            return (
                <AccessDeniedButton
                    message="
        Payment functionality is not enabled for your type of user. Please reach out to your company owner."
                >
                    <Button
                        isDisabled={isAccessDenied}
                        icon={<ArrowRightIcon />}
                        className="action-button"
                        variant="primary"
                        label={btnTitle}
                        onClick={onClick}
                        iconPlacement="right"
                    />
                </AccessDeniedButton>
            );
        }

        return (
            <Button
                isDisabled={!onClick}
                icon={<ArrowRightIcon />}
                className="action-button"
                variant="primary"
                label={btnTitle}
                onClick={onClick}
                iconPlacement="right"
            />
        );
    };

    return (
        <StyledActionTip
            {...itemAnimationSettings}
            isMoreOneLine={isMoreOneLine}
        >
            <Card label="NEXT STEP" renderFooter={renderButton()}>
                <ActionTipContent
                    title={title}
                    tag={tag}
                    description={description}
                />
            </Card>
        </StyledActionTip>
    );
}

const ActionTipContent = ({
    tag,
    title,
    description,
}: {
    tag: string;
    title: string;
    description: string;
}) => {
    return (
        <div className="action-tip">
            {tag && <Tag value={tag} />}
            <h2 className="title">{title}</h2>
            <div className="description">{description}</div>
        </div>
    );
};
