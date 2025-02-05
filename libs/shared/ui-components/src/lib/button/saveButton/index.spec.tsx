import { fireEvent, render, screen } from '@testing-library/react';

import SaveButton from './SaveButton';

const handleClick = jest.fn();

const props = {
    onClick: handleClick,
    title: 'title',
};

describe('SaveButton', () => {
    it('should render successfully SaveButton', () => {
        const { baseElement } = render(
            <SaveButton
                type={'button'}
                disabled={false}
                isSuccess={true}
                isSubmitting={false}
                {...props}
            />,
        );
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully SaveButton with type button', async () => {
        render(
            <SaveButton
                type={'button'}
                disabled={false}
                isSuccess={true}
                isSubmitting={false}
                {...props}
            />,
        );
        const button = await screen.getByRole('button');
        expect(button.getAttribute('type')).toEqual('button');
    });
    it('should render successfully SaveButton with type button', async () => {
        render(
            <SaveButton
                type={'submit'}
                disabled={false}
                isSuccess={true}
                isSubmitting={false}
                {...props}
            />,
        );
        const button = await screen.getByRole('button');
        expect(button.getAttribute('type')).toEqual('submit');
    });
    it('should render successfully SaveButton displayTitle = title', async () => {
        render(
            <SaveButton
                type={'submit'}
                disabled={false}
                isSuccess={false}
                isSubmitting={false}
                {...props}
            />,
        );
        const title = screen.getByText('title');
        expect(title).toBeInTheDocument();
    });
    it('should render successfully SaveButton displayTitle = titleSubmitting', async () => {
        render(
            <SaveButton
                type={'submit'}
                disabled={false}
                isSuccess={false}
                isSubmitting={true}
                titleSubmitting={'titleSubmitting'}
                {...props}
            />,
        );
        const titleSubmitting = screen.getByText('titleSubmitting');
        expect(titleSubmitting).toBeInTheDocument();
    });
    it('should render successfully SaveButton displayTitle = titleSuccess', async () => {
        render(
            <SaveButton
                type={'submit'}
                disabled={false}
                isSuccess={true}
                isSubmitting={false}
                titleSuccess={'titleSuccess'}
                {...props}
            />,
        );
        const titleSuccess = screen.getByText('titleSuccess');
        expect(titleSuccess).toBeInTheDocument();
    });
    it('should render successfully SaveButton with action onClick', async () => {
        render(
            <SaveButton
                type={'submit'}
                disabled={false}
                isSuccess={true}
                isSubmitting={false}
                titleSuccess={'titleSuccess'}
                {...props}
            />,
        );
        const button = await screen.getByRole('button');
        await fireEvent.click(button);
        expect(handleClick).toBeCalledTimes(1);
    });
});
