import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProjectScopeStep } from './ProjectScopeStep';
import { Provider } from 'react-redux';
import { useProjectCreateFormControl } from '../../../hooks/useProjectCreateFormControl';
import { FormProvider } from 'react-hook-form';
import { configureStore } from '@reduxjs/toolkit';
import projectCreateReducer from '../../../store/projectCreateSlice';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import { listBudget, listProjectStartDay } from '@breef/shared/constants';

const setPrevSkillsIds = jest.fn();

const mockStore = configureStore({
    reducer: {
        projectCreate: projectCreateReducer,
    },
});
const ProjectScopeStepWrapper = () => {
    const { methods } = useProjectCreateFormControl({ setIsReady: jest.fn() });
    return (
        <Provider store={mockStore}>
            <FormProvider {...methods.projectScope}>
                <ProjectScopeStep setPrevSkillsIds={setPrevSkillsIds} />
            </FormProvider>
        </Provider>
    );
};

const mockCapabilities = [
    { id: 1, name: 'Capability 1' },
    { id: 2, name: 'Capability 2' },
];
const mockCapabilitiesSuggested = [
    { id: 3, name: 'Suggested Capability 1' },
    { id: 4, name: 'Suggested Capability 2' },
];

jest.mock('@breef/shared/data-access-project-create', () => ({
    useGetCapabilitiesQuery: jest.fn(),
}));

const setup = () => render(<ProjectScopeStepWrapper />);
describe('ProjectScopeStep', () => {
    beforeEach(() => {
        (useGetCapabilitiesQuery as jest.Mock).mockReturnValue({
            data: mockCapabilities,
        });
        (useGetCapabilitiesQuery as jest.Mock).mockReturnValueOnce({
            data: mockCapabilitiesSuggested,
        });
    });

    it('renders correctly', () => {
        setup();
        expect(screen.getByText('Agency Skills')).toBeInTheDocument();
        expect(screen.getByText('Budget Range')).toBeInTheDocument();
        expect(screen.getByText('Project Timing')).toBeInTheDocument();
    });

    it('handles selecting budget type and range', async () => {
        setup();

        const radioMonthly = screen.getByLabelText('Monthly');
        fireEvent.click(radioMonthly);

        const select = screen.getByPlaceholderText('Select Range');
        fireEvent.change(select, { target: { value: listBudget[0].value } });
        await waitFor(() => {
            expect(select).toHaveValue(listBudget[0].value);
        });
    });

    it('handles project start day selection', async () => {
        setup();

        const radioNow = screen.getByLabelText('Now');
        fireEvent.click(radioNow);

        const radioLater = screen.getByLabelText('Later');
        fireEvent.click(radioLater);

        const select = screen.getByPlaceholderText('Select Option');
        fireEvent.change(select, {
            target: { value: listProjectStartDay[0].value },
        });
        await waitFor(() => {
            expect(select).toHaveValue(listProjectStartDay[0].value);
        });
    });
});
