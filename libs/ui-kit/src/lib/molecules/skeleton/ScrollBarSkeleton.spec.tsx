import { render } from '@testing-library/react';
import {
    ScrollBarSkeletonComponent,
    ScrollBarSkeleton,
} from './ScrollBarSkeleton.component';

describe('ScrollBarSkeleton Wrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ScrollBarSkeleton />);
        expect(baseElement).toBeTruthy();
    });
});

describe('ScrollBarSkeletonComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ScrollBarSkeletonComponent />);
        expect(baseElement).toBeTruthy();
    });
});
