const context = require.context('./', false, /\.js$/)

const proxyMap = context
  .keys()
  .filter(item => item !== './index.js')
  .map(key => context(key).default)
let proxy = {}
proxyMap.forEach(v => {
  Object.assign(proxy, v)
})

export default proxy
