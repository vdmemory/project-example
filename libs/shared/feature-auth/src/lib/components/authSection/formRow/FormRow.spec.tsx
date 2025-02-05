import { render } from '@testing-library/react';
import { FormRow } from './FormRow';

describe('FormRow', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <FormRow>
                <div>test row children</div>
            </FormRow>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test row children')).toBeInTheDocument();
    });
});
