/* eslint-disable-next-line */
import { StyledSuccess } from './Success.styled';
import { cloud_img } from '@breef/shared/assets';
import { ReactNode, useEffect } from 'react';
import { removeStorageData } from '@breef/shared/utils';

export function Success({
    text = 'We’ve sent the sign in link to your inbox :)',
    subtext = 'Click on the link we sent to login.',
    isShowImage = true,
    children,
}: {
    text?: string;
    subtext?: string;
    isShowImage?: boolean;
    children?: ReactNode;
}) {
    useEffect(
        () => () => {
            removeStorageData('local', 'role');
        },
        [],
    );

    return (
        <StyledSuccess className="successScreen" duration={0.25}>
            {isShowImage && (
                <div className="success-image-wrapper">
                    <img src={cloud_img.src} alt="" />
                </div>
            )}
            <span className="main-text">{text}</span>
            <span className="note">{subtext}</span>
            {children}
        </StyledSuccess>
    );
}
