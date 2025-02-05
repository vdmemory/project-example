import {
    AditiName,
    AditiPhotoCard,
    AlanaName,
    AlanaPhotoCard,
    CheckBlackIcon,
    EmilyName,
    EmilyPhotoCard,
} from '@breef/shared/assets';
import { PositionTypes } from '@breef/shared/types';
import FloatingElement from './FloatingElement';
import { StyledMarketingStrategistsScreen } from './MarketingStrategistsScreen.styled';

interface MarketingStrategistsScreenProps {
    label: string;
    list: string[];
    desktopMarketingScreen: PositionTypes[];
    mobileMarketingScreen: PositionTypes[];
}

export const MarketingStrategistsScreen = ({
    label,
    list,
    desktopMarketingScreen,
    mobileMarketingScreen,
}: MarketingStrategistsScreenProps) => {
    const elementsScreen = [
        <img
            className="photo-card"
            src={AditiPhotoCard.src}
            alt="Aditi Card"
            key="Aditi Card"
        />,
        <img className="name" src={AditiName.src} alt="Aditi Name" />,
        <img
            className="photo-card"
            src={AlanaPhotoCard.src}
            alt="Alana Card"
            key="Alana Card"
        />,
        <img
            className="name"
            src={AlanaName.src}
            alt="Alana Name"
            key="Alana Name"
        />,
        <img
            className="photo-card photo-emily"
            src={EmilyPhotoCard.src}
            alt="Emily Card"
            key="Emily Card"
        />,
        <img
            className="name"
            src={EmilyName.src}
            alt="Emily Name"
            key="Emily Name"
        />,
    ];

    return (
        <StyledMarketingStrategistsScreen className="marketing-strategy-screen">
            <div>
                {elementsScreen.map((element, index) => {
                    return (
                        <FloatingElement
                            key={`float-marketing-strategists-${element.key}`}
                            desktopStyle={desktopMarketingScreen[index]}
                            mobileStyle={mobileMarketingScreen[index]}
                        >
                            {element}
                        </FloatingElement>
                    );
                })}
            </div>
            <div>
                <div className="list-label">{label}</div>
                <ul className="list">
                    {list.map((item, index) => (
                        <li key={`list-text-${index}`} className="list-item">
                            <CheckBlackIcon className="list-item-icon" />
                            <div className="list-item-text">{item}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </StyledMarketingStrategistsScreen>
    );
};

export default MarketingStrategistsScreen;
