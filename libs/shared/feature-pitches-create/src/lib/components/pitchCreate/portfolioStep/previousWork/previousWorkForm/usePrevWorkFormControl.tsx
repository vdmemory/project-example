import { useDocumentController, useSaveDocument } from '@breef/shared/hooks';
import { ListType, PreviousWorkType } from '@breef/shared/types';
import {
    getMaxLengthMessage,
    getRequiredMessage,
    getUrlMessage,
    getUrlPattern,
} from '@breef/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import {
    ChangeHandler,
    useController,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import * as yup from 'yup';

const getDefaultPreviousWork = (id: number): PreviousWorkType => {
    return {
        id,
        clientName: '',
        projectName: '',
        website: '',
        description: '',
        projectLinks: [],
        documents: [],
    };
};

export const projectLinksInitValues = {
    title: '',
    link: '',
};

const urlPattern = getUrlPattern();

const linkSchema = yup
    .string()
    .matches(urlPattern, getUrlMessage('Link'))
    .max(1992)
    .nullable()
    .transform(value => (value ? value : null));

const prevWorkFormSchema = yup.object().shape({
    clientName: yup
        .string()
        .required(getRequiredMessage('Client Name'))
        .min(1, getRequiredMessage('Client Name'))
        .max(255, getMaxLengthMessage('Client Name', 255)),
    projectName: yup
        .string()
        .required(getRequiredMessage('Project Name'))
        .min(1, getRequiredMessage('Project Name'))
        .max(255, getMaxLengthMessage('Project Name', 255)),
    website: linkSchema,
    description: yup
        .string()
        .max(2000, getMaxLengthMessage('Client Name', 2000)),
    projectLinks: yup.array().max(3),
    documents: yup.array().max(3),
});

export const usePrevWorkFormControl = ({
    formData,
    onClick,
}: {
    formData?: PreviousWorkType;
    onClick?: (form: PreviousWorkType) => void;
}) => {
    const { getValues, trigger, reset, control } = useForm<PreviousWorkType>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: formData || getDefaultPreviousWork(Date.now()),
        resolver: yupResolver(prevWorkFormSchema),
    });

    const {
        field: fieldClientName,
        fieldState: { error: errorClientName },
    } = useController({
        control,
        name: 'clientName',
    });

    const {
        field: fieldProjectName,
        fieldState: { error: errorProjectName },
    } = useController({
        control,
        name: 'projectName',
    });

    const {
        field: fieldWebsite,
        fieldState: { error: errorWebsite },
    } = useController({
        control,
        name: 'website',
    });

    const {
        field: fieldDescription,
        fieldState: { error: errorDescription },
    } = useController({
        control,
        name: 'description',
    });

    const {
        fields: fieldsProjectLinks,
        remove: removeProjectLinks,
        update: updateProjectLinks,
        append: appendProjectLinks,
    } = useFieldArray({
        control,
        name: 'projectLinks',
    });

    const MAX_PROJECT_LINKS = 3;
    const isExistProjectLinks = fieldsProjectLinks.length !== 0;
    const lengthProjectLinks = fieldsProjectLinks.length;

    const { field: fieldDocuments } = useController({
        control,
        name: 'documents',
    });

    const MAX_DOCUMENTS = 3;
    const isExistDocuments =
        fieldDocuments.value && fieldDocuments.value.length !== 0;
    const lengthDocuments = fieldDocuments.value && fieldDocuments.value.length;

    const { saveDocument, handleDeleteLink } = useDocumentController({
        documentsValue: fieldDocuments.value as ListType[],
        onChange: fieldDocuments.onChange as ChangeHandler,
    });

    const { uploadDocument, uploading } = useSaveDocument({
        saveDocument,
    });

    const handleChangeDropzone = (files: File[], currentFileId?: number) =>
        uploadDocument(files[0], currentFileId);

    const handleSave = () => {
        trigger().then(isValid => {
            if (!isValid) return;
            const values = getValues();
            onClick?.(values);
        });
    };

    useEffect(() => {
        return () => reset();
    }, []);

    return {
        clientName: {
            field: fieldClientName,
            error: errorClientName,
        },
        projectName: {
            field: fieldProjectName,
            error: errorProjectName,
        },
        website: {
            field: fieldWebsite,
            error: errorWebsite,
        },
        description: {
            field: fieldDescription,
            error: errorDescription,
        },
        projectLinks: {
            fields: fieldsProjectLinks,
            remove: removeProjectLinks,
            update: updateProjectLinks,
            append: appendProjectLinks,
            MAX: MAX_PROJECT_LINKS,
            isExist: isExistProjectLinks,
            length: lengthProjectLinks,
            init: projectLinksInitValues,
        },
        documents: {
            field: fieldDocuments,
            MAX: MAX_DOCUMENTS,
            isExist: isExistDocuments,
            length: lengthDocuments,
            uploading,
            change: handleChangeDropzone,
            delete: handleDeleteLink,
        },
        handleSave,
    };
};
