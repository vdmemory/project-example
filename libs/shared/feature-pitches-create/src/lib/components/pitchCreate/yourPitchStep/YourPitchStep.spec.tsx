import { render, screen } from '@testing-library/react';
import { FormProvider } from 'react-hook-form';
import { usePitchCreateFormControl } from '../../../hooks/usePitchCreateFormControl';
import { Provider } from 'react-redux';
import { mockConfiguredStore, pitchData } from '../../../store/mockStore';
import YourPitchStep from './YourPitchStep';

jest.mock('../../store/hooks', () => ({
    __esModule: true,
    ...jest.requireActual('../../store/hooks'),
    usePitchCreateSelector: () => ({
        pitchCreate: {
            companyInfo: null,
        },
    }),
}));

const Wrapper = () => {
    const { methods } = usePitchCreateFormControl({ pitchData });
    return (
        <Provider store={mockConfiguredStore}>
            <FormProvider {...methods.yourPitch}>
                <YourPitchStep />
            </FormProvider>
        </Provider>
    );
};

describe('YourPitchStep', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Wrapper />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Message From the Team')).toBeInTheDocument();
        expect(screen.getAllByText(/Your Approach/gi)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/BUDGET RANGE/gi)[0]).toBeInTheDocument();
        expect(
            screen.getByText(/WHAT MAKES US DIFFERENT/gi),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /Personalize your intro and tell the client why this project excites you./gi,
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /Describe your approach to this project. Think - deliverables, timing, next steps./gi,
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /Can you execute this project within the client’s budget range?/gi,
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /Add \(up to 10\) things that make your agency unique./gi,
            ),
        ).toBeInTheDocument();
    });
});
