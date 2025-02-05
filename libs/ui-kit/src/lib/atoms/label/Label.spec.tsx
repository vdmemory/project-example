import { render, screen } from '@testing-library/react';
import Label from './Label.component';

const props = {
    id: 'id',
    forId: 'test id',
    text: 'test text',
    subtext: 'test subtext',
    isOptional: false,
    isDisabled: false,
};
const children = <div>test children</div>;
describe('Label', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Label {...props}>{children}</Label>);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test text')).toBeInTheDocument();
        expect(screen.getByText('test subtext')).toBeInTheDocument();
        expect(screen.getByText('test children')).toBeInTheDocument();
    });
    it('should render with optional text successfully', () => {
        render(
            <Label {...props} isOptional>
                {children}
            </Label>,
        );
        expect(screen.getByText('(optional)')).toBeInTheDocument();
    });
});
