import { tipsPopupConfig } from './tipsPopupConfigAgency';

describe('tipsPopupConfig', () => {
    it('should have a correct config structure', () => {
        expect(tipsPopupConfig).toHaveProperty('tips');
        expect(tipsPopupConfig).toHaveProperty('config');
    });

    it('should have a correct tips array structure', () => {
        const { tips } = tipsPopupConfig;
        expect(Array.isArray(tips)).toBe(true);
        tips.forEach((tip, index) => {
            expect(tip).toHaveProperty('id');
            expect(tip).toHaveProperty('title');
            expect(tip).toHaveProperty('description');

            // Check the types of properties
            expect(typeof tip.id).toBe('number');
            expect(typeof tip.title).toBe('string');
            expect(typeof tip.description).toBe('string');
        });
    });

    it('should have correct config values', () => {
        const { config } = tipsPopupConfig;
        expect(config).toHaveProperty('label', 'SCHEDULE AGENCY INTROS');
        expect(config).toHaveProperty(
            'note',
            'Book intro calls with your favorite teams. This is an opportunity to get to know the agencies and discuss project details.',
        );
        expect(config).toHaveProperty(
            'completeButtonLabel',
            'SET MY AVAILABILITY',
        );
    });

    it('should have correct tips values', () => {
        const { tips } = tipsPopupConfig;
        const expectedTips = [
            {
                id: 1,
                title: '1. ADD YOUR TEAM',
                description: 'Invite team members to your agency intro calls.',
            },
            {
                id: 2,
                title: '2. SELECT availability',
                description: 'Share your availability for agency intro calls.',
            },
            {
                id: 3,
                title: '3. CONFIRM MEETINGS',
                description: `You'll receive meeting invites to your calendar.`,
            },
        ];

        expect(tips).toEqual(expectedTips);
    });
});
