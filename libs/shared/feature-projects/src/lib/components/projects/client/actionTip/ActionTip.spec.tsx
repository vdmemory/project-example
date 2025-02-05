import { render, screen } from '@testing-library/react';
import { ActionTip } from './ActionTip';

type MatchMediaMock = {
    matches: boolean;
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
};

const matchMediaMock =
    (matches: boolean): (() => MatchMediaMock) =>
    () => ({
        matches,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    });
const mockOnClick = jest.fn();
const props = {
    title: 'tip title',
    onClick: mockOnClick,
    btnTitle: 'btn title',
    tag: 'Test Tag',
    description: 'Test description',
};

describe('ActionTip', () => {
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
        window.matchMedia = matchMediaMock(false) as unknown as (
            query: string,
        ) => MediaQueryList;
    });

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    it('should render successfully', () => {
        const { baseElement } = render(<ActionTip {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('tip title')).toBeInTheDocument();
        expect(screen.getByText('btn title')).toBeInTheDocument();
        expect(screen.getByText('Test Tag')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    // it('should call onClick handler on button click successfully', () => {
    //     const { getByTestId } = render(<ActionTip {...props} />);
    //     const button = getByTestId('custom-button');
    //     fireEvent.click(button);
    //     expect(mockOnClick).toBeCalledTimes(1);
    // });
});
