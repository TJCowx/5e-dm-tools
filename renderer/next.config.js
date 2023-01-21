const { version } = require('../package.json');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }

    return config;
  },
  publicRuntimeConfig: {
    version,
  },
};
