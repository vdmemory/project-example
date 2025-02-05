import { fireEvent, render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
    it('should render successfully', () => {
        render(<Tooltip text="Tooltip text" />);
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
    });
});
