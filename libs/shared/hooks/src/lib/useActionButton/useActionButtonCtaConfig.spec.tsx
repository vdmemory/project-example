import { renderHook } from '@testing-library/react-hooks';
import { useActionButtonCtaConfig } from './useActionButtonCtaConfig';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: jest.fn(),
            isReady: true,
        };
    },
}));

describe('useActionButtonCtaConfig', () => {
    it('should return client action button CTA statuses when projects count is 0', () => {
        const projectsViewSettingsBarRef = { current: null };
        const toggleBookACallPopup = jest.fn();
        const brandLead = {
            firstName: 'John',
            lastName: 'Doe',
        };

        const { result } = renderHook(() =>
            useActionButtonCtaConfig({
                projectsViewSettingsBarRef,
                toggleBookACallPopup,
                brandLead,
            }),
        );

        expect(result.current.clientActionButtonCtaStatuses).toHaveProperty(
            'noProjects',
        );
        expect(
            result.current.clientActionButtonCtaStatuses.noProjects,
        ).toHaveProperty('text', 'Start Project');
        expect(
            result.current.clientActionButtonCtaStatuses.noProjects,
        ).toHaveProperty('description', 'CREATE YOUR FIRST PROJECT');
        expect(
            result.current.clientActionButtonCtaStatuses.noProjects,
        ).toHaveProperty('descriptionSubtext');
        expect(
            result.current.clientActionButtonCtaStatuses.noProjects,
        ).toHaveProperty('brandLeadText');
        expect(
            result.current.clientActionButtonCtaStatuses.noProjects,
        ).toHaveProperty('tag', 'FIND AN AGENCY');
        expect(
            result.current.clientActionButtonCtaStatuses.noProjects,
        ).toHaveProperty('onClick');
    });

    it('should return agency action button CTA statuses', () => {
        const projectsViewSettingsBarRef = { current: null };
        const projectsCount = 5;
        const toggleBookACallPopup = jest.fn();
        const brandLead = {
            firstName: 'John',
            lastName: 'Doe',
        };

        const { result } = renderHook(() =>
            useActionButtonCtaConfig({
                projectsViewSettingsBarRef,
                projectsCount,
                toggleBookACallPopup,
                brandLead,
            }),
        );

        expect(result.current.agencyActionButtonCtaStatuses).toHaveProperty(
            'activeProjects',
        );
        expect(
            result.current.agencyActionButtonCtaStatuses.activeProjects,
        ).toHaveProperty('text', 'View Projects');
        expect(
            result.current.agencyActionButtonCtaStatuses.activeProjects,
        ).toHaveProperty('description', 'YOU HAVE 5 ACTIVE PROJECTS');
        expect(result.current.agencyActionButtonCtaStatuses).toHaveProperty(
            'signUp',
        );
        expect(
            result.current.agencyActionButtonCtaStatuses.signUp,
        ).toHaveProperty('text');
        const text = result.current.agencyActionButtonCtaStatuses.signUp
            ?.text as { type: string };
        expect(text.type).toBe('span'); // Assuming it's a JSX element
        expect(result.current.agencyActionButtonCtaStatuses).toHaveProperty(
            'incompleteProfile',
        );
        expect(
            result.current.agencyActionButtonCtaStatuses.incompleteProfile,
        ).toHaveProperty('text', 'Settings');
        expect(
            result.current.agencyActionButtonCtaStatuses.incompleteProfile,
        ).toHaveProperty('description', 'COMPLETE YOUR PROFILE');
        expect(
            result.current.agencyActionButtonCtaStatuses.incompleteProfile,
        ).toHaveProperty('onClick');
    });
});
