import { UseFormReturn } from 'react-hook-form';
import {
    AdditionalLinksType,
    AttachmentType,
    CompanyInfoMergedResponseType,
    ObjectImageType,
    PreviousWorkType,
    ProjectFitItemType,
    TransformAccountInfoResponseType,
} from '@breef/shared/types';

export type PitchCreateFormType = PitchCreateOurAgencyFormType &
    PitchCreateYourPitchFormType &
    PitchCreatePortfolioFormType &
    PitchCreateProjectFitFormType;

export type PitchCreateOurAgencyFormType = {
    aboutUs: string;
    logo: ObjectImageType | null;
    tagline: string;
    website: string;
    portfolio: string;
    instagram: string;
};

export type PitchCreatePortfolioFormType = {
    previousWork: PreviousWorkType[];
    additionalLinks: AdditionalLinksType[];
    attachments: AttachmentType[];
};

export type PitchCreateProjectFitFormType = {
    projectScope: string;
    experience: string;
    clientFit: string;
    noteToBreef: string;
};

export type PitchCreateYourPitchFormType = {
    pitchDetails: string;
    approach: {
        description: string;
        links: { link: string; title: string }[];
    };
    budget: ProjectFitItemType;
    uniqueThings: { id: number; name: string }[];
};

export type PitchCreateSliceType = {
    step: number;
    companyInfo: CompanyInfoMergedResponseType | null;
    accountInfo: TransformAccountInfoResponseType | null;
    isPenMode: boolean;
    targetElementId: string | null;
    isDisabledSubmit: boolean;
    isSubmittingNext: boolean;
    isSubmittingSaveExit: boolean;
};

export type MethodsPitchCreateType = {
    ourAgency: UseFormReturn<PitchCreateOurAgencyFormType>;
    portfolio: UseFormReturn<PitchCreatePortfolioFormType>;
    projectFit: UseFormReturn<PitchCreateProjectFitFormType>;
    yourPitch: UseFormReturn<PitchCreateYourPitchFormType>;
};
