// needed to solve error about postcss config
// see https://github.com/akveo/ngx-admin/issues/604#issuecomment-271974780
module.exports = {
  plugins: {
    'postcss-cssnext': {},
    cssnano: {},
  },
};
