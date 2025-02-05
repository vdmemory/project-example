import { render } from '@testing-library/react';
import { Popup } from './Popup';

describe('Popup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Popup>Popup Content</Popup>);
        expect(baseElement).toBeTruthy();
    });
});
