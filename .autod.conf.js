module.exports = {
  write: true,
  prefix: '^',
  plugin: 'autod-egg',
  test: [
    'test',
    'benchmark',
  ],
  dep: [
    'egg',
    'egg-scripts',
  ],
  devdep: [
    'egg-ci',
    'egg-bin',
    'egg-mock',
    'autod',
    'autod-egg',
    'eslint',
    'eslint-config-egg',
  ],
  exclude: [
    './test/fixtures',
    './dist',
  ],
};
<<<<<<< HEAD
=======

>>>>>>> 3f6076988eaee20c6e05ba0ecd12f8cf2e850380
