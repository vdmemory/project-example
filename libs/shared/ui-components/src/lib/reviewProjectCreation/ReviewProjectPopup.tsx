import { FC, useState } from 'react';
import { Popup, getDefaultStylesPopupPreset } from '../popup/Popup';
import { useMediaContext } from '@breef/shared/hooks';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';
import {
    ProjectReviewType,
    ReviewProjectCreation,
    ReviewProjectCreationProps,
} from './ReviewProjectCreation';

interface ReviewProjectPopupProps {
    close: () => void;
    projectData?: ProjectReviewType | null;
}

export const ReviewProjectPopup: FC<ReviewProjectPopupProps> = ({
    close,
    projectData,
}) => {
    const { isMobile } = useMediaContext();

    if (!projectData) {
        return <div>Loading...</div>;
    }

    return (
        <Popup
            close={close}
            style={getDefaultStylesPopupPreset(
                isMobile,
                window.innerHeight + 'px',
            )}
            styleCss={tooltipPopupStyleCssPreset}
        >
            <ReviewProjectCreation data={projectData} />
        </Popup>
    );
};

export const tooltipPopupStyleCssPreset = css`
    backdrop-filter: blur(20px);
    padding: 0 !important;

    .review-scope {
        max-width: 100%;
        width: 100%;
        min-height: 100%;
        padding-top: 50px;
    }
`;
