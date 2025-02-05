import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Filters, ProjectStatuses } from '@breef/shared/constants';
import CardForClient from './CardForClient';
import { ProgressItem, ProgressState } from '@breef/shared/types';
import { ReactNode, SyntheticEvent } from 'react';

type MatchMediaMock = {
    matches: boolean;
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
};

const matchMediaMock =
    (matches: boolean): (() => MatchMediaMock) =>
    () => ({
        matches,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    });

const handleClickCard = jest.fn();
const actionButtonClick = jest.fn();

const props = {
    handleClickCard,
    actionButtonClick,
    status: ProjectStatuses.pitchesShared,
    name: 'project test 1',
    buttonTitle: <p>SCHEDULE TIME</p>,
    isDisabledButton: false,
    tag: 'Test Tag',
    filterProjects: Filters.active,
    nextStep: 'shortlist agencies',
    activeProgressStep: 2,
    progress: [
        { name: 'Item 1', status: ProgressState.inProgress },
        { name: 'Item 2', status: ProgressState.disabled },
    ],
};
describe('CardForClient', () => {
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
        window.matchMedia = matchMediaMock(false) as unknown as (
            query: string,
        ) => MediaQueryList;
    });

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });
    it('should render successfully CardForClient', () => {
        const { baseElement } = render(<CardForClient {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully CardForClient with correct label next step', () => {
        const { getByText } = render(<CardForClient {...props} />);
        expect(getByText('Next Step:')).toBeInTheDocument();
    });
    it('should render successfully CardForClient with correct name', () => {
        const { getByText } = render(<CardForClient {...props} />);
        expect(getByText('project test 1')).toBeInTheDocument();
    });
    it('should render successfully CardForClient with correct tag', () => {
        const { getByText } = render(<CardForClient {...props} />);
        expect(getByText('Test Tag')).toBeInTheDocument();
    });
    it('should render successfully CardForClient with correct button text', () => {
        const { getByText } = render(<CardForClient {...props} />);
        expect(getByText('SCHEDULE TIME')).toBeInTheDocument();
    });
    it('should render successfully CardForClient with correct next step status', () => {
        const { getByText } = render(<CardForClient {...props} />);
        expect(getByText('shortlist agencies')).toBeInTheDocument();
    });
    it('should render successfully CardForClient with action', () => {
        const { baseElement } = render(<CardForClient {...props} />);
        const card = baseElement.getElementsByClassName('project-card')[0];
        fireEvent.click(card);
        expect(handleClickCard).toBeCalledTimes(1);
    });
    it('should render successfully CardForClient with action', () => {
        const { getByRole } = render(<CardForClient {...props} />);
        fireEvent.click(getByRole('button'));
        expect(actionButtonClick).toBeCalledTimes(1);
    });
});
