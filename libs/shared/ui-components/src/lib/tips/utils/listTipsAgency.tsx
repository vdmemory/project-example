import { TipType } from './types';

const TipsDescAgency = {
    agencySelection: `Selecting a team begins the ‘home stretch.’ \n\nFrom here, you’ll work with the team to finalize timing, contracts + payments. \n\nNothing is ‘official’ until both sides agree.`,
};

const TipsTitleAgency = {
    default: 'Quick tip:',
    agencySelection: 'WHAT HAPPENS NEXT?',
};

const defaultTip = {
    title: '',
    description: '',
};

export const getTipAgency = (step: number): TipType | TipType[] => {
    switch (step) {
        case 1:
            return {
                title: TipsTitleAgency.agencySelection,
                description: TipsDescAgency.agencySelection,
            };

        default:
            return defaultTip;
    }
};
