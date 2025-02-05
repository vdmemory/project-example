import {
    containerAnimationSettings,
    itemAnimationSettings,
} from './animationSettings';

describe('animationSettings', () => {
    it('containerAnimationSettings should have initial state of hidden', () => {
        expect(containerAnimationSettings.initial).toBe('hidden');
    });

    it('itemAnimationSettings should have hidden variant with y set to -20 and opacity set to 0', () => {
        expect(itemAnimationSettings.variants.hidden).toEqual({
            y: -20,
            opacity: 0,
        });
    });

    it('itemAnimationSettings should have visible variant with y set to 0 and opacity set to 1', () => {
        expect(itemAnimationSettings.variants.visible).toEqual({
            y: 0,
            opacity: 1,
        });
    });
});
