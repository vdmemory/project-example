import { render } from '@testing-library/react';

import { PageLoader } from './PageLoader';
jest.useFakeTimers();
const setIsShowLoader = jest.fn();
describe('PageLoader', () => {
    it('should render successfully PageLoader', () => {
        const { baseElement } = render(<PageLoader />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully PageLoader with error message', () => {
        const { getByText } = render(
            <PageLoader errorMessage="error message" />,
        );
        expect(getByText('Error: error message')).toBeInTheDocument();
    });
    it('should render successfully PageLoader with  action setIsShowLoader ', () => {
        render(
            <PageLoader
                errorMessage="error message"
                setIsShowLoader={setIsShowLoader}
                isLoading={true}
            />,
        );
        jest.advanceTimersByTime(1200);
        expect(setIsShowLoader).toBeCalled();
    });
    it('should render successfully PageLoader with isEmpty true param', () => {
        const { baseElement } = render(<PageLoader isEmpty />);

        const loader = baseElement.querySelector('.loader-image');
        expect(loader).toBeFalsy();
    });
});
