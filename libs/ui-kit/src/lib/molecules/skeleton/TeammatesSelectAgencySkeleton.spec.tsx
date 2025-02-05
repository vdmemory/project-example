import { render } from '@testing-library/react';
import {
    TeammatesSelectAgencySkeletonComponent,
    TeammatesSelectAgencySkeleton,
} from './TeammatesSelectAgencySkeleton.component';

describe('TeammatesSelectAgencySkeleton Wrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TeammatesSelectAgencySkeleton />);
        expect(baseElement).toBeTruthy();
    });
});

describe('TeammatesSelectAgencySkeletonComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <TeammatesSelectAgencySkeletonComponent />,
        );
        expect(baseElement).toBeTruthy();
    });
});
