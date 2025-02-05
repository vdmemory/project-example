import { render } from '@testing-library/react';
import InnerFieldWrapper from './InnerFieldWrapper';

const props = {
    labelText: 'labelText',
    toolTipText: 'toolTipText',
};

describe('InnerFieldWrapper', () => {
    it('should render successfully', async () => {
        const { baseElement } = render(
            <InnerFieldWrapper {...props}>
                <input type="text" />
            </InnerFieldWrapper>,
        );
        expect(baseElement).toBeTruthy();
    });
});
