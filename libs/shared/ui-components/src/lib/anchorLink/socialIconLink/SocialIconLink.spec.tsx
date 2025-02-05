import { render, screen } from '@testing-library/react';
import { SocialIconLink } from './SocialIconLink';

const props = {
    link: 'test.com',
    title: 'twitter',
};
describe('SocialIconLink', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SocialIconLink {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
    });
    it('should render with instagram icon successfully', () => {
        render(<SocialIconLink {...props} title="instagram" />);
        expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    });
    it('should render with tiktok icon successfully', () => {
        render(<SocialIconLink {...props} title="tiktok" />);
        expect(screen.getByTestId('tiktok-icon')).toBeInTheDocument();
    });
});
