import { renderHook, act } from '@testing-library/react-hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useController } from 'react-hook-form';
import { FormType } from '../types/projectCreateTypes';
import { useCompanyDetailsFormControl } from './useCompanyDetailsFormControl';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn(),
    useController: jest.fn(),
}));

jest.mock('@hookform/resolvers/yup', () => ({
    yupResolver: jest.fn(),
}));

describe('useCompanyDetailsFormControl', () => {
    const mockUseForm = useForm as jest.Mock;
    const mockUseController = useController as jest.Mock;
    const mockYupResolver = yupResolver as jest.Mock;

    const defaultFormValues: FormType = {
        name: '',
        website: '',
        location: '',
        description: '',
    };

    beforeEach(() => {
        mockUseForm.mockReturnValue({
            getValues: jest.fn().mockReturnValue(defaultFormValues),
            trigger: jest.fn().mockResolvedValue(true),
            reset: jest.fn(),
            control: {},
            clearErrors: jest.fn(),
            setError: jest.fn(),
            formState: { errors: {}, isValid: true },
        });

        mockUseController.mockImplementation(({ name }) => ({
            field: { name, onChange: jest.fn(), onBlur: jest.fn(), value: '' },
            fieldState: { error: undefined },
        }));

        mockYupResolver.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize form with default values', () => {
        const { result } = renderHook(() =>
            useCompanyDetailsFormControl({ formData: defaultFormValues }),
        );

        expect(result.current.form.name.field.name).toBe('name');
        expect(result.current.form.website.field.name).toBe('website');
        expect(result.current.form.location.field.name).toBe('location');
        expect(result.current.form.description.field.name).toBe('description');
    });

    it('should handle form submission correctly', async () => {
        const onSubmitMock = jest.fn();
        const { result } = renderHook(() =>
            useCompanyDetailsFormControl({ onSubmit: onSubmitMock }),
        );

        await act(async () => {
            result.current.handleSave();
        });

        expect(result.current.isValidForm).toBe(true);
        expect(onSubmitMock).toHaveBeenCalledWith(defaultFormValues);
    });

    it('should validate the form correctly', async () => {
        const invalidFormValues: FormType = {
            name: '',
            website: 'invalid-url',
            location: '',
            description: '',
        };

        mockUseForm.mockReturnValueOnce({
            getValues: jest.fn().mockReturnValue(invalidFormValues),
            trigger: jest.fn().mockResolvedValue(false),
            reset: jest.fn(),
            control: {},
            clearErrors: jest.fn(),
            setError: jest.fn(),
            formState: {
                errors: { website: { message: 'Invalid URL' } },
                isValid: false,
            },
        });

        const { result } = renderHook(() =>
            useCompanyDetailsFormControl({ formData: invalidFormValues }),
        );

        await act(async () => {
            result.current.handleSave();
        });

        expect(result.current.isValidForm).toBe(false);
        expect(result.current.errors.website?.message).toBe('Invalid URL');
    });

    it('should reset the form on unmount', () => {
        const { unmount } = renderHook(() =>
            useCompanyDetailsFormControl({ formData: defaultFormValues }),
        );

        unmount();

        expect(mockUseForm().reset).toHaveBeenCalled();
    });
});
