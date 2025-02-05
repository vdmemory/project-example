import { Button, Close16x16Icon } from '@breef/ui-kit';
import { useMediaContext } from '@breef/shared/hooks';
import {
    StartProjectPopupStyled,
    getPopupStylePreset,
} from './StartProjectPopup.styled';
import { startProjectPopupImage } from '@breef/shared/assets';
import { Popup } from '../Popup';
import { TipType } from '@breef/shared/types';

interface StartProjectPopupProps {
    onClick: () => void;
    close: () => void;
    tipsConfig: TipType[];
    title: string;
    subtitle: string;
}

export const StartProjectPopup = ({
    onClick,
    close,
    tipsConfig,
    title,
    subtitle,
}: StartProjectPopupProps) => {
    const { isMobile } = useMediaContext();

    const renderTip = (item: TipType, idx: number) => (
        <div key={item.title} className="step-tip">
            <div className="step">
                <span>{idx + 1}</span>
            </div>
            <div className="tip-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
            </div>
        </div>
    );

    return (
        <Popup key="start-project-popup" style={getPopupStylePreset(isMobile)}>
            <StartProjectPopupStyled>
                <div className="left-section">
                    <img src={startProjectPopupImage.src} alt="Start Project" />
                </div>
                <div className="right-section">
                    <h3 className="title">{title}</h3>
                    <p className="subtitle">{subtitle}</p>
                    <div className="divider" />
                    <span className="next-steps-title">Next steps</span>
                    <div className="step-tips-wrapper">
                        {tipsConfig.map(renderTip)}
                    </div>
                    <Button
                        label="Next"
                        onClick={onClick}
                        className="next-button"
                    />
                </div>
                <button className="close-button" onClick={close}>
                    <Close16x16Icon />
                </button>
            </StartProjectPopupStyled>
        </Popup>
    );
};
