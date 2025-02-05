import { render, screen, fireEvent } from '@testing-library/react';
import { WorkCard, ProjectLink } from './WorkCard';

describe('WorkCard', () => {
    const mockWorkData = {
        titleFirst: 'Project Title',
        titleLast: 'Sub Title',
        description: 'Project description',
        projectLinks: [
            { title: 'Link 1', link: 'https://example.com/link1' },
            { title: 'Link 2', link: 'https://example.com/link2' },
        ],
        documents: [
            {
                id: 1,
                title: 'Document 1',
                link: 'https://example.com/doc1.pdf',
            },
            {
                id: 2,
                title: 'Document 2',
                link: 'https://example.com/doc2.pdf',
            },
        ],
        rate: { price: '$100', type: 'One-time' },
    };

    it('renders WorkCard component correctly', () => {
        const { baseElement } = render(<WorkCard workData={mockWorkData} />);

        expect(baseElement.querySelector('.rate')).toBeInTheDocument();
        expect(screen.getByText('Project Title')).toBeInTheDocument();
        expect(screen.getByText('Sub Title')).toBeInTheDocument();
        expect(screen.getByText('Project description')).toBeInTheDocument();
        expect(screen.getByText('Link 1')).toBeInTheDocument();
        expect(screen.getByText('Link 2')).toBeInTheDocument();
        expect(screen.getByText('Document 1')).toBeInTheDocument();
        expect(screen.getByText('Document 2')).toBeInTheDocument();
    });

    it('renders ProjectLink component correctly', () => {
        render(
            <ProjectLink title="Test Link" url="https://example.com/test" />,
        );

        const linkElement = screen.getByText('Test Link');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'https://example.com/test');
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noreferrer');
    });

    it('handles edit button click', () => {
        const mockOnClick = jest.fn();
        const { baseElement } = render(
            <WorkCard workData={mockWorkData} onClick={mockOnClick} />,
        );

        const editButton = baseElement.querySelector(
            '.edit-button',
        ) as HTMLButtonElement;
        fireEvent.click(editButton);

        expect(mockOnClick).toHaveBeenCalledWith('edit');
    });

    it('handles remove button click', () => {
        const mockOnClick = jest.fn();
        const { baseElement } = render(
            <WorkCard workData={mockWorkData} onClick={mockOnClick} />,
        );

        const removeButton = baseElement.querySelector(
            '.trash-button',
        ) as HTMLButtonElement;
        fireEvent.click(removeButton);

        expect(mockOnClick).toHaveBeenCalledWith('remove');
    });
});
