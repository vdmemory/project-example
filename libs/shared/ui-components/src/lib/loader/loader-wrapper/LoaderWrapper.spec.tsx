import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoaderWrapper } from './LoaderWrapper';

describe('LoaderWrapper', () => {
    it('renders DelayPageLoader for dashboard', () => {
        const mockHideLoader = jest.fn();

        render(
            <LoaderWrapper
                isDashboard={true}
                hideLoader={mockHideLoader}
                isEmpty={false}
                isLoading={true}
                errorMessage=""
            />,
        );

        const delayPageLoader = screen.getByTestId('delay-page-loader');
        expect(delayPageLoader).toBeInTheDocument();

        expect(mockHideLoader).toHaveBeenCalledTimes(0);
    });

    it('renders PageLoader for non-dashboard', () => {
        const mockHideLoader = jest.fn();

        render(
            <LoaderWrapper
                isDashboard={false}
                hideLoader={mockHideLoader}
                isEmpty={false}
                isLoading={true}
                errorMessage=""
            />,
        );

        const pageLoader = screen.getByTestId('page-loader');
        expect(pageLoader).toBeInTheDocument();

        expect(mockHideLoader).toHaveBeenCalledTimes(0);
    });

    it('renders text for dashboard', () => {
        const mockHideLoader = jest.fn();

        render(
            <LoaderWrapper
                isDashboard={true}
                hideLoader={mockHideLoader}
                isEmpty={false}
                isLoading={true}
                errorMessage=""
            />,
        );

        expect(screen.getByText('we are')).toBeInTheDocument();
        expect(
            screen.getByText('CONNECTING YOU WITH THE BEST BRANDS'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('MAKING PROJECT SCOPING EASY'),
        ).toBeInTheDocument();
        expect(screen.getByText('SIMPLIFYING PAYMENTS')).toBeInTheDocument();
        expect(screen.getByText('DASHBOARD IN 3..')).toBeInTheDocument();
    });
});
