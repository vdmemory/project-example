import { render } from '@testing-library/react';
import { TipsAndTricks } from './TipsAndTricks';
import 'intersection-observer';

const props = {
    tipsData: [
        {
            id: '1',
            title: 'test tip title',
            image: 'https://uploads-ssl.webflow.com/5e55696d2dc3dd0d89b37c0a/63c9f148fc9c929f2a8b0c84_BR.png',
            slug: 'slug',
        },
    ],
    role: 'client' as 'client' | 'agency',
};
describe('TipsAndTricks', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<TipsAndTricks {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('test tip title')).toBeInTheDocument();
    });
});
