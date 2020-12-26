module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.optimization.minimizer("terser").tap(args => {
      // No Source Map
      args[0].terserOptions.sourceMap = false;

      // No Classnames, Function names
      args[0].terserOptions.keep_classnames = false;
      args[0].terserOptions.keep_fnames = false;

      // No console, debugers, warnings
      args[0].terserOptions.compress.warnings = false;
      args[0].terserOptions.compress.drop_console = true;
      args[0].terserOptions.compress.drop_debugger = true;
      return args;
    });
  },
  devServer: {
    disableHostCheck: true
  }
};
