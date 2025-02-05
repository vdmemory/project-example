import { configureStore } from '@reduxjs/toolkit';
import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
import pitchCreateReducer from './pitchCreateSlice';
import pitchPreviewReducer, { initialState } from './pitchPreviewSlice';
import { apiProfile } from '@breef/shared/data-access-profile';
import { profileReducer } from '@breef/shared/feature-profile';
import { PitchCreationStepsEnum } from '@breef/shared/constants';
import { PitchMergedResponseType } from '@breef/shared/types';

export const pitchData: PitchMergedResponseType = {
    approach: {
        description: '',
        links: [{ title: 'test approach link', link: 'test.com' }],
    },
    id: 1,
    aboutUs: '',
    logo: null,
    tagline: '',
    website: '',
    portfolio: '',
    instagram: '',
    pitchDetails: '',
    status: 'status',
    step: PitchCreationStepsEnum.AboutUs,
    additionalLinks: [],
    attachments: [],
    budget: {
        value: '',
        comment: '',
    },
    projectScope: '',
    experience: '',
    clientFit: '',
    uniqueThings: [],
    noteToBreef: '',
    previousWork: [
        {
            id: 1,
            clientName: 'Client Name',
            projectName: 'Project Name',
            website: 'https://www.youtube.com',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi eget nunc aliquam vestibulum. Sed vitae nisi eget nunc aliquam vestibulum.\n\nSed vitae nisi eget nunc aliquam vestibulum. Sed vitae nisi eget nunc aliquam vestibulum.',
            projectLinks: [
                {
                    title: 'Project Link',
                    link: 'https://www.google.com',
                },
                {
                    title: 'Project Link 2',
                    link: 'https://www.google.com',
                },
            ],
            documents: [
                {
                    id: 1,
                    title: 'DocumentTitle.pdf',
                    link: 'https://breef-s3-staging.s3.amazonaws.com/2b745052-f375-4e9f-9303-9a2df9f0d4fc-ea7bc692-918f-4231-b74e-56e5e11c5847-Weekly_Ops_Meetings__1_.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NQKRA5I6J%2F20240115%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240115T211008Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a7977b54897cd8205724571c1a6a7fa82ab08e18b95188d0a5439376b9cd1989',
                },
                {
                    id: 2,
                    title: 'ea7bc692-918f-4231-b74e-56e5e11c5847-Weekly_Ops_Meetings__1_.pdf',
                    link: 'https://breef-s3-staging.s3.amazonaws.com/3db1f231-c5ef-478e-b3a5-68031f6be329-ea7bc692-918f-4231-b74e-56e5e11c5847-Weekly_Ops_Meetings__1_.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NQKRA5I6J%2F20240115%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240115T215854Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=1f2393843f6aef40103eff9e59b8c50fbbe5945f5d6782c913c0b42bed375c20',
                },
                {
                    id: 3,
                    title: 'DocumentList.pdf',
                    link: 'https://breef-s3-staging.s3.amazonaws.com/ef0a5ee4-8849-4c61-9c04-aa1e23e149e1-list.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NQKRA5I6J%2F20240115%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240115T215902Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=cb8e7b40057fccb0955191b94988c5a1c8a6a95097f6f0b430d357c1e35b9482',
                },
            ],
        },
    ],
};

const data = {
    step: 1,
    companyInfo: null,
    accountInfo: null,
    isPenMode: false,
    isDisabledSubmit: false,
    isSubmittingNext: false,
    isSubmittingSaveExit: false,
    targetElementId: null,
};

export const mockConfiguredStore = configureStore({
    reducer: {
        [apiProfile.reducerPath]: apiProfile.reducer,
        profile: profileReducer,
        [apiPitchCreate.reducerPath]: apiPitchCreate.reducer,
        pitchPreview: pitchPreviewReducer,
        pitchCreate: pitchCreateReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiPitchCreate.middleware,
            apiProfile.middleware,
        ),
    preloadedState: {
        pitchCreate: data,
        pitchPreview: initialState,
    },
});

export const mockPassReasonsList = [
    {
        id: 1,
        name: 'Budget Too Low',
        description:
            "We can't execute this project within the client’s budget.",
    },
    {
        id: 2,
        name: 'Budget Too Low',
        description:
            "We can't execute this project within the client’s budget.",
    },
    {
        id: 3,
        name: 'Budget Too Low',
        description:
            "We can't execute this project within the client’s budget.",
    },
    {
        id: 4,
        name: 'Budget Too Low',
        description:
            "We can't execute this project within the client’s budget.",
    },
    {
        id: 5,
        name: 'Budget Too Low',
        description:
            "We can't execute this project within the client’s budget.",
    },
    {
        id: 6,
        name: 'Budget Too Low',
        description:
            "We can't execute this project within the client’s budget.",
    },
];
