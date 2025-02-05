import { renderHook } from '@testing-library/react-hooks';
import { useFieldAgencyTagsControl } from './useFieldAgencyTagsControl';
import { useForm } from 'react-hook-form';
import { PreferencesFormType } from '../../../types/projectCreateTypes';
import {
    useCreateTagMutation,
    useGetTagsQuery,
} from '@breef/shared/data-access-pitch-create';
import { toast } from 'react-toastify';

jest.mock('@breef/shared/data-access-pitch-create', () => ({
    useCreateTagMutation: jest.fn(),
    useGetTagsQuery: jest.fn(),
}));
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));
(useGetTagsQuery as jest.Mock).mockReturnValue({
    data: [{ id: 0, name: 'test tag 1' }],
});
const createTag = jest.fn();
(useCreateTagMutation as jest.Mock).mockReturnValue([
    createTag,
    { isLoading: false },
]);
createTag.mockReturnValue({
    unwrap: jest.fn(),
});

const defaultValuesAgencyPreferences: PreferencesFormType = {
    agencyLocation: '',
    agencyTags: [],
    openToRemoteAgencies: false,
    idealAgencyDescription: '',
};

const setup = (defaultValues?: PreferencesFormType) => {
    const {
        result: {
            current: { control },
        },
    } = renderHook(() =>
        useForm<PreferencesFormType>({
            defaultValues: defaultValues ?? defaultValuesAgencyPreferences,
        }),
    );
    const { result } = renderHook(() => useFieldAgencyTagsControl(control));

    return result.current;
};

describe('useCreatorSkills', () => {
    it('should add new tag if tag not exist', async () => {
        const { handleSelectUniqueThing } = setup();
        await handleSelectUniqueThing({ name: 'new not exist tag' });
        expect(createTag).toBeCalledWith('new not exist tag');
    });
    it('should raise error on error when adding tag', async () => {
        createTag.mockImplementation(() => {
            throw new Error();
        });
        const { handleSelectUniqueThing } = setup();
        await handleSelectUniqueThing({ name: 'new not exist tag' });
        const errorMessage = 'Something went wrong while adding tag';
        expect(toast.error).toHaveBeenCalledWith(errorMessage, {
            toastId: errorMessage,
        });
    });
    it('should add tag if tag exist successfully', async () => {
        const { handleSelectUniqueThing } = setup();
        await handleSelectUniqueThing({ id: 1, name: 'test tag' });
    });
    it('should remove tag successfully', async () => {
        const { handleSelectUniqueThing } = setup({
            ...defaultValuesAgencyPreferences,
            agencyTags: [{ id: 1, name: 'test' }],
        });
        await handleSelectUniqueThing({ id: 1, name: 'test tag' });
    });
});
