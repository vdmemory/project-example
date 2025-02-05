import { render } from '@testing-library/react';
import { FormProvider } from 'react-hook-form';
import { usePitchCreateFormControl } from '../../../hooks/usePitchCreateFormControl';
import ProjectFitStep from './ProjectFitStep';
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
            <FormProvider {...methods.projectFit}>
                <ProjectFitStep />
            </FormProvider>
        </Provider>
    );
};

describe('ProjectFitStep', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Wrapper />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render ProjectFitStep', () => {
        const testCases = [
            { name: 'title', expected: 'Agency Fit' },
            {
                name: 'description',
                expected:
                    'Rate yourself. How good a fit is your agency for this project?',
            },
            { name: 'Industry Experience', expected: 'Industry Experience' },
            { name: 'Project Scope section', expected: 'Project Scope' },
            { name: 'Client Fit section', expected: 'Client Fit' },
            { name: 'Note to breef section', expected: 'Note to breef' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully SideBar with ${testCase.name}`, async () => {
                const { getByText } = render(<Wrapper />);
                expect(getByText(testCase.expected)).toBeInTheDocument();
            });
        });
    });
});
