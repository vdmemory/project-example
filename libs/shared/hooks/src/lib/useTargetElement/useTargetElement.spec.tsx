import { renderHook } from '@testing-library/react-hooks';
import { useTargetElement } from './useTargetElement';

describe('useTargetElement', () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();

        const targetElement = document.createElement('div');
        targetElement.id = 'test-target';
        targetElement.getBoundingClientRect = jest
            .fn()
            .mockReturnValue({ y: 150 });
        document.body.appendChild(targetElement);
    });

    afterEach(() => {
        document.body.innerHTML = '';
        (window.scrollTo as jest.Mock).mockRestore();
    });

    it('should scroll to the target element with offset', () => {
        const scrollOffset = 50;
        renderHook(() =>
            useTargetElement({
                targetElementId: 'test-target',
                scrollOffset,
            }),
        );

        expect(window.scrollTo).toHaveBeenCalledWith(
            0,
            150 + window.scrollY - scrollOffset,
        );
    });

    it('should do nothing if targetElementId is not provided', () => {
        renderHook(() => useTargetElement({}));
        expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('should handle cases where target element is not found', () => {
        renderHook(() =>
            useTargetElement({
                targetElementId: 'non-existing-id',
                scrollOffset: 20,
            }),
        );

        expect(window.scrollTo).toHaveBeenCalledWith(0, window.scrollY - 20);
    });
});
