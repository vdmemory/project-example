import { render } from '@testing-library/react';
import { FormProvider } from 'react-hook-form';
import { usePitchCreateFormControl } from '../../../hooks/usePitchCreateFormControl';
import PortfolioStep from './PortfolioStep';
import { Provider } from 'react-redux';
import { mockConfiguredStore, pitchData } from '../../../store/mockStore';

jest.mock('../../store/hooks', () => ({
    __esModule: true,
    ...jest.requireActual('../../store/hooks'),
    usePitchCreateSelector: () => ({
        pitchCreate: {
            companyInfo: null,
        },
    }),
    usePitchPreviewSelector: () => ({
        pitchPreview: {},
    }),
}));

const Wrapper = () => {
    const { methods } = usePitchCreateFormControl({ pitchData });
    return (
        <Provider store={mockConfiguredStore}>
            <FormProvider {...methods.portfolio}>
                <PortfolioStep />
            </FormProvider>
        </Provider>
    );
};

describe('PortfolioStep', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Wrapper />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render PortfolioStep', () => {
        const testCases = [
            { name: 'title', expected: 'Previous Experience' },
            {
                name: 'subtitle',
                expected: 'Add relevant past work or case studies.',
            },
            { name: 'Client Name field', expected: 'Client Name' },
            { name: 'Project Name field', expected: 'Project Name' },
            { name: 'description field', expected: /Lorem ipsum dolor/gi },
            { name: 'Project Link 1 field', expected: 'Project Link' },
            { name: 'Project Link 2 field', expected: 'Project Link 2' },
            { name: 'Document 1 field', expected: 'DocumentTitle.pdf' },
            { name: 'Document 2 field', expected: 'DocumentList.pdf' },
            { name: '+ Add Past Client button', expected: '+ Add Project' },

            { name: 'title', expected: 'Additional Links' },
            {
                name: 'description',
                expected:
                    'Add links to decks, case studies, or additional relevant information.',
            },
            { name: 'Additional Link section', expected: '+ Add Link' },

            { name: 'title', expected: 'Attachments' },
            {
                name: 'description',
                expected:
                    'Upload a portfolio, deck, or additional relevant information.',
            },
            { name: 'Attachments section', expected: 'Upload here' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully SideBar with ${testCase.name}`, async () => {
                const { getByText } = render(<Wrapper />);
                expect(getByText(testCase.expected)).toBeInTheDocument();
            });
        });
    });
});
