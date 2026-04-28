module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/application': './src/application',
            '@/shared': './src/shared',
            '@/entities': './src/entities',
            '@/features': './src/features',
            '@/widgets': './src/widgets',
            '@/pages': './src/pages',
            '@/processes': './src/processes',
            '@/assets': './assets',
          },
        },
      ],
    ],
  };
};
