import { render, screen, fireEvent } from '@testing-library/react';
import { FileItem, renderFileTypeIcon } from './FileItem';

describe('FileItem', () => {
    const mockTitle = 'TestFile.pdf';
    const mockLink = 'https://example.com/TestFile.pdf';
    const mockOnRemove = jest.fn();
    window.open = jest.fn();

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders without crashing', () => {
        render(<FileItem title={mockTitle} />);
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
    });

    it('displays correct file type icon pdf on file extension', () => {
        render(<FileItem title={mockTitle} />);

        const pdfIcon = screen.getByTestId('pdf-file-type');
        expect(pdfIcon).toBeInTheDocument();
    });

    it('displays correct file type icon based on file extension', () => {
        render(<FileItem title="TestFile.doc" />);

        const docIcon = screen.getByTestId('doc-file-type');
        expect(docIcon).toBeInTheDocument();
    });

    it('displays correct file type icon based on file extension', () => {
        render(<FileItem title="TestFile.jpg" />);

        const jpgIcon = screen.getByTestId('jpg-file-type');
        expect(jpgIcon).toBeInTheDocument();
    });

    it('displays correct file type icon based on file extension', () => {
        render(<FileItem title="TestFile.png" />);

        const pngIcon = screen.getByTestId('png-file-type');
        expect(pngIcon).toBeInTheDocument();
    });

    it('displays correct file type icon based on file extension', () => {
        render(<FileItem title="TestFile" />);

        const defaultIcon = screen.getByTestId('default-file-type');
        expect(defaultIcon).toBeInTheDocument();
    });

    it('opens file link in a new tab when clicked', () => {
        render(<FileItem title={mockTitle} link={mockLink} />);
        const fileItem = screen.getByText(mockTitle);
        fireEvent.click(fileItem);
        expect(window.open).toHaveBeenCalledWith(mockLink, '_blank');
    });

    it('calls onRemove function when remove button is clicked', () => {
        render(<FileItem title={mockTitle} onRemove={mockOnRemove} />);
        const removeButton = screen.getByRole('button');
        fireEvent.click(removeButton);
        expect(mockOnRemove).toHaveBeenCalledTimes(1);
    });

    it('does not render remove button when onRemove prop is not provided', () => {
        render(<FileItem title={mockTitle} />);
        const removeButton = screen.queryByRole('button');
        expect(removeButton).not.toBeInTheDocument();
    });

    it('does not open file link when link is not provided', () => {
        render(<FileItem title={mockTitle} />);
        const fileItem = screen.getByText(mockTitle);
        fireEvent.click(fileItem);
        expect(window.open).not.toHaveBeenCalled();
    });
});

describe('renderFileTypeIcon', () => {
    // Mock the file type icons
    const DocFileTypeIcon = () => <div data-testid="doc-file-type">DOC</div>;
    const PdfFileTypeIcon = () => <div data-testid="pdf-file-type">PDF</div>;
    const JpgFileTypeIcon = () => <div data-testid="jpg-file-type">JPG</div>;
    const PngFileTypeIcon = () => <div data-testid="png-file-type">PNG</div>;
    const UnknownFileTypeIcon = () => (
        <div data-testid="default-file-type">UNKNOWN</div>
    );

    jest.mock('@breef/shared/assets', () => DocFileTypeIcon);
    jest.mock('@breef/shared/assets', () => PdfFileTypeIcon);
    jest.mock('@breef/shared/assets', () => JpgFileTypeIcon);
    jest.mock('@breef/shared/assets', () => PngFileTypeIcon);
    jest.mock('@breef/shared/assets', () => UnknownFileTypeIcon);

    it('should render DocFileTypeIcon for .doc files', () => {
        const { getByTestId } = render(renderFileTypeIcon('document.doc'));
        expect(getByTestId('doc-file-type')).toBeInTheDocument();
    });

    it('should render DocFileTypeIcon for .docx files', () => {
        const { getByTestId } = render(renderFileTypeIcon('document.docx'));
        expect(getByTestId('doc-file-type')).toBeInTheDocument();
    });

    it('should render PdfFileTypeIcon for .pdf files', () => {
        const { getByTestId } = render(renderFileTypeIcon('document.pdf'));
        expect(getByTestId('pdf-file-type')).toBeInTheDocument();
    });

    it('should render JpgFileTypeIcon for .jpg files', () => {
        const { getByTestId } = render(renderFileTypeIcon('image.jpg'));
        expect(getByTestId('jpg-file-type')).toBeInTheDocument();
    });

    it('should render JpgFileTypeIcon for .jpeg files', () => {
        const { getByTestId } = render(renderFileTypeIcon('image.jpeg'));
        expect(getByTestId('jpg-file-type')).toBeInTheDocument();
    });

    it('should render PngFileTypeIcon for .png files', () => {
        const { getByTestId } = render(renderFileTypeIcon('image.png'));
        expect(getByTestId('png-file-type')).toBeInTheDocument();
    });

    it('should render DocFileTypeIcon for .doc files with URL', () => {
        const { getByTestId } = render(
            renderFileTypeIcon('', 'http://example.com/document.doc'),
        );
        expect(getByTestId('doc-file-type')).toBeInTheDocument();
    });

    it('should render PdfFileTypeIcon for .pdf files with URL', () => {
        const { getByTestId } = render(
            renderFileTypeIcon('', 'http://example.com/document.pdf'),
        );
        expect(getByTestId('pdf-file-type')).toBeInTheDocument();
    });

    it('should render JpgFileTypeIcon for .jpg files with URL', () => {
        const { getByTestId } = render(
            renderFileTypeIcon('', 'http://example.com/image.jpg'),
        );
        expect(getByTestId('jpg-file-type')).toBeInTheDocument();
    });

    it('should render PngFileTypeIcon for .png files with URL', () => {
        const { getByTestId } = render(
            renderFileTypeIcon('', 'http://example.com/image.png'),
        );
        expect(getByTestId('png-file-type')).toBeInTheDocument();
    });

    it('should render UnknownFileTypeIcon for unknown file types', () => {
        const { getByTestId } = render(renderFileTypeIcon('unknownfile.xyz'));
        expect(getByTestId('default-file-type')).toBeInTheDocument();
    });
});
