/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { InnerController } from './InnerController';
import { Path, useForm } from 'react-hook-form';
import { ConfigInnerFieldType } from '../InnerForm';

// Mock dependencies
jest.mock('@breef/shared/utils', () => ({
    modifyHandleChangeField: jest.fn((fieldItem, onChange, cleanError) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            cleanError();
            onChange(event);
        };
    }),
}));

jest.mock('./innerField/InnerField', () => ({
    __esModule: true,
    default: ({ label, name, onChange }: any) => (
        <input
            data-testid={`inner-field-${name}`}
            placeholder={label}
            onChange={onChange}
        />
    ),
}));

// Wrapper component for testing with useForm
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { control } = useForm();
    return (
        <>{React.cloneElement(children as React.ReactElement, { control })}</>
    );
};

const mockCleanError = jest.fn();

const fieldItem: ConfigInnerFieldType = {
    label: 'Test Field',
    name: 'testField' as Path<unknown>,
    placeholder: 'Enter test field',
    type: 'text',
};

describe('InnerController Component', () => {
    it('renders correctly with given props', () => {
        render(
            <FormWrapper>
                {/* @ts-ignore */}
                <InnerController
                    fieldItem={fieldItem}
                    cleanError={mockCleanError}
                />
            </FormWrapper>,
        );

        const input = screen.getByTestId('inner-field-testField');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'Test Field');
    });

    it('calls cleanError and onChange when input value changes', () => {
        render(
            <FormWrapper>
                {/* @ts-ignore */}
                <InnerController
                    fieldItem={fieldItem}
                    cleanError={mockCleanError}
                />
            </FormWrapper>,
        );

        const input = screen.getByTestId('inner-field-testField');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(mockCleanError).toHaveBeenCalledWith('testField');
    });
});
