/* eslint-disable */
export default {
    displayName: 'shared-data-access-kickoff',
    preset: '../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../coverage/libs/shared/data-access-kickoff',
    collectCoverageFrom: [
        './src/lib/adapters/*.{ts,tsx,js,jsx}',
        '!./src/lib/constants/*.{ts,tsx,js,jsx}',
        '!./src/lib/services/*.{ts,tsx,js,jsx}',
    ],
};
