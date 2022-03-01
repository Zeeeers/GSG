// Dependencies
const { i18n } = require('./next-i18next.config');

//Config
const globalConfig = {
    i18n,
    rewrites: () => [
        {
            source: '/api/proxy/:path*',
            destination: `${process.env.API_URL}/:path*`,
        },
    ],
    eslint: {
        dirs: ['pages', 'components', 'common', 'services', 'forms', 'hooks', 'stores'],
    },
};

// Export
module.exports = globalConfig;
