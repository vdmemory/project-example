/* eslint-disable */
export default {
    displayName: 'shared-data-access-project-availability',
    preset: '../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' },
        ],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory:
        '../../../coverage/libs/shared/data-access-project-availability',
    collectCoverageFrom: [
        './src/lib/adapters/*.{ts,tsx,js,jsx}',
        '!./src/lib/constants/*.{ts,tsx,js,jsx}',
        '!./src/lib/services/*.{ts,tsx,js,jsx}',
    ],
};
