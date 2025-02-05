import {
    desktopOurFeatureScreen,
    mobileOurFeatureScreen,
} from './ourFeatureScreen';

import {
    desktopMarketingScreen,
    mobileMarketingScreen,
} from './marketingScreenConfig';

describe('ourFeatureScreen', () => {
    it('desktopOurFeatureScreen should have 10 objects', () => {
        expect(desktopOurFeatureScreen).toHaveLength(10);
    });

    it('mobileOurFeatureScreen should have 10 objects', () => {
        expect(mobileOurFeatureScreen).toHaveLength(10);
    });

    it('All objects in desktopOurFeatureScreen should have top property', () => {
        desktopOurFeatureScreen.forEach(item => {
            expect(item).toHaveProperty('top');
        });
    });

    it('All objects in mobileOurFeatureScreen should have top property', () => {
        mobileOurFeatureScreen.forEach(item => {
            expect(item).toHaveProperty('top');
        });
    });
});

describe('marketingScreenConfig', () => {
    it('desktopMarketingScreen should have 10 objects', () => {
        expect(desktopMarketingScreen).toHaveLength(6);
    });

    it('mobileMarketingScreen should have 10 objects', () => {
        expect(mobileMarketingScreen).toHaveLength(6);
    });

    it('All objects in desktopMarketingScreen should have top property', () => {
        desktopMarketingScreen.forEach(item => {
            expect(item).toHaveProperty('top');
        });
    });

    it('All objects in mobileMarketingScreen should have top property', () => {
        mobileMarketingScreen.forEach(item => {
            expect(item).toHaveProperty('top');
        });
    });
});
