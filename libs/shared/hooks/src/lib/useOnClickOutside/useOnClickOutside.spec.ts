import { renderHook } from '@testing-library/react-hooks';
import { useOnClickOutside } from './useOnClickOutside';

describe('useOnClickOutside', () => {
    it('should close the component when a click occurs outside of the ref element', () => {
        const closeMock = jest.fn();
        const ref = { current: document.createElement('div') };

        renderHook(() => useOnClickOutside(ref, closeMock));

        // Simulate a click event on an element outside of the ref element
        const event = new MouseEvent('click', { bubbles: true });
        document.dispatchEvent(event);

        expect(closeMock).toHaveBeenCalledTimes(1);
    });

    it('should not close the component when a click occurs inside of the ref element', () => {
        const closeMock = jest.fn();
        const ref = { current: document.createElement('div') };

        renderHook(() => useOnClickOutside(ref, closeMock));

        // Simulate a click event on an element inside of the ref element
        const element = document.createElement('span');
        ref.current.appendChild(element);
        element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(closeMock).not.toHaveBeenCalled();
    });
});
