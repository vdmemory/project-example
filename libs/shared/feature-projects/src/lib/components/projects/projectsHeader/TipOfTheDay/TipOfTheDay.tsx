import { StyledTipOfTheDay } from './TipOfTheDay.styled';
import { itemAnimationSettings } from '@breef/shared/utils';
import { useEffect, useState } from 'react';
import {
    getTipOfDayRandom,
    TipOfDayType,
    tipsOfDayAgency,
    tipsOfDayClient,
} from '../../../../utils/getTipOfDay';

export function TipOfTheDay({ userType }: { userType: string }) {
    const [tipCurrent, setTipCurrent] = useState<TipOfDayType | null>(null);

    useEffect(() => {
        if (userType === 'client') {
            setTipCurrent(getTipOfDayRandom(tipsOfDayClient));
        }
        if (userType === 'agency') {
            setTipCurrent(getTipOfDayRandom(tipsOfDayAgency));
        }
    }, [userType]);

    return (
        <StyledTipOfTheDay {...itemAnimationSettings}>
            <div id={String(tipCurrent?.id)} className="tip-of-the-day-wrapper">
                <span className="label-tip-of-the-day">
                    {tipCurrent?.header}
                </span>
                <span className="text-tip-of-the-day">{tipCurrent?.copy}</span>
                <span className="sign-off-tips-of-the-day">
                    {tipCurrent?.isEmoji ? (
                        <span>{tipCurrent?.signOff}</span>
                    ) : (
                        tipCurrent?.signOff
                    )}
                </span>
            </div>
        </StyledTipOfTheDay>
    );
}
