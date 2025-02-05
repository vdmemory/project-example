import { dollarColoredImage, starImage } from '@breef/shared/assets';
import { use, useEffect, useState } from 'react';
import BackButton from '../backButton/BackButton';
import { StyledChoiceMethod } from './ChoiceMethod.styled';
import ButtonChoice from './ButtonChoice';
import { LipsLoader, Spinner } from '@breef/shared/ui-components';
import { AccountsType, useCollectStripeFCA } from '@breef/shared/hooks';

interface ChoiceMethodProps {
    title: string;
    handleClickBack?: () => void;
    handleClickNext?: () => void;
    handleAddBank: (accounts: AccountsType[]) => void;
    hideBackButton?: boolean;
    isLoading?: boolean;
}

export const ChoiceMethod = ({
    title,
    handleClickBack,
    handleClickNext,
    handleAddBank,
    hideBackButton,
    isLoading = false,
}: ChoiceMethodProps) => {
    const CREDIT = 'credit';
    const BANK = 'bank';
    const DELAY = 500;

    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [isStartCollectStripeFCA, setIsStartCollectStripeFCA] =
        useState(false);
    const { collect, accounts, isLoadingFCSession } = useCollectStripeFCA();

    useEffect(() => {
        if (!accounts.length) return;
        handleAddBank(accounts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accounts]);

    const handleClick = (key: string) => {
        if (isStartCollectStripeFCA) return;
        if (key === BANK) {
            setIsStartCollectStripeFCA(true);
            setActiveItem(BANK);
            setTimeout(() => {
                collect();
            }, DELAY);
        }
        if (key === CREDIT) {
            setActiveItem(CREDIT);
            setTimeout(() => {
                handleClickNext && handleClickNext();
            }, DELAY);
        }
    };

    useEffect(() => {
        if (isStartCollectStripeFCA && isLoadingFCSession) return;
        setIsStartCollectStripeFCA(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingFCSession]);

    const renderButtons = () => {
        return (
            <>
                <ButtonChoice
                    handleClick={() => handleClick(CREDIT)}
                    src={dollarColoredImage}
                    title={'Credit\ncard'}
                    desc={' Breef accepts major credit +\ndebit cards.'}
                    className={'credit'}
                    classIcon={'dollar'}
                    activeItem={activeItem === CREDIT}
                />
                <ButtonChoice
                    handleClick={() => handleClick(BANK)}
                    src={starImage}
                    title={'bank\naccount'}
                    desc={'Connect your bank  to click + pay.'}
                    className={'bank'}
                    classIcon={'star'}
                    activeItem={activeItem === BANK}
                />
            </>
        );
    };

    const renderLoader = () => {
        return <LipsLoader />;
    };

    return (
        <StyledChoiceMethod>
            {handleClickBack && !hideBackButton && (
                <BackButton onClick={handleClickBack} />
            )}
            <h3 className="choice-title">{title}</h3>
            <div className="group-card-buttons">
                {isLoading ? renderLoader() : renderButtons()}
            </div>
        </StyledChoiceMethod>
    );
};

export default ChoiceMethod;
