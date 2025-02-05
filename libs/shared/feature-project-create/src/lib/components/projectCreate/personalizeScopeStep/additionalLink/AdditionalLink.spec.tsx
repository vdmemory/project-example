import { useProjectCreateFormControl } from '../../../../hooks/useProjectCreateFormControl';
import { FormProvider } from 'react-hook-form';
import AdditionalLink from './AdditionalLink';
import { fireEvent, render, screen } from '@testing-library/react';

const onRemove = jest.fn();

const props = {
    path: 'test',
    onRemove,
    isLastLink: false,
    className: '',
};

const AdditionalLinkWrapper = () => {
    const { methods } = useProjectCreateFormControl({ setIsReady: jest.fn() });
    return (
        <FormProvider {...methods.agencyPreferences}>
            <AdditionalLink {...props} />
        </FormProvider>
    );
};

describe('AdditionalLink', () => {
    it('should render successfully', () => {
        render(<AdditionalLinkWrapper />);
        expect(screen.getByPlaceholderText('Link Name')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('https://breef.com'),
        ).toBeInTheDocument();
    });
    it('should change data successfully', () => {
        render(<AdditionalLinkWrapper />);
        const linkNameInput = screen.getByPlaceholderText('Link Name');
        const linkUrlInput = screen.getByPlaceholderText('https://breef.com');
        fireEvent.change(linkNameInput, { target: { value: 'Test Name' } });
        fireEvent.change(linkUrlInput, { target: { value: 'test.com' } });
        expect(screen.getByDisplayValue('Test Name')).toBeInTheDocument();
        expect(screen.getByDisplayValue('test.com')).toBeInTheDocument();
    });
    it('should call onRemove on button click successfully', () => {
        render(<AdditionalLinkWrapper />);
        const trashButton = document.getElementsByTagName('button')[0];
        fireEvent.click(trashButton);
        expect(onRemove).toBeCalled();
    });
});
