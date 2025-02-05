const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
    ...nxPreset,
    coverageReporters: ['text', 'text-summary', 'lcov', 'cobertura'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!**/*.{styled.ts,styled.tsx}',
        '!**/*.{mock.ts,mock.tsx}',
        '!**/mock*.{ts,tsx}',
        '!**/*Mock.{ts,tsx}',
        '!**/*.{schema.ts,schema.tsx}',
        '!**/*Schema.{ts,tsx}',
        '!**/*Schemas.{ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/libs/shared/assets/**',
        '!**/libs/**/constants/**',
        '!**/libs/**/services/**',
        '!**/libs/**/types/**',
        '!**/libs/**/store/**',
        '!**/useGoogleLoginMethods.tsx',
        '!**/useStripeElements.tsx',
        '!**/InnerDatePicker.tsx',
        '!**/logoEditor/**',
        '!**/apps/**',
        '!**/schemas/**',
        '!**/useSwiper/**',
        '!**/scroll-functions/**',
        '!**/services-setting/**',
        '!**/libs/shared/constants/**',
        '!**/libs/shared/types/**',
        '!**/*.{stories.ts,stories.tsx}',
        '!**/storageController.ts',
    ],
    moduleNameMapper: {
        '.+\\.(css|style|less|sass|scss|png|jpg|svg|gif|ttf|woff|woff2)$':
            'identity-obj-proxy',
    },
    setupFilesAfterEnv: [
        'whatwg-fetch',
        '@testing-library/jest-dom',
        './jest.setup.js',
    ],
    snapshotFormat: { escapeString: true, printBasicPrototype: true },
};
