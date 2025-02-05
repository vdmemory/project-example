import { render, screen } from '@testing-library/react';
import LabelOld from './LabelOld.component';

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
        const { baseElement } = render(
            <LabelOld {...props}>{children}</LabelOld>,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test text')).toBeInTheDocument();
        expect(screen.getByText('test subtext')).toBeInTheDocument();
        expect(screen.getByText('test children')).toBeInTheDocument();
    });
    it('should render with optional text successfully', () => {
        render(
            <LabelOld {...props} isOptional>
                {children}
            </LabelOld>,
        );
        expect(screen.getByText('(optional)')).toBeInTheDocument();
    });
});
