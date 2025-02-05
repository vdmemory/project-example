import { fireEvent, render } from '@testing-library/react';
import Button from './Button.component';
import { ArrowRightIcon } from '../../icons';

const onClick = jest.fn();
const props = {
    label: 'Test Label',
    onClick,
};

type MatchMediaMock = {
    matches: boolean;
};

const matchMediaMock =
    (matches: boolean): (() => MatchMediaMock) =>
    () => ({
        matches,
    });

describe('Button', () => {
    beforeEach(() => {
        window.matchMedia = matchMediaMock(false) as unknown as (
            query: string,
        ) => MediaQueryList;
    });

    it('should render successfully', () => {
        const { baseElement, getByText } = render(<Button {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Label')).toBeInTheDocument();
    });
    it('should call onClick successfully', () => {
        const { getByTestId } = render(<Button {...props} />);
        const button = getByTestId('button-container');
        fireEvent.click(button);
        expect(onClick).toBeCalled();
    });
    it('should display loader if successfully', () => {
        const { getByTestId } = render(<Button {...props} isSubmitted />);
        expect(getByTestId('loader')).toBeInTheDocument();
    });
    it('should render with icons successfully', () => {
        const { getByTestId } = render(
            <Button
                {...props}
                icon={<ArrowRightIcon data-testid="custom-icon" />}
                iconPlacement="left"
            />,
        );
        expect(getByTestId('custom-icon')).toBeInTheDocument();
    });
});
