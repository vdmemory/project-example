import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
import ErrorBoundary from './ErrorBoundary';
import { useRouter } from 'next/router';
import { useRouteControl } from '@breef/shared/hooks';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
jest.mock('@breef/shared/hooks', () => ({
    useRouteControl: jest.fn(),
}));

describe('ErrorBoundary', () => {
    (useRouter as jest.Mock).mockReturnValue({
        route: '/404',
        asPath: '/projects/some-project',
    });
    (useRouteControl as jest.Mock).mockReturnValue({
        changePage: jest.fn(),
    });

    it('renders error message and image', () => {
        const { getByAltText, getByText } = render(<ErrorBoundary />);
        const errorMessage = getByText("Something's not right at all");
        const errorImage = getByAltText('Heart Break');

        expect(errorMessage).toBeInTheDocument();
        expect(errorImage).toBeInTheDocument();
    });

    it('calls changePage when route is /404 and old route is detected', () => {
        (useRouter as jest.Mock).mockReturnValue({
            route: '/404',
            asPath: '/projects/old-route',
        });

        const changePageMock = jest.fn();
        (useRouteControl as jest.Mock).mockReturnValue({
            changePage: changePageMock,
        });

        render(<ErrorBoundary />);

        expect(changePageMock).toHaveBeenCalledWith('/');
    });

    it('does not call changePage when route is not /404', () => {
        (useRouter as jest.Mock).mockReturnValue({
            route: '/',
            asPath: '/',
        });

        const { rerender } = render(<ErrorBoundary />);
        const changePageMock = jest.fn();
        (useRouteControl as jest.Mock).mockReturnValue({
            changePage: changePageMock,
        });

        rerender(<ErrorBoundary />);
        expect(changePageMock).not.toHaveBeenCalled();
    });
});
