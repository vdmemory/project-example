import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import {
    MethodsPitchCreateType,
    PitchCreateOurAgencyFormType,
    PitchCreatePortfolioFormType,
    PitchCreateProjectFitFormType,
} from '../types/pitchCreateType';
import { pitchCreateOurAgencySchema } from '../utils/pitchCreateOurAgencySchema';
import { pitchCreatePortfolioSchema } from '../utils/pitchCreatePortfolioSchema';
import { pitchCreateProjectFitSchema } from '../utils/pitchCreateProjectFitSchema';
import { pitchCreateYourPitchSchema } from '../utils/pitchCreateYourPitchSchema';
import { PitchCreateYourPitchFormType } from '../types/pitchCreateType';
import { PitchMergedResponseType } from '@breef/shared/types';
import { usePitchCreateSelector } from '../store/hooks';
import { projectFitItemInitValues } from '@breef/shared/constants';

export const additionalLinksInitValues = {
    name: '',
    link: '',
};

interface UsePitchCreateFormControlProps {
    pitchData?: PitchMergedResponseType;
}
export const usePitchCreateFormControl = ({
    pitchData,
}: UsePitchCreateFormControlProps) => {
    const [isReady, setIsReady] = useState(false);
    const { companyInfo } = usePitchCreateSelector(state => state).pitchCreate;

    const profileCompanyLogo =
        companyInfo?.logoUrl && companyInfo?.logo
            ? {
                  id: companyInfo.logo,
                  url: companyInfo.logoUrl,
              }
            : null;

    const defaultValuesOurAgency: PitchCreateOurAgencyFormType = {
        aboutUs: pitchData?.aboutUs ?? companyInfo?.companyOverview ?? '',
        logo: pitchData?.logo ?? profileCompanyLogo ?? null,
        tagline: pitchData?.tagline ?? companyInfo?.tagline ?? '',
        website: pitchData?.website ?? '',
        portfolio: pitchData?.portfolio ?? '',
        instagram: pitchData?.instagram ?? companyInfo?.instagram ?? '',
    };

    const defaultValuesYourPitch: PitchCreateYourPitchFormType = {
        pitchDetails: pitchData?.pitchDetails ?? '',
        approach: {
            description: pitchData?.approach?.description ?? '',
            links: pitchData?.approach?.links ?? [],
        },
        budget: pitchData?.budget ?? projectFitItemInitValues,
        uniqueThings: pitchData?.uniqueThings?.length
            ? pitchData?.uniqueThings
            : [],
    };

    const defaultValuesPortfolio: PitchCreatePortfolioFormType = {
        previousWork: pitchData?.previousWork ?? [],
        additionalLinks: pitchData?.additionalLinks?.length
            ? pitchData?.additionalLinks
            : [],
        attachments: pitchData?.attachments?.length
            ? pitchData?.attachments
            : [],
    };

    const defaultValuesProjectFit: PitchCreateProjectFitFormType = {
        projectScope: pitchData?.projectScope ?? '',
        experience: pitchData?.experience ?? '',
        clientFit: pitchData?.clientFit ?? '',
        noteToBreef: pitchData?.noteToBreef ?? '',
    };

    const methodsOurAgency = useForm<PitchCreateOurAgencyFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValuesOurAgency,
        resolver: yupResolver(pitchCreateOurAgencySchema),
    });

    const methodsYourPitch = useForm<PitchCreateYourPitchFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValuesYourPitch,
        resolver: yupResolver(pitchCreateYourPitchSchema),
    });

    const methodsPortfolio = useForm<PitchCreatePortfolioFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValuesPortfolio,
        resolver: yupResolver(pitchCreatePortfolioSchema),
    });

    const methodsProjectFit = useForm<PitchCreateProjectFitFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: defaultValuesProjectFit,
        resolver: yupResolver(pitchCreateProjectFitSchema),
    });

    const validationSteps = [
        !methodsOurAgency.formState.isValid,
        !methodsYourPitch.formState.isValid,
        !methodsPortfolio.formState.isValid,
        !methodsProjectFit.formState.isValid,
    ];

    const methods: MethodsPitchCreateType = {
        ourAgency: methodsOurAgency,
        yourPitch: methodsYourPitch,
        portfolio: methodsPortfolio,
        projectFit: methodsProjectFit,
    };

    const initFormValidation = async () => {
        await Promise.all([
            methods.ourAgency.trigger(),
            methods.yourPitch.trigger(),
            methods.portfolio.trigger(),
            methods.projectFit.trigger(),
        ]);
        Object.values(methods).forEach(form => form.clearErrors());
        setIsReady(true);
    };

    useEffect(() => {
        initFormValidation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        methods,
        validationSteps,
        isReady,
    };
};
