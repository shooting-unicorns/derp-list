module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactList',
      externals: {
        react: 'React'
      }
    }
  }
}
