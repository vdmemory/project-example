import {
    getTipOfDayNext,
    getTipOfDayRandom,
    TipOfDayType,
} from './getTipOfDay';

describe('getTipOfDayNext', () => {
    const tips: TipOfDayType[] = [
        {
            id: 1,
            header: 'Tip 1',
            copy: 'Copy 1',
            signOff: 'SignOff 1',
            isEmoji: false,
        },
        {
            id: 2,
            header: 'Tip 2',
            copy: 'Copy 2',
            signOff: 'SignOff 2',
            isEmoji: false,
        },
        {
            id: 3,
            header: 'Tip 3',
            copy: 'Copy 3',
            signOff: 'SignOff 3',
            isEmoji: false,
        },
    ];

    it('should return the next tip in the list', () => {
        const nextTip = getTipOfDayNext('1', tips);
        expect(nextTip).toEqual(tips[1]);
    });

    it('should return the first tip if the current tip is the last one', () => {
        const nextTip = getTipOfDayNext('3', tips);
        expect(nextTip).toEqual(tips[0]);
    });

    it('should return the correct tip for a middle index', () => {
        const nextTip = getTipOfDayNext('2', tips);
        expect(nextTip).toEqual(tips[2]);
    });
});

describe('getTipOfDayRandom', () => {
    const tips: TipOfDayType[] = [
        {
            id: 1,
            header: 'Tip 1',
            copy: 'Copy 1',
            signOff: 'SignOff 1',
            isEmoji: false,
        },
        {
            id: 2,
            header: 'Tip 2',
            copy: 'Copy 2',
            signOff: 'SignOff 2',
            isEmoji: false,
        },
        {
            id: 3,
            header: 'Tip 3',
            copy: 'Copy 3',
            signOff: 'SignOff 3',
            isEmoji: false,
        },
    ];

    it('should return a tip from the list', () => {
        const randomTip = getTipOfDayRandom(tips);
        expect(tips).toContain(randomTip);
    });

    it('should return undefined if the tips list is empty', () => {
        const randomTip = getTipOfDayRandom([]);
        expect(randomTip).toBeUndefined();
    });

    it('should return the same tip if there is only one tip', () => {
        const singleTip = [
            {
                id: 1,
                header: 'Tip 1',
                copy: 'Copy 1',
                signOff: 'SignOff 1',
                isEmoji: false,
            },
        ];
        const randomTip = getTipOfDayRandom(singleTip);
        expect(randomTip).toEqual(singleTip[0]);
    });
});
