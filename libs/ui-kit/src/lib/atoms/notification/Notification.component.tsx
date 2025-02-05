import React from 'react';
import { StyledNotification } from './Notification.styled';
import { SentimentType } from '@breef/shared/types';
import { InfoIcon } from '../../icons';

type NotificationProps = {
    text: string | React.ReactNode;
    size?: 'medium' | 'small';
    sentiment: SentimentType;
};

export const Notification: React.FC<NotificationProps> = ({
    text,
    size = 'medium',
    sentiment,
}) => {
    return (
        <StyledNotification
            sentiment={sentiment}
            className={`notification notification-${size}`}
        >
            <InfoIcon />
            {text}
        </StyledNotification>
    );
};
