import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProjectCreator } from './ProjectCreator';
import { useRouter } from 'next/router';
import { useCreatorSkills } from '../../../hooks/useCreatorSkills';
import { useCreatorCreateProjectMutation } from '@breef/shared/data-access-project-create';
import { toast } from 'react-toastify';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../../../hooks/useCreatorSkills', () => ({
    useCreatorSkills: jest.fn(),
}));

jest.mock('@breef/shared/data-access-project-create', () => ({
    useCreatorCreateProjectMutation: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

describe('ProjectCreator', () => {
    const mockSkills = [
        { id: 1, name: 'Skill 1' },
        { id: 2, name: 'Skill 2' },
        { id: 3, name: 'Skill 3' },
        { id: 4, name: 'Skill 4' },
    ];

    const mockCreateProject = jest.fn().mockReturnValue({
        unwrap: jest.fn().mockResolvedValue('projectId'),
    });

    const mockPush = jest.fn();

    beforeEach(() => {
        (useCreatorSkills as jest.Mock).mockReturnValue(mockSkills);
        (useCreatorCreateProjectMutation as jest.Mock).mockReturnValue([
            mockCreateProject,
        ]);
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(<ProjectCreator />);

        expect(screen.getByText('PROJECT CREATOR')).toBeInTheDocument();
        expect(screen.getByText('START A PROJECT')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Select the agency skills you need for your next project.',
            ),
        ).toBeInTheDocument();

        mockSkills.forEach(skill => {
            expect(screen.getByLabelText(skill.name)).toBeInTheDocument();
        });
    });

    it('handles skill selection correctly', () => {
        render(<ProjectCreator />);

        const skillCheckbox = screen.getByLabelText('Skill 1');
        fireEvent.click(skillCheckbox);

        expect(skillCheckbox).toBeChecked();

        fireEvent.click(skillCheckbox);
        expect(skillCheckbox).not.toBeChecked();
    });

    it('disables button when no skill is selected', () => {
        render(<ProjectCreator />);

        const addButton = screen.getByRole('button', { name: /Add Details/i });
        expect(addButton).toBeDisabled();
    });

    it('disables button when more than 3 skills are selected', () => {
        render(<ProjectCreator />);

        mockSkills.slice(0, 3).forEach(skill => {
            const skillCheckbox = screen.getByLabelText(skill.name);
            fireEvent.click(skillCheckbox);
        });

        const addButton = screen.getByRole('button', { name: /Add Details/i });
        expect(addButton).not.toBeDisabled();

        const skillCheckbox = screen.getByLabelText('Skill 4');
        fireEvent.click(skillCheckbox);

        expect(addButton).toBeDisabled();
    });

    it('creates project and navigates to edit route on button click', async () => {
        render(<ProjectCreator />);

        const skillCheckbox = screen.getByLabelText('Skill 1');
        fireEvent.click(skillCheckbox);

        const addButton = screen.getByRole('button', { name: /Add Details/i });
        fireEvent.click(addButton);

        expect(mockCreateProject).toHaveBeenCalledWith([1]);
    });

    it('creates project and navigates to edit route on button click', async () => {
        render(<ProjectCreator />);

        const skillCheckbox = screen.getByLabelText('Skill 1');
        fireEvent.click(skillCheckbox);

        const addButton = screen.getByRole('button', { name: /Add Details/i });
        fireEvent.click(addButton);

        expect(mockCreateProject).toHaveBeenCalledWith([1]);

        await waitFor(() =>
            expect(mockPush).toHaveBeenCalledWith(
                {
                    pathname: expect.stringContaining(
                        '/project/projectId/edit',
                    ),
                    query: { popup: true },
                },
                undefined,
                { shallow: true },
            ),
        );
    });

    it('shows error toast on project creation failure', async () => {
        mockCreateProject.mockReturnValueOnce({
            unwrap: jest
                .fn()
                .mockRejectedValue(new Error('Error creating project')),
        });

        render(<ProjectCreator />);

        const skillCheckbox = screen.getByLabelText('Skill 1');
        fireEvent.click(skillCheckbox);

        const addButton = screen.getByRole('button', { name: /Add Details/i });
        fireEvent.click(addButton);

        await waitFor(() =>
            expect(toast.error).toHaveBeenCalledWith(
                'Something went wrong when creating project.',
                { toastId: 'Something went wrong when creating project.' },
            ),
        );
    });
});
