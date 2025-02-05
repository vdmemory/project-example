import { render } from '@testing-library/react';
import { InfoBox } from './InfoBox';

const props = {
    note: 'Test Note',
    label: 'Test Label',
};
describe('InfoBox', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <InfoBox {...props}>
                <div>Test Children</div>
            </InfoBox>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Note')).toBeInTheDocument();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('Test Children')).toBeInTheDocument();
    });
});
