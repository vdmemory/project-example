import { render, screen } from '@testing-library/react';
import { DocumentPreviewer } from './DocumentPreviewer';

const props = {
    label: 'document preview label',
};

describe('DocumentPreviewer', () => {
    it('should render successfully DocumentPreviewer', () => {
        const { baseElement } = render(<DocumentPreviewer {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('document preview label'));
    });
    it('should render successfully DocumentPreviewer without link', () => {
        render(<DocumentPreviewer link="" {...props} />);
        expect(
            screen.getByText('document preview label').getAttribute('href'),
        ).toBeNull();
    });
});
