import { render, screen } from '@testing-library/react';
import { TipsAndTricksClient } from './TipsAndTricksClient';

const props = {
    tipsData: [
        {
            id: '1',
            title: 'title',
            image: 'https://breef.com/',
            slug: 'slug-post',
        },
    ],
};

const url = 'https://breef.com/breefing-room/posts/';

describe('TipsAndTricksClient', () => {
    it('should render successfully Tag', () => {
        const { baseElement } = render(<TipsAndTricksClient {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully tips sidebar label', () => {
        render(<TipsAndTricksClient {...props} />);
        expect(screen.getByText('RESOURCES:')).toBeInTheDocument();
    });
    it('should render successfully tips sidebar title', () => {
        render(<TipsAndTricksClient {...props} />);
        expect(screen.getByText('The breefing Room')).toBeInTheDocument();
    });
    it('should render successfully tips sidebar note', () => {
        render(<TipsAndTricksClient {...props} />);
        expect(
            screen.getByText('The first editorial site for marketers.'),
        ).toBeInTheDocument();
    });
    it('should render successfully posts button', () => {
        render(<TipsAndTricksClient {...props} />);
        expect(screen.getByText('SEE MORE')).toBeInTheDocument();
    });
    it('should render successfully tips day label', () => {
        render(<TipsAndTricksClient {...props} />);
        expect(screen.getByText('Tip of the day')).toBeInTheDocument();
    });
    it('should render successfully tips day title', () => {
        render(<TipsAndTricksClient {...props} />);
        expect(screen.getByText('title')).toBeInTheDocument();
    });
    it('should render successfully tips day slug', () => {
        const { baseElement } = render(<TipsAndTricksClient {...props} />);
        const element = baseElement.getElementsByClassName('content-item');
        const href = element[0].getAttribute('href');
        expect(href).toBe(url + props.tipsData[0].slug);
    });
    it('should render successfully tips day slug', () => {
        const { baseElement } = render(<TipsAndTricksClient {...props} />);
        const element = baseElement.getElementsByTagName('img');
        const src = element[0].getAttribute('src');
        expect(src).toBe(props.tipsData[0].image);
    });
});
