import { isUrl } from '../utils/utils'
let menuData = [
  {
    name: '项目管理',
    icon: 'table',
    path: 'project',
    rank: 1,
    children: [
      {
        name: '公告管理',
        path: 'notice',
      },
      {
        name: '报名明细',
        path: 'enroll/list',
        hideInMenu: true, // 隐藏该条
      },
      {
        name: '404示例页面',
        path: '404',
      },
    ],
  }
]
let originParentPath = '/'
function formatter(data, parentPath = originParentPath, parentAuthority) {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
export default menuData
