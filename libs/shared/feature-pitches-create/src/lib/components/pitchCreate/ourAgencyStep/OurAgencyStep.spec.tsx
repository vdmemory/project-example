import { fireEvent, render, screen } from '@testing-library/react';
import OurAgencyStep from './OurAgencyStep';
import { usePitchCreateFormControl } from '../../../hooks/usePitchCreateFormControl';
import { FormProvider } from 'react-hook-form';
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
        shortProjectInfo: { clientName: 'tests' },
    }),
}));

const OurAgencyStepWrapper = () => {
    const { methods } = usePitchCreateFormControl({ pitchData });
    return (
        <Provider store={mockConfiguredStore}>
            <FormProvider {...methods.ourAgency}>
                <OurAgencyStep />
            </FormProvider>
        </Provider>
    );
};

describe('OurAgencyStep', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<OurAgencyStepWrapper />);
        expect(baseElement).toBeTruthy();
    });
    it('should change about us value on input successfully', () => {
        render(<OurAgencyStepWrapper />);
        const textarea = screen.getByPlaceholderText(
            'We are a digital marketing agency at the intersection of strategy, technology, and content marketing...',
        );
        fireEvent.change(textarea, { target: { value: 'about us test' } });
        expect(screen.getByDisplayValue('about us test')).toBeInTheDocument();
    });
    it('should change tagline value on input successfully', () => {
        render(<OurAgencyStepWrapper />);
        const tagline = screen.getByPlaceholderText(
            'The modern media agency...',
        );
        fireEvent.change(tagline, { target: { value: 'Tagline test' } });
        expect(screen.getByDisplayValue('Tagline test')).toBeInTheDocument();
    });
    it('should change website value on input successfully', () => {
        render(<OurAgencyStepWrapper />);
        const website = screen.getByPlaceholderText('https://abcompany.com');
        fireEvent.change(website, { target: { value: 'website.com' } });
        expect(screen.getByDisplayValue('website.com')).toBeInTheDocument();
    });
    it('should change portfolio value on input successfully', () => {
        render(<OurAgencyStepWrapper />);
        const portfolio = screen.getByPlaceholderText(
            'https://myportfolio.com',
        );
        fireEvent.change(portfolio, { target: { value: 'portfolio.com' } });
        expect(screen.getByDisplayValue('portfolio.com')).toBeInTheDocument();
    });
    it('should change instagram value on input successfully', () => {
        render(<OurAgencyStepWrapper />);
        const instagram = screen.getByPlaceholderText('@abcopmany');
        fireEvent.change(instagram, { target: { value: '@test.instagram' } });
        expect(screen.getByDisplayValue('@test.instagram')).toBeInTheDocument();
    });
});
