import { hourglass } from '@breef/shared/assets';
import React from 'react';
import { StyledEmptyPage } from './EmptyPage.styled';

type Props = {
    title: string;
    text: string;
    image: 'hourglass' | '';
};

const EmptyPage: React.FC<Props> = ({ title, text, image }) => {
    const imageSrc = image === 'hourglass' ? hourglass.src : '';
    return (
        <StyledEmptyPage data-testid="empty-page">
            <div className="empty">
                <img className="empty-image" src={imageSrc} alt="hourglass" />
                <h2 className="empty-title">{title || ''}</h2>
                <p className="empty-text">{text || ''}</p>
            </div>
        </StyledEmptyPage>
    );
};
export default EmptyPage;
