/* eslint-disable @typescript-eslint/ban-ts-comment */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollBar from './Scrollbar';

const defaultProps = {
    next: 'next',
    prev: 'prev',
};
const scrollbarChildren = [<div>test elem 1</div>, <div>test elem 2</div>];
describe('ScrollBar', () => {
    // it('should render spinner if isLoading prop is true', () => {
    //     const { getByTestId } = render(
    //         <ScrollBar {...defaultProps} isLoading={true}>
    //             {[]}
    //         </ScrollBar>,
    //     );
    //     expect(getByTestId('spinner')).toBeInTheDocument();
    // });
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <ScrollBar {...defaultProps}>{scrollbarChildren}</ScrollBar>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test elem 1')).toBeInTheDocument();
        expect(getByText('test elem 2')).toBeInTheDocument();
        expect(getByText('next')).toBeInTheDocument();
        expect(getByText('prev')).toBeInTheDocument();
    });

    it('should not render next and prev buttons if prop hideNavButtons is true', () => {
        const { queryByText } = render(
            <ScrollBar {...defaultProps} hideNavButtons={true}>
                {scrollbarChildren}
            </ScrollBar>,
        );
        expect(queryByText('next')).toBe(null);
        expect(queryByText('prev')).toBe(null);
    });
    it('should not render next and prev buttons if props visiblePrevBtn and visibleNextBtn is false', () => {
        const { queryByText } = render(
            <ScrollBar {...defaultProps} hideNavButtons={true}>
                {scrollbarChildren}
            </ScrollBar>,
        );
        expect(queryByText('next')).toBe(null);
        expect(queryByText('prev')).toBe(null);
    });
});
