/* eslint-disable */
export default {
    displayName: 'shared-data-access-profile',
    preset: '../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../coverage/libs/shared/data-access-profile',
    collectCoverageFrom: [
        './src/lib/adapters/*.{ts,tsx,js,jsx}',
        '!./src/lib/constants/*.{ts,tsx,js,jsx}',
        '!./src/lib/services/*.{ts,tsx,js,jsx}',
    ],
};
