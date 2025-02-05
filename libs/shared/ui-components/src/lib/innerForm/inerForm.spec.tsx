import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { InnerForm, InnerFormProps } from './InnerForm';
import { Control, Path } from 'react-hook-form';

jest.mock('./innerController/InnerController', () => ({
    InnerController: ({ fieldItem }: { fieldItem: any }) => (
        <div data-testid="inner-controller">{fieldItem.label}</div>
    ),
}));

jest.mock('@breef/shared/types', () => ({
    ControlTypeInnerForm: jest.fn(),
}));

const mockControl = {} as Control<any>;
const mockCleanErrors = jest.fn();

const defaultProps: InnerFormProps = {
    config: [
        {
            label: 'Field 1',
            name: 'field1' as Path<unknown>,
            placeholder: 'Enter field 1',
            type: 'text',
        },
        {
            label: 'Field 2',
            name: 'field2' as Path<unknown>,
            placeholder: 'Enter field 2',
            type: 'text',
            row: [
                {
                    label: 'Field 2.1',
                    name: 'field2.1' as Path<unknown>,
                    placeholder: 'Enter field 2.1',
                    type: 'text',
                },
                {
                    label: 'Field 2.2',
                    name: 'field2.2' as Path<unknown>,
                    placeholder: 'Enter field 2.2',
                    type: 'text',
                },
            ],
        },
    ],
    control: mockControl,
    cleanErrors: mockCleanErrors,
    isActiveForm: true,
};

describe('InnerForm Component', () => {
    it('renders correctly with given props', () => {
        render(<InnerForm {...defaultProps} />);
        expect(screen.getByText('Field 1'));
        expect(screen.getByText('Field 2.1'));
        expect(screen.getByText('Field 2.2'));
    });

    it('applies isActive class based on isActiveForm prop', () => {
        const { rerender } = render(
            <InnerForm {...defaultProps} isActiveForm={false} />,
        );
        expect(screen.getByTestId('inner-form')).toHaveClass(
            'inner-form inner-form-company-info',
        );
        expect(screen.getByTestId('inner-form')).not.toHaveClass('active');
        rerender(<InnerForm {...defaultProps} isActiveForm={true} />);
        expect(screen.getByTestId('inner-form')).toHaveClass('active');
    });

    it('renders correctly when there are nested fields', () => {
        render(<InnerForm {...defaultProps} />);

        expect(screen.getAllByTestId('inner-controller')).toHaveLength(3);
        expect(screen.getByText('Field 2.1')).toBeInTheDocument();
        expect(screen.getByText('Field 2.2')).toBeInTheDocument();
    });

    it('renders correctly without isActiveForm prop', () => {
        render(<InnerForm {...defaultProps} isActiveForm={undefined} />);

        expect(screen.getByTestId('inner-form')).toHaveClass(
            'inner-form inner-form-company-info active',
        );
    });
});
