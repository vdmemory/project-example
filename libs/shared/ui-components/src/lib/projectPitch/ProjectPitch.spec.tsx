import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectPitch from './ProjectPitch';

const defaultProps = {
    pitchText: 'Test Pitch Text',
    emojis: ['1', '2'],
    values: 'test values',
    files: [
        {
            id: 1,
            title: 'test file',
            link: 'test.link.com',
            type: 'file',
        },
    ],
    miscNotes: 'Test Misc Notes',
    miscNotesGif: 'test-gif',
    companyName: 'Test Company Name',
};
describe('ProjectPitch', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <ProjectPitch {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Pitch Text')).toBeInTheDocument();
        expect(getByText('Test Misc Notes')).toBeInTheDocument();
        expect(
            getByText('Emojis representing Test Company Name'),
        ).toBeInTheDocument();
        expect(getByText('test values')).toBeInTheDocument();
        expect(getByTestId('emojis-wrapper')).toBeInTheDocument();
        expect(getByTestId('misc-notes-gif-image')).toBeInTheDocument();
        expect(
            document.getElementsByClassName('card-documents-link').length,
        ).not.toBe(0);
    });
});
