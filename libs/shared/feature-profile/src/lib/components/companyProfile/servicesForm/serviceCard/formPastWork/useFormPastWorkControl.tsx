import { useController, useForm } from 'react-hook-form';
import { FileType, PastWorkFormType } from '@breef/shared/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { pastWorkSchema } from '../../../../../utils/validation-forms/pastWorkSchema';

const defaultValuesPastWorkFrom: PastWorkFormType = {
    clientName: '',
    clientWebsite: '',
    projectName: '',
    startDateMonth: '',
    startDateYear: '',
    projectDescription: '',
    clientTestimonial: '',
    linkUrl: '',
    documents: [],
};

export const useFormPastWorkControl = (preValue?: PastWorkFormType | null) => {
    const {
        formState: { isValid, errors },
        control,
        getValues,
        trigger,
    } = useForm<PastWorkFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: preValue ?? defaultValuesPastWorkFrom,
        resolver: yupResolver(pastWorkSchema),
    });

    const { field: fieldClientName, fieldState: fieldClientNameState } =
        useController({ control, name: 'clientName' });
    const { field: fieldClientWebsite, fieldState: fieldClientWebsiteState } =
        useController({ control, name: 'clientWebsite' });
    const { field: fieldProjectName, fieldState: fieldProjectNameState } =
        useController({ control, name: 'projectName' });
    const { field: fieldStartDateMonth, fieldState: fieldStartDateMonthState } =
        useController({ control, name: 'startDateMonth' });
    const { field: fieldStartDateYear, fieldState: fieldStartDateYearState } =
        useController({ control, name: 'startDateYear' });
    const {
        field: fieldProjectDescription,
        fieldState: fieldProjectDescriptionState,
    } = useController({ control, name: 'projectDescription' });
    const {
        field: fieldClientTestimonial,
        fieldState: fieldClientTestimonialState,
    } = useController({ control, name: 'clientTestimonial' });
    const { field: fieldLink, fieldState: fieldLinkState } = useController({
        control,
        name: 'linkUrl',
    });
    const { field: fieldDocuments, fieldState: fieldDocumentsState } =
        useController({ control, name: 'documents' });

    return {
        isValidForm: isValid,
        getValues,
        trigger,
        fieldClientName: {
            ...fieldClientName,
            ...fieldClientNameState,
        },
        fieldClientWebsite: {
            ...fieldClientWebsite,
            ...fieldClientWebsiteState,
        },
        fieldProjectName: {
            ...fieldProjectName,
            ...fieldProjectNameState,
        },
        fieldStartDateMonth: {
            ...fieldStartDateMonth,
            ...fieldStartDateMonthState,
        },
        fieldStartDateYear: {
            ...fieldStartDateYear,
            ...fieldStartDateYearState,
        },
        fieldProjectDescription: {
            ...fieldProjectDescription,
            ...fieldProjectDescriptionState,
        },
        fieldClientTestimonial: {
            ...fieldClientTestimonial,
            ...fieldClientTestimonialState,
        },
        fieldLink: {
            ...fieldLink,
            ...fieldLinkState,
        },
        fieldDocuments: {
            ...fieldDocuments,
            ...fieldDocumentsState,
        },
    };
};
