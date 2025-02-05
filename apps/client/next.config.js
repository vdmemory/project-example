// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://m.stripe.network;
  style-src 'self';
  font-src 'self';
`;

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
    },
];

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        svgr: true,
    },
    basePath: '/client',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/projects',
                permanent: true,
            },
            {
                source: '/',
                destination: '/client/projects',
                permanent: true,
                basePath: false,
            },
            {
                source: '/client/profile',
                destination: '/client/profile/account-settings',
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
