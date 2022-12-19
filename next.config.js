// Dependencies
const { i18n } = require('./next-i18next.config');

//Config
const globalConfig = {
    i18n,
    eslint: {
        dirs: ['pages', 'components', 'common', 'services', 'forms', 'hooks', 'stores'],
    },
    redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: false,
            },

            {
                source: '/admin',
                destination: '/admin/login',
                permanent: false,
            },
        ];
    },
};

// Export
module.exports = globalConfig;
