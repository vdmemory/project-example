import { screen, render, fireEvent } from '@testing-library/react';
import SharedPopup from './SharedPopup';

const closePopupFn = jest.fn();
const setActiveShare = jest.fn();
const props = {
    title: 'title',
    close: closePopupFn,
    isActiveShare: true,
    link: 'link',
    setActiveShare: setActiveShare,
};

describe('SharedPopup', () => {
    it('should render shared popup successfully ', () => {
        const { baseElement } = render(<SharedPopup {...props} />);
        expect(baseElement).toBeTruthy();
        const switchShareElem = screen.getByTestId('switch-button-share');
        expect(switchShareElem).toBeTruthy();
        fireEvent.click(switchShareElem);
        expect(setActiveShare).toBeCalled();
        screen.findByTestId('button-copy-link-share').then(elem => {
            fireEvent.click(elem);
            expect(closePopupFn).toBeCalled();
        });
    });
});
