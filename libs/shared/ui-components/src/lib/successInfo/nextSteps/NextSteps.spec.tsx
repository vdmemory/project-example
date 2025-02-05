import { render } from '@testing-library/react';

import { NextSteps } from './NextSteps';

const defaultProps = {
    imageUrl: 'imageUrl',
    title: 'test title',
    note: 'test note',
    numeric: 1,
};
describe('NextSteps', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <NextSteps {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test title')).toBeInTheDocument();
        expect(getByText('test note')).toBeInTheDocument();
    });
});
