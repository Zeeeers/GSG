// Dependencies
const { i18n } = require('./next-i18next.config');

//Config
const globalConfig = {
    i18n,

    images: {
        domains: ['https://www.gsg-match.com/', 'gsg-match.com/'],
    },

    eslint: {
        dirs: ['pages', 'components', 'common', 'services', 'forms', 'hooks', 'stores'],
    },
};

// Export
module.exports = globalConfig;
