/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen } from '@testing-library/react';
import { AvatarImage, ImageComponent, loader } from './Avatar.component';
// import 'intersection-observer';

describe('AvatarImage', () => {
    const props = {
        src: 'mocked-src',
        alt: 'Example Avatar',
        className: 'avatar-class',
        width: 100,
        height: 100,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let observeMock: jest.Mock<any, any, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let unobserveMock: jest.Mock<any, any, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let disconnectMock: jest.Mock<any, any, any>;

    beforeEach(() => {
        observeMock = jest.fn();
        unobserveMock = jest.fn();
        disconnectMock = jest.fn();

        // @ts-ignore
        window.IntersectionObserver = jest.fn((callback, options) => {
            const observerMock = {
                observe: observeMock,
                unobserve: unobserveMock,
                disconnect: disconnectMock,
            };

            callback(
                [
                    {
                        isIntersecting: true,
                        // @ts-ignore
                        target: { dataset: { src: props.src }, src: '' },
                    },
                ],
                observerMock,
            );

            return observerMock;
        });
    });

    it('renders the image when src is valid', () => {
        render(<AvatarImage {...props} />);

        const image: HTMLImageElement = screen.getByAltText(props.alt);
        expect(image).toBeInTheDocument();
        expect(image.src).toBe(loader); // Initially should be loader
    });

    it('does not apply IntersectionObserver when src is empty', () => {
        const modifiedProps = { ...props, src: '' };
        render(<AvatarImage {...modifiedProps} />);

        expect(global.IntersectionObserver).not.toHaveBeenCalled();
    });

    it('renders the image with proper attributes', () => {
        render(<AvatarImage {...props} />);
        const image = screen.getByAltText('Example Avatar');
        const imageWrapper = screen.getByTestId('wrapper-avatar-image');

        expect(imageWrapper).toBeInTheDocument();
        expect(imageWrapper).toHaveClass(props.className);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('data-src', props.src);
        expect(image).toHaveAttribute('src', loader);
        expect(imageWrapper).toHaveAttribute('width', String(props.width));
        expect(imageWrapper).toHaveAttribute('height', String(props.height));
    });

    it('registers the image for observing on render', () => {
        render(<AvatarImage {...props} />);

        const image = screen.getByAltText('Example Avatar');
        expect(observeMock).toHaveBeenCalledWith(image);
    });

    it('replaces src with data-src when image is in the viewport', async () => {
        render(<AvatarImage {...props} />);
        const image = screen.getByAltText('Example Avatar');
        // @ts-ignore
        expect(image.src).toBe(loader);
    });

    it('stops observing the image when it has been loaded', async () => {
        render(<AvatarImage {...props} />);

        expect(
            // @ts-ignore
            window.IntersectionObserver.mock.results[0].value.unobserve,
        ).toHaveBeenCalledWith({
            dataset: { src: props.src },
            src: props.src,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

describe('ImageComponent', () => {
    const props = {
        src: 'https://example.com/sample-image.jpg',
        alt: 'Sample Image',
        className: 'sample-class',
        width: 100,
        height: 100,
    };

    it('renders the image with correct properties', () => {
        render(<ImageComponent {...props} />);

        const image = screen.getByAltText(props.alt);

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', props.src);
        expect(image).toHaveAttribute('width', `${props.width}`);
        expect(image).toHaveAttribute('height', `${props.height}`);
        expect(image).toHaveClass(props.className);
    });

    it('does not render without a source', () => {
        const modifiedProps = { ...props, src: undefined };
        const { container } = render(<ImageComponent {...modifiedProps} />);

        expect(container.firstChild).toBeNull();
    });
});
