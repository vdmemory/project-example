import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import { InnerContractsWrapper } from './InnerContractsWrapper';
import {
    useCreateObjectFilesMutation,
    useSetFilesMutation,
} from '@breef/shared/data-access-upload';
import {
    useDocumentController,
    useMediaContext,
    useSaveDocument,
} from '@breef/shared/hooks';

type MockEmptyType = {
    id?: string | number | null | undefined;
    title: string;
    link: string;
    type?: string | undefined;
    loading?: boolean | undefined;
}[];

jest.mock('@breef/shared/data-access-upload');
(useCreateObjectFilesMutation as jest.Mock).mockReturnValue([jest.fn()]);
(useSetFilesMutation as jest.Mock).mockReturnValue([jest.fn()]);

jest.mock('@breef/shared/hooks');
(useDocumentController as jest.Mock).mockReturnValue({
    saveDocument: jest.fn(),
    handleDeleteLink: jest.fn(),
    handleEditLink: jest.fn(),
    handleAddLink: jest.fn(),
});

(useSaveDocument as jest.Mock).mockReturnValue({
    saveDocument: jest.fn(),
});

const { result: docController } = renderHook(() =>
    useDocumentController({
        documentsValue: [],
        onChange: jest.fn(),
    }),
);

jest.mock('@breef/shared/hooks');
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMobile: false,
}));

describe('InnerContractsWrapper', () => {
    const mockLabelMain = 'Main Label';
    const mockLabelAdditional = 'Additional Label';
    const mockValue = [
        { id: 1, title: 'File 1', link: 'file1.pdf', loading: false },
        { id: 2, title: 'File 2', link: 'file2.pdf', loading: false },
    ];
    const mockOnChange = jest.fn();
    const mockMaxCount = 2;
    const mockIsDisableFileLinks = false;

    it('renders without crashing', () => {
        render(
            <InnerContractsWrapper
                labelMain={mockLabelMain}
                labelAdditional={mockLabelAdditional}
                value={mockValue}
                onChange={mockOnChange}
                maxCount={mockMaxCount}
                isDisableFileLinks={mockIsDisableFileLinks}
            />,
        );
        expect(screen.getByText(mockLabelMain)).toBeInTheDocument();
    });

    it('displays file components based on the value prop', () => {
        render(
            <InnerContractsWrapper
                labelMain={mockLabelMain}
                labelAdditional={mockLabelAdditional}
                value={mockValue}
                onChange={mockOnChange}
                maxCount={mockMaxCount}
                isDisableFileLinks={mockIsDisableFileLinks}
            />,
        );
        expect(screen.getByText('File 1')).toBeInTheDocument();
        expect(screen.getByText('File 2')).toBeInTheDocument();
    });

    it('calls onChange when a file is removed', () => {
        render(
            <InnerContractsWrapper
                labelMain={mockLabelMain}
                labelAdditional={mockLabelAdditional}
                value={mockValue}
                onChange={mockOnChange}
                maxCount={mockMaxCount}
                isDisableFileLinks={mockIsDisableFileLinks}
            />,
        );
        const removeButton = screen.getAllByTestId('remove-button')[0];
        fireEvent.click(removeButton);
        expect(docController.current.handleDeleteLink).toHaveBeenCalledTimes(1);
    });

    it('renders a dropzone when the max count is not reached', () => {
        const mockEmptyValue: MockEmptyType = [];
        render(
            <InnerContractsWrapper
                labelMain={mockLabelMain}
                labelAdditional={mockLabelAdditional}
                value={mockEmptyValue}
                onChange={mockOnChange}
                maxCount={mockMaxCount}
                isDisableFileLinks={mockIsDisableFileLinks}
            />,
        );
        const dropzone = screen.getByText('Upload or Drag and Drop');
        const tip = screen.getByText('*Max file size 10MB. PDF only.');
        const label = screen.getByText('Main Label');
        expect(dropzone).toBeInTheDocument();
        expect(tip).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });
});
