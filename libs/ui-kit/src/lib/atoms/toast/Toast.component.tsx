import { StyledToast } from './Toast.styled';
import { FC, useEffect, useRef } from 'react';
import { ChevronIcon, CloseIcon } from '../../icons';
import { CustomToastProps } from '@breef/shared/types';

export const Toast: FC<CustomToastProps> = ({
    title,
    content,
    icon,
    linkText,
    linkUrl,
    sentiment = 'neutral',
    autoClose = 5000,
    closeToast,
}) => {
    const refProgress = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const progressElem = refProgress.current;
        if (progressElem && closeToast) {
            progressElem.addEventListener('animationend', closeToast);
            return () =>
                progressElem.removeEventListener('animationend', closeToast);
        }
        //eslint-disable-next-line
    }, []);

    return (
        <StyledToast sentiment={sentiment} autoClose={autoClose}>
            {!!icon && <div className="icon-notify-wrapper">{icon}</div>}
            <div className="content-wrapper">
                {!!title && <h3>{title}</h3>}
                {!!content && <p>{content}</p>}
                {!!linkText && !!linkUrl && (
                    <a href={linkUrl} target="_blank" rel="noreferrer">
                        <ChevronIcon />
                        <span>{linkText}</span>
                        <ChevronIcon />
                    </a>
                )}
            </div>
            <button
                data-testid="button-close"
                className="button-close"
                onClick={closeToast}
            >
                <CloseIcon />
            </button>
            {!!autoClose && (
                <div className="progress-bar" ref={refProgress}>
                    <span />
                </div>
            )}
        </StyledToast>
    );
};

export default Toast;
