import { useEffect, useState } from 'react';
import { getTipAgency } from '../utils/listTipsAgency';
import {
    getTipPitchProfile,
    getTipPitchBudget,
    getTipPitchProject,
} from '../utils/listTipsPitch';
import {
    getTipProjectInfoNotes,
    getTipProjectOverview,
    getTipProjectPhase,
} from '../utils/listTipsProject';
import { TipsTypeKeys, TipType } from '../utils/types';

type TipHandlersType = {
    [key in TipsTypeKeys]: (step: number) => TipType | TipType[];
};

const tipHandlers: TipHandlersType = {
    projectOverview: getTipProjectOverview,
    projectPhase: getTipProjectPhase,
    projectInfoNotes: getTipProjectInfoNotes,
    pitchProfile: getTipPitchProfile,
    pitchBudget: getTipPitchBudget,
    pitchProject: getTipPitchProject,
    agencySelection: getTipAgency,
};

export const useGetTip = (step: number, type: TipsTypeKeys) => {
    const [tip, setTip] = useState<TipType | TipType[]>({
        title: '',
        description: '',
    });

    useEffect(() => {
        const tipHandler = tipHandlers[type];
        if (tipHandler) {
            setTip(tipHandler(step));
        }
    }, [step, type]);

    return tip;
};
