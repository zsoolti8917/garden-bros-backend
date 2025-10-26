module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {},
      sizeLimit: 20 * 1024 * 1024, // 20 MB
    },
  },
});
