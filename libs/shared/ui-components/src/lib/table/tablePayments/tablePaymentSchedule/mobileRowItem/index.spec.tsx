import React from 'react';
import { render, screen } from '@testing-library/react';
import MobileRowItem from './MobileRowItem';

describe('MobileRowItem Component', () => {
    it('renders title and value correctly', () => {
        render(<MobileRowItem title="Title" value="Value" />);

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Value')).toBeInTheDocument();
    });

    it('renders tooltip if tooltipText is provided', () => {
        render(
            <MobileRowItem
                title="Title"
                value="Value"
                tooltipText="Tooltip Text"
            />,
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Value')).toBeInTheDocument();
    });

    it('does not render tooltip if tooltipText is not provided', () => {
        render(<MobileRowItem title="Title" value="Value" />);

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Value')).toBeInTheDocument();
    });
});
