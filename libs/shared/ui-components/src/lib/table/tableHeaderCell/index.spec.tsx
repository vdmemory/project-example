import { render } from '@testing-library/react';
import TableHeaderCell from './TableHeaderCell';

const props = {
    label: 'label',
    tooltipText: 'tooltip text',
};

describe('TableHeaderCell', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <TableHeaderCell {...props} tooltipPosition="top" />,
        );
        expect(baseElement).toBeTruthy();
    });
});
