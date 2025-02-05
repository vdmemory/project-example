import {
    PitchProjectStatuses,
    ReviewDecisionNames,
} from '@breef/shared/constants';
import { TransformAgencyPitchResponse } from '@breef/shared/types';

export const mockClientBrandLead = {
    name: 'Aditi D.',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs015Age8hka5yLPLaU51Wpm58YRwUPG5zdQ&usqp=CAU',
};

export const mockAgencyPitch: TransformAgencyPitchResponse = {
    id: 27,
    aboutUs:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse\n\n\nquat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolo',
    pitchDetails:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor\n\n\ne eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolo',
    website: 'https://dev.new.breef.com/agency/project/374/pitch/create',
    portfolio: '',
    instagram: 'https://instagram.com',
    attachments: [
        {
            id: 352,
            title: 'ea7bc692-918f-4231-b74e-56e5e11c5847-Weekly_Ops_Meetings__1_.pdf',
            link: 'https://breef-s3-dev.s3.amazonaws.com/b624207e-c059-4bcb-ab0a-dc24762eacad-ea7bc692-918f-4231-b74e-56e5e11c5847-Weekly_Ops_Meetings__1_.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NTTODIJM3%2F20231214%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20231214T084925Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=360f85951d5d04a03031fc960afe5127d8ced440e4ba97c4fe15fd093bf7b7a9',
        },
        {
            id: 353,
            title: 'Weekly_Ops_Meetings__1_.doc',
            link: 'https://breef-s3-dev.s3.amazonaws.com/b624207e-c059-4bcb-ab0a-dc24762eacad-ea7bc692-918f-4231-b74e-56e5e11c5847-Weekly_Ops_Meetings__1_.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NTTODIJM3%2F20231214%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20231214T084925Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=360f85951d5d04a03031fc960afe5127d8ced440e4ba97c4fe15fd093bf7b7a9',
        },
        {
            id: 354,
            title: 'Weekly_Ops_Meetings__1_.pdf',
            link: 'https://breef-s3-dev.s3.amazonaws.com/b624207e-c059-4bcb-ab0a-dc24762eacad-ea7bc692-918f-4231-b74e-56e5e11c5847-Weekly_Ops_Meetings__1_.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NTTODIJM3%2F20231214%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20231214T084925Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=360f85951d5d04a03031fc960afe5127d8ced440e4ba97c4fe15fd093bf7b7a9',
        },
    ],
    additionalLinks: [
        {
            name: 'ADDITIONAL LINKS',
            link: 'https://google.com',
        },
        {
            name: 'ADDITIONAL LINKS 2',
            link: 'https://google.com',
        },
        {
            name: 'ADDITIONAL LINKS 3',
            link: 'https://google.com',
        },
    ],
    uniqueThings: [
        {
            id: 1,
            name: 'Attention to detail',
        },
        {
            id: 2,
            name: 'Open Minded',
        },
        {
            id: 3,
            name: 'Collaborative',
        },
        {
            id: 4,
            name: 'Hitting deadlines',
        },
        {
            id: 6,
            name: 'Inclusive',
        },
    ],
    tagline: 'Lorem ipsum dolor sit amet, consectetur',
    skills: [
        {
            id: 50,
            name: 'Digital Marketing Example',
        },
        {
            id: 51,
            name: 'Social Media Example',
        },
    ],
    budget: {
        value: 'in_range',
        comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru',
    },
    experience: '5',
    clientFit: '5',
    projectScope: '5',
    approach: {
        description: 'test approach description',
        links: [{ title: 'test approach link', link: 'test.com' }],
    },
    previousWork: [
        {
            id: 1,
            clientName: 'Client Name',
            projectName: 'Project Name',
            website: 'https://www.youtube.com',
            description: 'test previous work description',
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
    reviewDecision: 'unreviewed',
    companyLogo: {
        url: 'https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/aff2c7c41798a9e8d510293d676b1308.png',
        id: 337,
        name: '',
    },
    breefTake:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    companyLocation: 'United States, New York',
    companyName: 'Ninety Five Agency',
};

export const mockAgenciesList = [
    {
        id: 392,
        companyName: 'mailc',
        companyLogoUrl:
            'https://breef-s3-dev.s3.amazonaws.com/37a8ef99-6b31-4671-8a9d-6043269c675b-ec2a_project-company-logo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NTTODIJM3%2F20240227%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240227T125239Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=dfada18f7d38ecb6a124d5527c430ebd7bb92717e51dc34e842e83a4db5296a3',
        companyLocations: {
            location: 'Truckee, US',
        },
        budget: 'outside_range',
        status: 'project_started',
        reviewDecision: 'unreviewed',
        isShortlisted: false,
        pitchTags: ['Balanced'],
        token: undefined,
    },
    {
        id: 393,
        companyName: 'mailc mailc mailc',
        companyLogoUrl:
            'https://breef-s3-dev.s3.amazonaws.com/37a8ef99-6b31-4671-8a9d-6043269c675b-ec2a_project-company-logo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NTTODIJM3%2F20240227%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240227T125239Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=dfada18f7d38ecb6a124d5527c430ebd7bb92717e51dc34e842e83a4db5296a3',
        companyLocations: {
            location: 'Truckee, US',
        },
        budget: 'in_range',
        status: 'project_started',
        reviewDecision: 'accepted',
        isShortlisted: false,
        pitchTags: ['Balanced', 'Balanced', 'Balanced'],
        token: undefined,
    },
    {
        id: 394,
        companyName: 'mailc mailc',
        companyLogoUrl:
            'https://breef-s3-dev.s3.amazonaws.com/37a8ef99-6b31-4671-8a9d-6043269c675b-ec2a_project-company-logo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NTTODIJM3%2F20240227%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240227T125239Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=dfada18f7d38ecb6a124d5527c430ebd7bb92717e51dc34e842e83a4db5296a3',
        companyLocations: {
            location: 'Truckee, US',
        },
        budget: 'in_range',
        status: 'project_started',
        reviewDecision: 'accepted',
        isShortlisted: true,
        pitchTags: ['Balanced', 'Balanced'],
        token: undefined,
    },
    {
        id: 394,
        companyName: 'mail mail mail',
        companyLogoUrl:
            'https://breef-s3-dev.s3.amazonaws.com/37a8ef99-6b31-4671-8a9d-6043269c675b-ec2a_project-company-logo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NTTODIJM3%2F20240227%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240227T125239Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=dfada18f7d38ecb6a124d5527c430ebd7bb92717e51dc34e842e83a4db5296a3',
        companyLocations: {
            location: 'Truckee, US',
        },
        budget: 'in_range',
        status: 'project_started',
        reviewDecision: 'viewed',
        isShortlisted: false,
        pitchTags: ['Balanced', 'Balanced', 'Balanced'],
        token: undefined,
    },
    {
        id: 394,
        companyName: 'mail mail',
        companyLogoUrl:
            'https://breef-s3-dev.s3.amazonaws.com/37a8ef99-6b31-4671-8a9d-6043269c675b-ec2a_project-company-logo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDAUEE2NTTODIJM3%2F20240227%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240227T125239Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=dfada18f7d38ecb6a124d5527c430ebd7bb92717e51dc34e842e83a4db5296a3',
        companyLocations: {
            location: 'Truckee, US',
        },
        budget: 'in_range',
        status: 'project_started',
        reviewDecision: 'viewed',
        isShortlisted: false,
        pitchTags: [
            'BalancedBalancedBalancedBalancedBalancedBalanced',
            'BalancedBalanced',
            'Balanced',
            'Balanced',
        ],
        token: undefined,
    },
];

export const mockMakeIntroList = [
    {
        id: 1,
        logoUrl:
            'https://ssl.sitew.org/images/blog/articles/exemples-logos/apple.png',
        name: 'Apple',
        location: 'Brooklyn, US',
        schedule: false,
        isShortlisted: false,
        pitchId: 435,
    },
    {
        id: 2,
        logoUrl:
            'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg',
        name: 'Bird',
        location: 'Brooklyn, US',
        schedule: true,
        isShortlisted: false,
        pitchId: 435,
    },
    {
        id: 3,
        logoUrl: 'https://cdn.logo.com/hotlink-ok/logo-social.png',
        name: 'Social',
        location: 'Ukraine, UA',
        schedule: false,
        isShortlisted: true,
        pitchId: 435,
    },
];
