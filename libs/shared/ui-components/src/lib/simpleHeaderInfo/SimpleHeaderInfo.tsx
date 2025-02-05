import { StyledSimpleHeaderInfo } from './SimpleHeaderInfo.styled';
import { ReactNode } from 'react';
import { card_bg_8 } from '@breef/shared/assets';

type HeaderInfoProps = {
    title: string;
    children?: ReactNode;
    backgroundImageUrl?: string;
};

const SimpleHeaderInfo: React.FC<HeaderInfoProps> = ({
    title,
    children,
    backgroundImageUrl = card_bg_8.src,
}) => {
    return (
        <StyledSimpleHeaderInfo backgroundImageUrl={backgroundImageUrl}>
            <div className="header-info-wrapper">
                <h1>{title}</h1>
                {children}
            </div>
        </StyledSimpleHeaderInfo>
    );
};
export default SimpleHeaderInfo;
