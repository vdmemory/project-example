import { Instagram, TikTok, Twitter } from '@breef/shared/assets';
import { useProjectReview } from './useProjectReview';
import { AgenciesAdvantagesList } from '@breef/shared/types';

describe('useProjectReview', () => {
    describe('getAgenciesAdvantages', () => {
        it('should return a string of agency names', () => {
            const { getAgenciesAdvantages } = useProjectReview();
            const agenciesAdvantagesList: AgenciesAdvantagesList[] = [
                { id: 1, name: 'Agency 1' },
                { id: 2, name: 'Agency 2' },
                { id: 3, name: 'Agency 3' },
            ];
            const agenciesAdvantagesValue = [1, 3];

            const result = getAgenciesAdvantages(
                agenciesAdvantagesList,
                agenciesAdvantagesValue,
            );

            expect(result).toBe('Agency 1, Agency 3');
        });

        it('should return an empty string if agenciesAdvantagesValue is empty', () => {
            const { getAgenciesAdvantages } = useProjectReview();
            const agenciesAdvantagesList: AgenciesAdvantagesList[] = [
                { id: 1, name: 'Agency 1' },
                { id: 2, name: 'Agency 2' },
                { id: 3, name: 'Agency 3' },
            ];
            const agenciesAdvantagesValue: number[] = [];

            const result = getAgenciesAdvantages(
                agenciesAdvantagesList,
                agenciesAdvantagesValue,
            );

            expect(result).toBe('');
        });
    });

    describe('getInvitationsString', () => {
        it('should return a string of invitation emails', () => {
            const { getInvitationsString } = useProjectReview();
            const invitations = [
                { id: 1, email: 'email1@example.com' },
                { id: 2, email: 'email2@example.com' },
                { id: 3, email: 'email3@example.com' },
            ];

            const result = getInvitationsString(invitations);

            expect(result).toBe(
                'email1@example.com, email2@example.com, email3@example.com',
            );
        });

        it('should return an empty string if invitations is empty', () => {
            const { getInvitationsString } = useProjectReview();
            const invitations: { id: number; email: string }[] = [];

            const result = getInvitationsString(invitations);

            expect(result).toBe('');
        });
    });

    describe('getSocialIcon', () => {
        it('should return TikTok icon if titleLink is "TikTok"', () => {
            const { getSocialIcon } = useProjectReview();
            const titleLink = 'TikTok';
            const expectedIcon = <TikTok data-testid="tiktok-icon" />;

            const result = getSocialIcon(titleLink);

            expect(result).toEqual(expectedIcon);
        });

        it('should return Twitter icon if titleLink is "Twitter"', () => {
            const { getSocialIcon } = useProjectReview();
            const titleLink = 'Twitter';
            const expectedIcon = <Twitter data-testid="twitter-icon" />;

            const result = getSocialIcon(titleLink);

            expect(result).toEqual(expectedIcon);
        });

        it('should return Instagram icon if titleLink is not "TikTok" or "Twitter"', () => {
            const { getSocialIcon } = useProjectReview();
            const titleLink = 'Instagram';
            const expectedIcon = <Instagram data-testid="instagram-icon" />;

            const result = getSocialIcon(titleLink);

            expect(result).toEqual(expectedIcon);
        });
    });

    describe('getStringForList', () => {
        const { getStringForList } = useProjectReview();

        it('should return empty string when list is empty', () => {
            expect(getStringForList({ list: [] })).toBe('');
        });

        it('should return only names in comma separated string when only names are present', () => {
            const list = [
                { name: 'Item1' },
                { name: 'Item2' },
                { name: 'Item3' },
            ];
            expect(getStringForList({ list })).toBe('Item1, Item2, Item3');
        });

        it('should return only descriptions in comma separated string when only descriptions are present', () => {
            const list = [
                { description: 'Description1' },
                { description: 'Description2' },
                { description: 'Description3' },
            ];
            expect(getStringForList({ list })).toBe(
                'Description1, Description2, Description3',
            );
        });

        it('should return both names and descriptions in comma separated string when both are present', () => {
            const list = [
                { name: 'Item1', description: 'Description1' },
                { name: 'Item2', description: 'Description2' },
                { name: 'Item3', description: 'Description3' },
            ];
            expect(getStringForList({ list })).toBe('Item1, Item2, Item3');
        });
    });
});
