// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        svgr: true,
    },
    basePath: '/agency',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/projects',
                permanent: true,
            },
            {
                source: '/',
                destination: '/agency/projects',
                permanent: true,
                basePath: false,
            },
            {
                source: '/agency/profile',
                destination: '/agency/profile/account-settings',
                permanent: true,
                basePath: false,
            },
            {
                source: '/agency/project/:slug(\\d{1,})/pitches-make-intro',
                destination: '/agency/projects',
                permanent: true,
                basePath: false,
            },
        ];
    },
    // Added webpack configuration to not save build cache in production mode.
    // https://nextjs.org/docs/app/building-your-application/optimizing/memory-usage#disable-webpack-cache
    webpack: (config, { dev }) => {
        if (config.cache && !dev) {
            config.cache = Object.freeze({
                type: 'memory',
            });
            config.cache.maxMemoryGenerations = 0;
        }
        // Important: return the modified config
        return config;
    },
    staticPageGenerationTimeout: 1000,
    experimental: {
        optimizeFonts: true,
        esmExternals: false,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'breef-s3-dev.s3.amazonaws.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'breef-s3-staging.s3.amazonaws.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'breef-s3-production.s3.amazonaws.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'uploads-ssl.webflow.com',
                port: '',
            },
        ],
        output: 'export',
        loader: 'default',
    },
};

module.exports = withNx(nextConfig);
