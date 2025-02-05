import { CardCheckIcon } from '@breef/shared/assets';
import { StaticImageData } from 'next/image';

interface ButtonChoiceProps {
    handleClick?: () => void;
    src: StaticImageData;
    title: string;
    desc?: string;
    className?: string;
    classIcon?: string;
    activeItem: boolean;
}

export const ButtonChoice = ({
    handleClick,
    src,
    title,
    desc,
    className = '',
    classIcon = '',
    activeItem,
}: ButtonChoiceProps) => {
    return (
        <div onClick={handleClick} className={`card-button ${className}`}>
            <img
                className={`${classIcon}-icon`}
                src={src.src}
                alt={`icon-${classIcon}`}
            />
            <h4 className="card-title">{title}</h4>
            {desc && <p className="card-description">{desc}</p>}
            <CardCheckIcon
                className={`bank-item-check ${activeItem ? 'active' : ''}`}
            />
        </div>
    );
};

export default ButtonChoice;
