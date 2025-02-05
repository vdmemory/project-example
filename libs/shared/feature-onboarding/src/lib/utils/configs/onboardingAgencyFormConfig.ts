import { FieldConfiguration, typeFields } from '@breef/shared/ui-components';

const generalFormConfig = [
    {
        isVisibleStepInfo: true,
        label: 'List your agency’s website?',
        typeInput: 'text',
        typeField: '',
        placeholder: 'website',
        defaultValue: '',
        path: 'website',
        rules: {
            required: false,
        },
        maxLength: 1000,
    },
    {
        isVisibleStepInfo: true,
        label: 'Where is your agency located?',
        typeField: 'multiplePlacesAutocomplete',
        placeholder: 'City, Country',
        defaultValue: '',
        path: 'officeLocations',
        rules: {
            required: true,
        },
    },
    {
        isVisibleStepInfo: true,
        label: 'How many employees work for your agency?',
        typeField: typeFields.select,
        listType: 'listNumberOfEmployees',
        defaultValue: '',
        path: 'numberOfEmployees',
        rules: {
            required: true,
        },
    },
    {
        isVisibleStepInfo: true,
        label: 'What are your industries of focus?',
        typeInput: 'text',
        typeField: typeFields.cardSelect,
        defaultValue: '',
        path: 'industries',
        listType: 'industries',
        rules: {
            required: true,
        },
    },
    {
        isVisibleStepInfo: true,
        label: 'What services do you offer? You can select multiple.',
        typeInput: 'text',
        typeField: typeFields.multiCardSelect,
        defaultValue: '',
        path: 'services',
        childrenDependencyFieldPath: 'servicesAndSkills',
        childrenDependencyFieldDefaultValue: [],
        listType: 'services',
        rules: {
            required: true,
        },
    },
    {
        isVisibleStepInfo: true,
        label: 'What skills do you specialize in? You can select multiple.',
        typeInput: 'text',
        typeField: typeFields.multiChipSelect,
        defaultValue: '',
        path: 'servicesAndSkills',
        dependencyFieldPath: 'services',
        listType: 'skills',
        rules: {
            required: true,
        },
    },
    {
        isVisibleStepInfo: true,
        label: 'Does your agency identify with any of the following?',
        typeInput: 'text',
        typeField: typeFields.cardSelect,
        defaultValue: '',
        path: 'identity',
        listType: 'identities',
        rules: {
            required: true,
        },
    },
    {
        isVisibleStepInfo: true,
        label: 'What’s your cell? (This is only project updates - 🙅‍♀️ spam! )',
        typeInput: 'phone',
        typeField: '',
        placeholder: '01-1234-5678',
        defaultValue: '',
        path: 'phoneNumber',
        checkboxes: [
            {
                label: "Yes, it's OK to send me relevant SMS messages",
                path: 'isSmsSending',
            },
        ],
        rules: {
            required: false,
        },
        maxLength: 15,
    },
];

export const onboardingAgencyFormConfigWithSocial = ({
    userName,
}: {
    userName: string;
}) =>
    [
        {
            isVisibleStepInfo: true,
            label: `${userName}, what's your agency’s name?`,
            typeInput: 'text',
            typeField: '',
            placeholder: 'companyName',
            defaultValue: '',
            path: 'companyName',
            rules: {
                required: true,
            },
            maxLength: 255,
        },
        ...generalFormConfig,
    ] as FieldConfiguration[];

export const onboardingAgencyFormConfig = () =>
    generalFormConfig as FieldConfiguration[];
