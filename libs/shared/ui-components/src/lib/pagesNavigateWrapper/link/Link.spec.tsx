import { render } from '@testing-library/react';

import { NavigateLink } from './Link';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/projects',
            pathname: '',
            asPath: '/asPath',
        };
    },
}));
describe('Link', () => {
    it('should render successfully', () => {
        const { baseElement, getByRole, queryByRole } = render(
            <NavigateLink route={'/route'} typeChildren="link" />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByRole('link')).toBeDefined();
        expect(getByRole('link').getAttribute('href')).toEqual('/route');

        expect(queryByRole('button')).toBeNull();
    });
    it('should render successfully', () => {
        const { baseElement, getByRole, queryByRole } = render(
            <NavigateLink route={'/'} typeChildren="button" />,
        );
        expect(baseElement).toBeTruthy();
        expect(queryByRole('link')).toBeNull();
        expect(getByRole('button')).toBeDefined();
    });
});
