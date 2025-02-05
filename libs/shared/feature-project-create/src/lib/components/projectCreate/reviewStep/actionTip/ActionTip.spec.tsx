import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActionTip } from './ActionTip';

const props = {
    icon: <svg data-testid="test-icon" />,
    description: 'test description',
    title: 'test title',
};

describe('ActionTip', () => {
    it('should render successfully', () => {
        render(
            <ActionTip {...props}>
                <div data-testid="children" />
            </ActionTip>,
        );
        expect(screen.getByText('test description')).toBeInTheDocument();
        expect(screen.getByText('test title')).toBeInTheDocument();
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        expect(screen.getByTestId('children')).toBeInTheDocument();
    });
});
