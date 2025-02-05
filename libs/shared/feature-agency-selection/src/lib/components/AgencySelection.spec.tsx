import 'intersection-observer';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import AgencySelection from './AgencySelection';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@breef/shared/data-access-project', () => ({
    useSendSelectedAgencyMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

const mockUseRouter = useRouter as jest.Mock;
const mockRouterPush = jest.fn();

const mockAgenciesList = [
    {
        id: 1,
        companyName: 'Agency 1',
        companyLogo: 'logo1.png',
        companyLocation: 'New York',
    },
    {
        id: 2,
        companyName: 'Agency 2',
        companyLogo: 'logo2.png',
        companyLocation: 'Los Angeles',
    },
];

const mockBrandLead = {
    firstName: 'John',
    lastName: 'Doe',
    logoUrl: 'profile.png',
};

describe('AgencySelection Component', () => {
    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            query: { projectId: '123' },
            push: mockRouterPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = (initialStepper = { mainStep: 1, subStep: 1 }) => {
        return render(
            <AgencySelection
                agenciesList={mockAgenciesList}
                stepper={initialStepper}
                setStepper={jest.fn()}
                brandLead={mockBrandLead}
            />,
        );
    };

    it('should render correctly', () => {
        renderComponent();
        expect(screen.getByText('Agency 1')).toBeInTheDocument();
        expect(screen.getByText('Agency 2')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should handle agency selection', () => {
        renderComponent();
        const agency1 = screen.getByText('Agency 1');
        fireEvent.click(agency1);
        expect(screen.getByText('Next')).toBeEnabled();
    });

    it('should handle stepper increment', () => {
        const mockSetStepper = jest.fn();
        const { debug } = render(
            <AgencySelection
                agenciesList={mockAgenciesList}
                stepper={{ mainStep: 1, subStep: 1 }}
                setStepper={mockSetStepper}
                brandLead={mockBrandLead}
            />,
        );
        debug();
        expect(screen.getByText('Next')).toBeInTheDocument();
        const nextButton = screen.getByTestId('custom-button');

        fireEvent.click(nextButton);

        waitFor(() => {
            expect(mockSetStepper).toHaveBeenCalledWith({
                mainStep: 2,
                subStep: 2,
            });
        });
    });

    it('should handle empty agencies list', () => {
        render(
            <AgencySelection
                agenciesList={[]}
                stepper={{ mainStep: 1, subStep: 1 }}
                setStepper={jest.fn()}
                brandLead={mockBrandLead}
            />,
        );
        expect(mockRouterPush).toHaveBeenCalledWith('/projects');
    });

    it('should disable the "Next" button if no agency is selected', () => {
        renderComponent();
        expect(screen.getByText('Next')).toBeInTheDocument();
        const nextButton = screen.getByTestId('custom-button');
        expect(nextButton).toBeDisabled();
    });

    it('should enable the "Next" button if an agency is selected', () => {
        renderComponent();
        const agency1 = screen.getByText('Agency 1');
        fireEvent.click(agency1);
        expect(screen.getByText('Next')).toBeInTheDocument();
        const nextButton = screen.getByTestId('custom-button');
        expect(nextButton).toBeEnabled();
    });

    it('should display a loading state while submitting', () => {
        jest.mock('@breef/shared/data-access-project', () => ({
            useSendSelectedAgencyMutation: () => [
                jest.fn(),
                { isLoading: true },
            ],
        }));
        render(
            <AgencySelection
                agenciesList={mockAgenciesList}
                stepper={{ mainStep: 2, subStep: 2 }}
                setStepper={jest.fn()}
                brandLead={mockBrandLead}
            />,
        );
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        const nextButton = screen.getByTestId('custom-button');
        expect(nextButton).toBeDisabled();
    });
});
