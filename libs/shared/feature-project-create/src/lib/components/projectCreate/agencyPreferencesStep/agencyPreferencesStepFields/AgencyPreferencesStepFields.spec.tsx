import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider } from 'react-hook-form';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { AgencyPreferencesStepFields } from './AgencyPreferencesStepFields';
import { useProjectCreateFormControl } from '../../../../hooks/useProjectCreateFormControl';
import { mockConfiguredStore } from '../../../../store/mockStore';
import { Provider } from 'react-redux';
import {
    useCreateTagMutation,
    useGetTagsQuery,
} from '@breef/shared/data-access-pitch-create';
import { Middleware } from '@reduxjs/toolkit';

const AgencyPreferencesWrapper = () => {
    const { methods } = useProjectCreateFormControl({ setIsReady: jest.fn() });
    const { agencyPreferences } = methods;
    return (
        <Provider store={mockConfiguredStore}>
            <FormProvider {...methods.agencyPreferences}>
                <AgencyPreferencesStepFields {...agencyPreferences} />
            </FormProvider>
        </Provider>
    );
};
const middleware: Middleware = () => next => action => next(action);
jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
jest.mock('@breef/shared/data-access-pitch-create', () => ({
    useCreateTagMutation: jest.fn(),
    useGetTagsQuery: jest.fn(),
    apiPitchCreate: {
        reducerPath: 'apiPitchCreate',
        middleware,
        reducer: (state = {}) => state,
    },
}));
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});
(useGetTagsQuery as jest.Mock).mockReturnValue({
    data: [{ id: 0, name: 'test tag 1' }],
});
const createTag = jest.fn();
(useCreateTagMutation as jest.Mock).mockReturnValue([
    createTag,
    { isLoading: false },
]);

const setup = () => render(<AgencyPreferencesWrapper />);

describe('AgencyPreferencesStepFields', () => {
    it('should switch location pill to anywhere successfully', () => {
        setup();
        const anywhere = screen.getByText('Anywhere');
        fireEvent.click(anywhere);
        expect(screen.queryByPlaceholderText('Add preferred city')).toBe(null);
        expect(
            screen.getByText('Is the location of your agency important?'),
        ).toBeInTheDocument();
    });
    it('should switch location pill to specific successfully', () => {
        setup();
        const anywhere = screen.getByText('Anywhere');
        const specific = screen.getByText('Specific location');
        fireEvent.click(anywhere);
        fireEvent.click(specific);
        expect(
            screen.getByPlaceholderText('Preferred Location'),
        ).toBeInTheDocument();
    });
    it('should input value to autocomplete successfully', () => {
        setup();
        const inputLocation = screen.getByPlaceholderText('Preferred Location');
        expect(inputLocation).toBeInTheDocument();
        fireEvent.change(inputLocation, { target: { value: 'test location' } });
        expect(screen.getByDisplayValue('test location')).toBeInTheDocument();
    });
    it('should change ideal agency description successfully', () => {
        setup();
        const idealAgencyTextarea = screen.getByPlaceholderText(
            'We’re looking for a team that specializes in...',
        ) as HTMLTextAreaElement;
        expect(idealAgencyTextarea).toBeInTheDocument();
        fireEvent.change(idealAgencyTextarea, {
            target: { value: 'test ideal agency text' },
        });
        expect(idealAgencyTextarea.value).toBe('test ideal agency text');
    });
    it('should add tag successfully', () => {
        setup();
        const testTagItem = screen.getByText('test tag 1');
        expect(testTagItem).toBeInTheDocument();
        fireEvent.click(testTagItem);
        expect(screen.getByText('Selected')).toBeInTheDocument();
    });
    it('should remove tag successfully', () => {
        setup();
        const testTagItem = screen.getByText('test tag 1');
        fireEvent.click(testTagItem);
        const selectedTagItem = screen.getByText('test tag 1');
        fireEvent.click(selectedTagItem);
        expect(screen.queryByText('Selected')).toBe(null);
    });
});
