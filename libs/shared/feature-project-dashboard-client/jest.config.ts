/* eslint-disable */
export default {
    displayName: 'shared-feature-project-dashboard-client',
    preset: '../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory:
        '../../../coverage/libs/shared/feature-project-dashboard-client',
};
