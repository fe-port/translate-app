const CracoLessPlugin = require('craco-less')

module.exports = {
  // webpack: {
  //   configure: (webpackConfig, { env, paths }) => {
  //     webpackConfig.output.publicPath = 'translate-app'
  //     return webpackConfig
  //   }
  // },
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true //设置为true即是less
        }
      ]
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#399' },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
