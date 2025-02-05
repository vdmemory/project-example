module.exports = {
    core: { builder: 'webpack5' },
    stories: [
        '../src/lib/**/*.stories.mdx',
        '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-essentials',
        '@nrwl/react/plugins/storybook',
        '@storybook/addon-styling',
    ],
    staticDirs: ['../public'],
    previewHead: head => `
        ${head}
        <script async id="initMap">
            function initMap() {
                console.log('initMap');
            }
            window.initMap = initMap;
        </script>
        ${
            process.env.NX_GOOGLE_API_KEY
                ? `<script async src="https://maps.googleapis.com/maps/api/js?key=${process.env.NX_GOOGLE_API_KEY}&libraries=places&region=US&language=en&callback=initMap"></script>`
                : ''
        }
    `,
};

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
