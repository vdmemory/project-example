import { render } from '@testing-library/react';
import { TipOfTheDay } from './TipOfTheDay';

describe('TipOfTheDay', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TipOfTheDay userType="client" />);
        expect(baseElement).toBeTruthy();
    });
});
