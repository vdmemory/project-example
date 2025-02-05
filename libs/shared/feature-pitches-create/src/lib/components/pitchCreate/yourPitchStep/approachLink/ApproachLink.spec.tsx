import { usePitchCreateFormControl } from '../../../../hooks/usePitchCreateFormControl';
import { mockConfiguredStore, pitchData } from '../../../../store/mockStore';
import { FormProvider } from 'react-hook-form';
import { fireEvent, render, screen } from '@testing-library/react';
import ApproachLink from './ApproachLink';
import { Provider } from 'react-redux';

const onRemove = jest.fn();
const props = {
    index: 0,
    onRemove,
};
const Wrapper = () => {
    const { methods } = usePitchCreateFormControl({ pitchData });
    return (
        <FormProvider {...methods.portfolio}>
            <ApproachLink {...props} />
        </FormProvider>
    );
};

describe('ApproachLink', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <Wrapper />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
    });
    it('should call onRemove on click successfully', () => {
        render(
            <Provider store={mockConfiguredStore}>
                <Wrapper />
            </Provider>,
        );
        const trashButton = screen.getAllByRole('button')[1];
        expect(trashButton).toBeInTheDocument();
        fireEvent.click(trashButton);
        expect(onRemove).toBeCalled();
    });
});
