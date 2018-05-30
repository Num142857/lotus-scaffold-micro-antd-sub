// import addSeal from './addSeal.js'
// import bidInfoAdd from './bidInfoAdd.js'
// import bidInfoDelete from './bidInfoDelete.js'
// import bidInfoEdit from './bidInfoEdit.js'
// import bidInfoList from './bidInfoList.js'
// import bidInfoView from './bidInfoView.js'
// import deleteSeal from './deleteSeal.js'
// import editSeal from './editSeal.js'
// import index from './index.js'
// import querySealList from './querySealList.js'

// const proxy = {
//   ...addSeal,
//   ...bidInfoAdd,
//   ...bidInfoDelete,
//   ...bidInfoEdit,
//   ...bidInfoList,
//   ...bidInfoView,
//   ...deleteSeal,
//   ...editSeal,
//   ...index,
//   ...querySealList
// }

const context = require.context('./', false, /\.js$/)
//
const proxyMap = context
  .keys()
  .filter(item => item !== './index.js')
  .map(key => context(key).default)
let proxy = {}
proxyMap.forEach(v => {
  Object.assign(proxy, v)
  //
})

export default proxy
