import { render } from '@testing-library/react';
import { FieldConfiguration, FieldController } from './FieldController';
import { useForm } from 'react-hook-form';
import React from 'react';

const defaultProps = {
    isSubmitting: false,
    onClick: jest.fn(),
    formStep: 1,
    fieldForm: {
        path: 'path',
        typeButton: 'button',
        defaultValue: '',
        isVisibleStepInfo: true,
        rules: { required: true },
        label: 'test label',
        placeholder: 'test placeholder',
        typeField: '',
    } as FieldConfiguration,
    numberSteps: 2,
    fieldPath: 'path',
};
interface FieldControllerWrapperProps {
    fieldForm?: {
        checkboxes?: { label: string; path: string }[];
    };
}
const checkboxes = [
    {
        label: 'checkbox 1',
        path: 'checkbox1',
    },
    {
        label: 'checkbox 2',
        path: 'checkbox2',
    },
];
const FieldControllerWrapper = (props: FieldControllerWrapperProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const methods = useForm<any>();
    const preparedProps = {
        ...defaultProps,
        fieldForm: {
            ...defaultProps.fieldForm,
            ...props.fieldForm,
        },
    };

    return (
        <FieldController
            {...preparedProps}
            {...methods}
            errors={methods.formState.errors}
        />
    );
};
describe('FieldController', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<FieldControllerWrapper />);
        expect(baseElement).toBeTruthy();
        expect(getByText('1/2')).toBeInTheDocument();
        expect(getByText('test label')).toBeInTheDocument();
    });
    it('should render with checkboxes successfully', () => {
        const { getByText } = render(
            <FieldControllerWrapper fieldForm={{ checkboxes }} />,
        );
        expect(getByText('checkbox 1')).toBeInTheDocument();
        expect(getByText('checkbox 2')).toBeInTheDocument();
    });
});
