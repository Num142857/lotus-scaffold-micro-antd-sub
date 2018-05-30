
// import addNotice from './addNotice.js'
// import approve from './approve.js'
// import cancelTop from './cancelTop.js'
// import deleteTop from './deleteTop.js'
// import isTop from './isTop.js'
// import noticeDetail from './noticeDetail.js'
// import queryList from './queryList.js'
// import querySignedList from './querySignedList.js'
// import updateNotice from './updateNotice.js'

// const proxy = {
//   ...addNotice,
//   ...approve,
//   ...cancelTop,
//   ...deleteTop,
//   ...isTop,
//   ...noticeDetail,
//   ...queryList,
//   ...querySignedList,
//   ...updateNotice
// }

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
