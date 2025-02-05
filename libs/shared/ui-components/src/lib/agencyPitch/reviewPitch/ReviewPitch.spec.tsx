import { render, screen } from '@testing-library/react';
import ReviewPitch from './ReviewPitch';
import { PitchCreationStepsEnum } from '@breef/shared/constants';
import { PitchData } from '@breef/shared/types';
import { useMediaContext } from '@breef/shared/hooks';
import 'intersection-observer';

export const pitch = {
    companyName: 'test company name',
    companyLocation: 'test location',
    companyLogo: {
        id: 1,
        url: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg',
    },
    skills: [{ id: 1, name: 'test skill' }],
    approach: {
        description: 'test approach description',
        links: [{ title: 'test approach link', link: 'test.com' }],
    },
    id: 1,
    aboutUs: 'test about us',
    tagline: 'test tagline',
    website: 'website.com',
    portfolio: 'portfolio.com',
    instagram: 'instagram.com',
    pitchDetails: 'test pitch details',
    status: 'status',
    step: PitchCreationStepsEnum.AboutUs,
    additionalLinks: [{ name: 'test link', link: 'test-link.com' }],
    attachments: [{ id: 1, title: 'attachment 1', link: 'test-file-link.com' }],
    budget: {
        value: 'in_range',
        comment: '',
    },
    projectScope: '2',
    experience: '3',
    clientFit: '4',
    uniqueThings: [{ id: 1, name: 'unique thing' }],
    noteToBreef: 'test note to breef',
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
} as PitchData;

const propsPitch = {
    pitchData: pitch,
    onEditStep: jest.fn(),
};

jest.mock('@breef/shared/hooks');
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMaxMobile: false,
}));

describe('ReviewPitch', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReviewPitch {...propsPitch} />);
        expect(baseElement).toBeTruthy();
    });

    const testCasesTestId = [
        { name: 'company name', expected: 'test company name' },
        { name: 'location', expected: 'test location' },
        { name: 'skill', expected: 'test skill' },
        { name: 'approach description', expected: 'test approach description' },
        { name: 'approach link', expected: 'test approach link' },
        { name: 'about us', expected: 'test about us' },
        { name: 'tagline', expected: 'test tagline' },
        { name: 'pitch details', expected: 'test pitch details' },
        { name: 'link', expected: 'test link' },
        { name: 'attachment', expected: 'attachment 1' },
        { name: 'unique thing', expected: 'unique thing' },
        { name: 'note to breef', expected: 'test note to breef' },
        { name: 'client name', expected: 'Client Name' },
        { name: 'project name', expected: 'Project Name' },
        { name: 'project link', expected: 'Project Link' },
        { name: 'project link 2', expected: 'Project Link 2' },
        {
            name: 'previous work description',
            expected: 'test previous work description',
        },
        {
            name: 'budget range',
            expected: 'within budget range',
        },
    ];

    testCasesTestId.forEach(testCase => {
        it(`should render successfully ReviewPitch with ${testCase.name}`, () => {
            render(<ReviewPitch {...propsPitch} />);
            const element = screen.getByText(testCase.expected);
            expect(element).toBeInTheDocument();
        });
    });

    it(`should render successfully ReviewPitch with update budget range prop`, () => {
        const newBudget = {
            value: 'outside_range',
            comment: '',
        };
        const newPitch = Object.assign(pitch, {
            budget: newBudget,
        });
        render(<ReviewPitch onEditStep={jest.fn()} pitchData={newPitch} />);
        const element = screen.getByText('outside budget range');
        expect(element).toBeInTheDocument();
    });
});

describe('ReviewPitch mobile', () => {
    it(`should render successfully ReviewPitch Mobile`, () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMaxMobile: true,
        }));
        const { baseElement } = render(<ReviewPitch {...propsPitch} />);
        expect(baseElement).toBeTruthy();
    });
});
