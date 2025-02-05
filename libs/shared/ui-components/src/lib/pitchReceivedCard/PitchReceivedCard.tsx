import { handPointerImage } from '@breef/shared/assets';
import { PitchProjectStatuses, ProjectStatuses } from '@breef/shared/constants';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import CardView from './CardView';
import { StyledPitchReceivedCard } from './PitchReceivedCard.styled';
import { AppAccessType } from '@breef/shared/types';

type Props = {
    logo?: string;
    companyName?: string;
    companyLocation?: string;
    rowCount: number;
    param?: number | string | null;
    handleClick?: (param?: number | string) => void;
    isShowVerticalArrow?: boolean;
    type?: AppAccessType;
    pitchesCount: number;
    status: PitchProjectStatuses;
    id?: number | string;
    projectStatus: ProjectStatuses;
    isMobile?: boolean;
    reviewDesign: string | null;
    pitchesUnreviewedLength: number;
    isHideHoverCard: boolean;
};

const PitchReceivedCard: React.FC<Props> = ({
    companyLocation = '',
    companyName = '',
    logo,
    rowCount,
    handleClick,
    param,
    isShowVerticalArrow,
    type,
    pitchesCount,
    status,
    id,
    projectStatus,
    isMobile = false,
    reviewDesign,
    pitchesUnreviewedLength,
    isHideHoverCard,
}) => {
    const [isMouseHover, setIsMouseHover] = useState(false);
    const handleClickCard = () => {
        if (handleClick) {
            param ? handleClick(param) : handleClick(id || '');
        }
    };
    return (
        <StyledPitchReceivedCard
            rowCount={rowCount}
            onMouseEnter={() => (isMobile ? undefined : setIsMouseHover(true))}
            onMouseLeave={() => (isMobile ? undefined : setIsMouseHover(false))}
            onClick={() => (isMobile ? handleClickCard() : undefined)}
        >
            {logo && (
                <div className="card-img">
                    <img src={logo} alt="logo pitch" />
                </div>
            )}
            {companyName && (
                <div className="card-item">
                    <h2 title={companyName} className="card-item--title">
                        {companyName}
                    </h2>
                    <p className="card-item--location">{companyLocation}</p>
                </div>
            )}

            {isShowVerticalArrow && !companyName && (
                <div className="card-item--empty">
                    <img src={handPointerImage.src} alt="Pointer" />
                </div>
            )}

            {handleClick && !isHideHoverCard && (
                <AnimatePresence>
                    {isMouseHover && companyName && (
                        <CardView
                            handleClick={handleClickCard}
                            type={type}
                            pitchesCount={pitchesCount}
                            projectStatus={projectStatus}
                            status={status}
                            reviewDesign={reviewDesign}
                            pitchesUnreviewedLength={pitchesUnreviewedLength}
                        />
                    )}
                </AnimatePresence>
            )}
        </StyledPitchReceivedCard>
    );
};

export default PitchReceivedCard;
