import { fireEvent, render, screen } from '@testing-library/react';

import SocialLinks from './SocialLinks';

const handleDeleteLink = jest.fn();
const handleOpenModal = jest.fn();

const props = {
    title: 'social link title',
    link: 'http://www.instagram/client',
    handleDeleteLink,
    handleOpenModal,
    idx: 1,
    className: 'social-links--item',
};

describe('SocialLinks', () => {
    it('should render SimpleHeaderInfo successfully ', () => {
        const { baseElement } = render(<SocialLinks {...props} />);

        expect(baseElement).toBeTruthy();
        const link = screen.getAllByRole('link');
        expect(link[0].textContent).toEqual(props.title);
        expect(link[0].getAttribute('href')).toBe(props.link);
        const buttonDelete =
            baseElement.getElementsByClassName('social-delete')[0];
        fireEvent.click(buttonDelete, { idx: 1 });

        expect(handleDeleteLink).toBeCalledTimes(1);
    });
});
