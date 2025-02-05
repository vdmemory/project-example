import { fireEvent, render, screen } from '@testing-library/react';
import ListDocuments, { ListItem } from './ListDocuments';

const onChange = jest.fn();

const props = {
    initList: [
        {
            id: 123,
            title: 'title initList',
            link: 'https://www.init_list.com',
        },
    ],
    onChange,
};

describe('ListDocument', () => {
    it('should render successfully ListDocuments', () => {
        const { baseElement } = render(<ListDocuments {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully ListDocuments with props', () => {
        render(<ListDocuments {...props} />);
        expect(screen.getByText('title initList')).toBeInTheDocument();
        expect(screen.getByText('title initList').getAttribute('href')).toEqual(
            'https://www.init_list.com',
        );
    });
    it('should render successfully ListDocuments with action', () => {
        const { getByTestId } = render(<ListDocuments {...props} />);
        const listItemBLock = getByTestId('list-item');
        fireEvent.click(listItemBLock);
        expect(onChange).toBeCalled();
    });
});

describe('ListItem', () => {
    it('renders item with link when type is "link"', () => {
        const item = {
            id: 1,
            title: 'Example Link',
            link: 'https://example.com',
            type: 'link',
            loading: false,
            onChange: jest.fn(),
            outsideLoading: false,
        };

        render(<ListItem {...item} />);

        const listItem = screen.getByTestId('list-item');
        const linkElement = screen.getByRole('link', { name: /example link/i });

        expect(listItem).toBeInTheDocument();
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'https://example.com');
    });

    it('renders item with spinner when loading is true', () => {
        const item = {
            id: 1,
            title: 'Example File',
            link: 'https://example.com/file.pdf',
            type: 'file',
            loading: true,
            onChange: jest.fn(),
            outsideLoading: false,
        };

        render(<ListItem {...item} />);

        const listItem = screen.getByTestId('list-item');
        const spinner = screen.getByTestId('spinner');

        expect(listItem).toBeInTheDocument();
        expect(spinner).toBeInTheDocument();
    });

    it('calls onChange with correct arguments when clicked on edit button', () => {
        const onChangeMock = jest.fn();
        const item = {
            id: 1,
            title: 'Example File',
            link: 'https://example.com/file.pdf',
            type: 'file',
            loading: false,
            onChange: onChangeMock,
            outsideLoading: false,
        };

        render(<ListItem {...item} />);

        const editButton = screen.getByTestId('list-item');
        fireEvent.click(editButton);

        expect(onChangeMock).toHaveBeenCalledWith(1, 'file', 'edit');
    });

    it('does not call onChange when loading or outsideLoading is true', () => {
        const onChangeMock = jest.fn();
        const item = {
            id: 1,
            title: 'Example File',
            link: 'https://example.com/file.pdf',
            type: 'file',
            loading: false,
            onChange: onChangeMock,
            outsideLoading: true,
        };

        render(<ListItem {...item} />);

        const editButton = screen.getByTestId('list-item');
        fireEvent.click(editButton);

        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it('calls onChange with correct arguments when clicked on delete button', () => {
        const onChangeMock = jest.fn();
        const item = {
            id: 1,
            title: 'Example File',
            link: 'https://example.com/file.pdf',
            type: 'file',
            loading: false,
            onChange: onChangeMock,
            outsideLoading: false,
        };

        render(<ListItem {...item} />);

        const deleteButton = screen.getByTestId('close-button');
        const closeIcon = screen.getByTestId('close-icon');
        expect(deleteButton).toBeInTheDocument();
        expect(closeIcon).toBeInTheDocument();

        fireEvent.click(deleteButton);

        expect(onChangeMock).toHaveBeenCalledWith(1, 'file', 'delete');
    });

    it('renders close button when not loading and outsideLoading', () => {
        const item = {
            id: 1,
            title: 'Example File',
            link: 'https://example.com/file.pdf',
            type: 'file',
            loading: false,
            onChange: jest.fn(),
            outsideLoading: true,
        };

        render(<ListItem {...item} />);

        const closeButton = screen.queryByTestId('close-button');
        const closeIcon = screen.queryByTestId('close-icon');

        expect(closeButton).not.toBeInTheDocument();
        expect(closeIcon).not.toBeInTheDocument();
    });

    it('renders close button when loading and not outsideLoading', () => {
        const item = {
            id: 1,
            title: 'Example File',
            link: 'https://example.com/file.pdf',
            type: 'file',
            loading: true,
            onChange: jest.fn(),
            outsideLoading: false,
        };

        render(<ListItem {...item} />);

        const closeButton = screen.queryByTestId('close-button');
        const closeIcon = screen.queryByTestId('close-icon');

        expect(closeButton).not.toBeInTheDocument();
        expect(closeIcon).not.toBeInTheDocument();
    });
});
