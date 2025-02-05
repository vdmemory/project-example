/* eslint-disable */
export default {
    displayName: 'shared-feature-onboarding',
    preset: '../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../coverage/libs/shared/feature-onboarding',
};
