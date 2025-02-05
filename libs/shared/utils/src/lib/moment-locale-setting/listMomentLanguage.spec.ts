import { momentLanguages } from './listMomentLanguage';

describe('momentLanguages', () => {
    it('contains all expected language codes', () => {
        const expectedLanguages = [
            'af',
            'ar-dz',
            'ar-kw',
            'ar-ly',
            'ar-ma',
            'ar-sa',
            'ar-tn',
            'ar',
            // Add more language codes as needed
        ];

        expectedLanguages.forEach(lang => {
            expect(momentLanguages).toContain(lang);
        });
    });
});
