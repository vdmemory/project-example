import { render } from '@testing-library/react';
import { ScreenWrapper } from './ScreenWrapper';

describe('Placeholder', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ScreenWrapper title="title">
                <div>Test</div>
            </ScreenWrapper>,
        );
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully title', () => {
        const { getByText } = render(
            <ScreenWrapper title="title">
                <div>Test</div>
            </ScreenWrapper>,
        );
        expect(getByText('title')).toBeInTheDocument();
    });
    it('should render successfully children element', () => {
        const { getByText } = render(
            <ScreenWrapper title="title">
                <div>Test</div>
            </ScreenWrapper>,
        );
        expect(getByText('Test')).toBeInTheDocument();
    });
    it('should render successfully description', () => {
        const { getByText } = render(
            <ScreenWrapper title="title" description="description">
                <div>Test</div>
            </ScreenWrapper>,
        );
        expect(getByText('description')).toBeInTheDocument();
    });
    it('should render successfully not description', () => {
        const { queryByText } = render(
            <ScreenWrapper title="title">
                <div>Test</div>
            </ScreenWrapper>,
        );
        expect(queryByText('description')).toBe(null);
    });
});
