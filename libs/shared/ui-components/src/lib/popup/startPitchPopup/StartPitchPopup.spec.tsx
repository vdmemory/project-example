import { logout } from '@breef/shared/utils';
import { fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/router';
import { StartPitchPopup } from './StartPitchPopup';

const handleClose = jest.fn();
const handleSubmit = jest.fn();

const props = {
    title: 'title',
    description: 'description',
    children: 'children',
    buttonTitle: 'buttonTitle',
    onSubmit: handleClose,
    onClose: handleSubmit,
};

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
});

jest.mock('@breef/shared/utils', () => ({
    ...jest.requireActual('@breef/shared/utils'),
    logout: jest.fn(),
}));

describe('StartPitchPopup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<StartPitchPopup {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render StartPitchPopup', () => {
        const testCases = [
            { name: 'Projects nav link', expected: 'Projects' },
            { name: 'Profile nav link', expected: 'Profile' },
            { name: 'Log out nav link', expected: 'Log out' },
            { name: 'form title', expected: 'title' },
            { name: 'form description', expected: 'description' },
            { name: 'form children', expected: 'children' },
            { name: 'form submit button', expected: 'buttonTitle' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully StartPitchPopup with ${testCase.name}`, () => {
                const { getByText } = render(<StartPitchPopup {...props} />);
                const element = getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });

    it(`should render successfully StartPitchPopup with navigation`, () => {
        render(<StartPitchPopup {...props} />);
        const element = document.querySelector('.nav-control');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully StartPitchPopup with logo`, () => {
        render(<StartPitchPopup {...props} />);
        const element = document.querySelector('.link-logo');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully StartPitchPopup with button humbugger`, () => {
        render(<StartPitchPopup {...props} />);
        const element = document.querySelector('.button-hamburger');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully StartPitchPopup with popup window`, () => {
        render(<StartPitchPopup {...props} />);
        const element = document.querySelector('.modal-pop');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully StartPitchPopup with popup overlay`, () => {
        render(<StartPitchPopup {...props} />);
        const element = document.querySelector('.modal-overlay');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully StartPitchPopup with image in left section`, () => {
        render(<StartPitchPopup {...props} />);
        const element = document.querySelector('.pitch-popup-start');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully StartPitchPopup with save button`, () => {
        render(<StartPitchPopup {...props} />);
        const element = document.querySelector('.button-save') as HTMLElement;
        expect(element).toBeInTheDocument();

        fireEvent.click(element);
        expect(handleClose).toHaveBeenCalled();
    });

    it(`should render successfully StartPitchPopup with close button`, () => {
        const updateProps = {
            ...props,
            isSubmitted: true,
        };
        render(<StartPitchPopup {...updateProps} />);
        const element = document.querySelector('.loader');
        expect(element).toBeInTheDocument();
    });

    it(`calls navigation function on click projects`, () => {
        const updateProps = {
            ...props,
            isSubmitted: true,
        };
        const { baseElement } = render(<StartPitchPopup {...updateProps} />);
        const liProjects = baseElement.querySelector(
            'li[value="projects"]',
        ) as HTMLElement;
        expect(liProjects).toBeInTheDocument();

        fireEvent.click(liProjects);
        expect(useRouter().push).toHaveBeenCalled();
    });

    it(`calls navigation function on click profile`, () => {
        const updateProps = {
            ...props,
            isSubmitted: true,
        };
        const { baseElement } = render(<StartPitchPopup {...updateProps} />);

        const liProfile = baseElement.querySelector(
            'li[value="profile"]',
        ) as HTMLElement;
        expect(liProfile).toBeInTheDocument();

        fireEvent.click(liProfile);
        expect(useRouter().push).toHaveBeenCalled();
    });

    it(`calls navigation function on click logout`, () => {
        const updateProps = {
            ...props,
            isSubmitted: true,
        };
        const { baseElement } = render(<StartPitchPopup {...updateProps} />);

        const liLogout = baseElement.querySelector(
            'li[value="logout"]',
        ) as HTMLElement;
        expect(liLogout).toBeInTheDocument();

        fireEvent.click(liLogout);
        expect(logout).toHaveBeenCalled();
    });
});
