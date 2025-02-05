import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import SimpleHeaderInfo from './SimpleHeaderInfo';

const defaultProps = {
    title: 'Test Title',
};
describe('SimpleHeaderInfo', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <SimpleHeaderInfo {...defaultProps}>
                <div>test children</div>
            </SimpleHeaderInfo>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Title'));
        expect(getByText('test children'));
    });
});
