import { useGetLoadingImage } from '@breef/shared/hooks';
import { render, screen } from '@testing-library/react';
import { PreviewImage } from './PreviewImage';

jest.mock('@breef/shared/hooks');

(useGetLoadingImage as jest.Mock).mockImplementation(() => ({
    loading: true,
    image: null,
    getImage: jest.fn(),
}));

describe('PreviewImage', () => {
    it('renders loading spinner while fetching image', () => {
        const { container } = render(
            <PreviewImage link="https://example.com/image.jpg" />,
        );

        const spinner = container.querySelector('.spinner');
        const image = container.querySelector('img');

        expect(spinner).toBeInTheDocument();
        expect(image).toBeNull();
    });

    it('renders loaded image', async () => {
        (useGetLoadingImage as jest.Mock).mockImplementation(() => ({
            loading: false,
            image: 'https://example.com/image.jpg',
            getImage: jest.fn(),
        }));
        render(<PreviewImage link="https://example.com/image.jpg" />);

        const image = await screen.findByAltText('document');
        const spinner = screen.queryByTestId('spinner');

        expect(image).toBeInTheDocument();
        expect(spinner).toBeNull();
    });

    it('renders stub icon when no image is available', async () => {
        (useGetLoadingImage as jest.Mock).mockImplementation(() => ({
            loading: false,
            image: null,
            getImage: jest.fn(),
        }));
        const { container } = render(<PreviewImage link="" />);

        const stubIcon = container.querySelector('.stub-icon');
        const spinner = container.querySelector('.spinner');
        const image = container.querySelector('img');

        expect(stubIcon).toBeInTheDocument();
        expect(spinner).toBeNull();
        expect(image).toBeNull();
    });

    it('calls getImage with correct link on mount', () => {
        const getImageMock = jest.fn();
        (useGetLoadingImage as jest.Mock).mockImplementation(() => ({
            loading: false,
            image: null,
            getImage: getImageMock,
        }));

        render(<PreviewImage link="https://example.com/image.jpg" />);

        expect(getImageMock).toHaveBeenCalledWith(
            'https://example.com/image.jpg',
        );
    });
});
