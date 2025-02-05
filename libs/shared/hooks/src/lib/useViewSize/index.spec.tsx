/* eslint-disable  @typescript-eslint/no-explicit-any */
import { render, act } from '@testing-library/react';
import { useViewSize } from './useViewSize';

const resizeWindow = (width: number, height: number) => {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event('resize'));
};

jest.mock('lodash', () => ({
    debounce: (fn: (...args: any[]) => any) => fn,
    range: () => [],
}));

describe('useViewSize hook', () => {
    it('updates viewHeight state on window resize', () => {
        let renderedResult = { viewHeight: 0 };

        const TestComponent = () => {
            renderedResult = useViewSize();
            return <div>Test Component</div>;
        };

        render(<TestComponent />);

        expect(renderedResult.viewHeight).toBe(window.innerHeight);

        act(() => {
            resizeWindow(1024, 900);
        });

        expect(renderedResult.viewHeight).toBe(900);
    });
});
