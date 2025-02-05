import { render, screen } from '@testing-library/react';
import { Tooltip } from '../personalizeScopeStep/tooltip/Tooltip';
import { PillsWrapper } from './PillsWrapper';

const props = {
    title: 'Test title',
};
describe('PillsWrapper', () => {
    it('should render successfully', () => {
        render(
            <PillsWrapper {...props}>
                <div>test children</div>
            </PillsWrapper>,
        );
        expect(screen.getByText('Test title')).toBeInTheDocument();
        expect(screen.getByText('test children')).toBeInTheDocument();
    });
});
