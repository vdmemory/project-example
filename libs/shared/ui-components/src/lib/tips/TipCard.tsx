import { BreefAvatar, DownloadIcon } from '@breef/shared/assets';
import { Fragment } from 'react';
import { StyledTipCard } from './TipCard.styled';
import { TipType } from './utils/types';
import Spinner from '../spinner/Spinner';
import { AvatarImage } from '@breef/ui-kit';

interface TipCardProps {
    tip: TipType | TipType[];
    className?: string;
    logoUrl?: string | null;
    leadFirstName?: string;
    leadLastName?: string;
    handleDownloadFile?: () => void;
    isLoadingDownload?: boolean;
    hideAuthor?: boolean;
}

export const TipCard = ({
    tip,
    className,
    logoUrl = BreefAvatar.src,
    leadFirstName = 'Breef',
    leadLastName = 'Team',
    handleDownloadFile,
    isLoadingDownload = false,
    hideAuthor = false,
}: TipCardProps) => {
    const tips = Array.isArray(tip) ? tip : [tip];
    const isSingleTip = tips.length === 1;

    const renderDownloadBlock = () => (
        <p className="download ">
            {isLoadingDownload ? (
                <Spinner className="loader" />
            ) : (
                <DownloadIcon
                    className="download-icon"
                    onClick={handleDownloadFile}
                />
            )}
            Download Breef's Pitch Guide here!
        </p>
    );

    const renderAuthor = () => (
        <div className={`author ${isSingleTip ? 'fixed' : ''}`}>
            {handleDownloadFile && renderDownloadBlock()}
            <div className="lead-name">
                {logoUrl && (
                    <AvatarImage
                        className="logo"
                        src={logoUrl}
                        alt="Avatar"
                        width={70}
                        height={70}
                    />
                )}
                {`${leadFirstName} ${leadLastName}`}
            </div>
        </div>
    );
    const renderTipContent = () => (
        <div className="text-group">
            {tips.map(tip => (
                <Fragment key={tip.title}>
                    <div className="title-card">{tip.title}</div>
                    <div className="description">{tip.description}</div>
                </Fragment>
            ))}
            {!isSingleTip && !hideAuthor && renderAuthor()}
        </div>
    );
    return (
        <StyledTipCard
            className={className ? `${className} tip-card` : `tip-card`}
        >
            {renderTipContent()}
            {isSingleTip && !hideAuthor && (
                <div className="author-wrapper">{renderAuthor()}</div>
            )}
        </StyledTipCard>
    );
};

export default TipCard;
export { useGetTip } from './hook/useGetTip';
export { TipsTypeKeys } from './utils/types';
