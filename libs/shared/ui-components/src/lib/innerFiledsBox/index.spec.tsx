import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InnerFieldsBox from './InnerFieldsBox';

jest.mock('./InnerFieldsBox.styled', () => ({
    StyledInnerFieldsBox: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}));

describe('InnerFieldsBox', () => {
    it('renders correctly with children', () => {
        render(
            <InnerFieldsBox>
                <div>Child 1</div>
                <div>Child 2</div>
            </InnerFieldsBox>,
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
});
