
let getNoticeManagerApi = function (path) {
  return '/bidding/noticeManage/' + path
}

let getBidApi = function (path) {
  return '/bidding/workflowManage/bid/' + path
}

let getSealApi = function (path) {
  return '/bidding/fileSeals/' + path
}

const apiPath = {
  // --------------公告管理 NOTICE_MANAGER------------------

  /**
   * 招标公告列表查询
   */
  NOTICE_MANAGER_QUERY_LIST: getNoticeManagerApi('queryList'),
  /**
   * 单个公告置顶
   */
  NOTICE_MANAGER_IS_TOP: getNoticeManagerApi('isTop'),
  /**
   * 单个公告取消置顶
   */
  NOTICE_MANAGER_CANCEL_TOP: getNoticeManagerApi('cancelTop'),
  /**
   * 单个公告新增
   */
  NOTICE_MANAGER_ADD_NOTICE: getNoticeManagerApi('addNotice'),
  /**
   * 单个公告编辑
   */
  NOTICE_MANAGER_UPDATE_NOTICE: getNoticeManagerApi('updateNotice'),
  /**
   * 单个公告删除
   */
  NOTICE_MANAGER_DELETE_TOP: getNoticeManagerApi('deleteTop'),
  /**
   * 查看单个公告详情
   */
  NOTICE_MANAGER_NOTICE_DETAIL: getNoticeManagerApi('noticeDetail'),
  /**
   * 报名信息列表查询
   */
  NOTICE_MANAGER_QUERY_SIGNED_LIST: getNoticeManagerApi('enList/queryList'),
  /**
   * 报名信息单个审批
   */
  NOTICE_MANAGER_APPROVE_SIGNED_ITEM: getNoticeManagerApi('enList/Approve'),
  /**
   * 单个公告更改显示状态
   */
  NOTICE_MANAGER_CHANGE_DISPLAY: getNoticeManagerApi('changeDisplay'),

  // --------------流程管理 WORKFLOW_MANAGER------------------

  /**
   * 招标文件信息评审列表查询
   */
  WORKFLOW_MANAGER_QUERY_BID_LIST: getBidApi('bidInfoList'),
  /**
   * 招标文件信息新增
   */
  WORKFLOW_MANAGER_ADD_BID_ITEM: getBidApi('bidInfoAdd'),
  /**
   * 招标文件信息编辑
   */
  WORKFLOW_MANAGER_EDIT_BID_ITEM: getBidApi('bidInfoEdit'),
  /**
   * 查看单个招标文件评审详细
   */
  WORKFLOW_MANAGER_GET_ITEM_INFO: getBidApi('bidInfoView'),
  /**
   * 招标文件信息删除
   */
  WORKFLOW_MANAGER_DELETE_ITEM: getBidApi('bidInfoDelete'),
  /**
   * B01.新增印章明细
   */
  WORKFLOW_MANAGER_ADD_SEAL: getSealApi('add'),
  /**
   * B02.修改印章参数
   */
  WORKFLOW_MANAGER_EDIT_SEAL: getSealApi('edit'),
  /**
   * B03.删除印章信息
   */
  WORKFLOW_MANAGER_DELETE_SEAL: getSealApi('deleteById'),
  /**
   * B05.查询招标文件的印章列表
   */
  WORKFLOW_MANAGER_QUERY_SEALS: getSealApi('listAllSeals'),

  // 数据字典
  CITY_LIST: '/bidding/data/cityList',
  GET_PROJECT_LIST_ALL: '/bidding/workflowManage/ecm/getProjectListAll',
  SIGNUP_LIST_ALL: '/bidding/noticeManage/signUp/queryList',
  BID_INFO_LIST: '/bidding/workflowManage/bid/bidInfoList',
  SIGN_UP_APPROVE: '/bidding/noticeManage/signUp/approve',
  FILES_LIST: '/bidding/files/list',

  /**
   * 合营公司
   */
  GET_COMPANY_LIST_BY_CODE: '/bidding/workflowManage/ecm/buildCompanyDetailListByProCode',

  /**
   * 上传附件
   */
  UPLOAD_FILE: '/bidding/files/upload',

  /**
   * 删除附件
   */
  DELETE_FILE: '/bidding/webManage/deleteFile'
}

export default apiPath

// 1 代表后台接口开发完成
const progressObj = {
  /**
   * 公告管理 NOTICE_MANAGER
   */
  NOTICE_MANAGER_QUERY_LIST: 1,
  NOTICE_MANAGER_IS_TOP: 1,
  NOTICE_MANAGER_ADD_NOTICE: 1,
  NOTICE_MANAGER_UPDATE_NOTICE: 1,
  NOTICE_MANAGER_DELETE_TOP: 1,
  NOTICE_MANAGER_NOTICE_DETAIL: 1,
  NOTICE_MANAGER_QUERY_SIGNED_LIST: 1,
  NOTICE_MANAGER_APPROVE_SIGNED_ITEM: 1,

  /**
   * 流程管理 WORKFLOW_MANAGER
   */
  WORKFLOW_MANAGER_QUERY_BID_LIST: 1,
  WORKFLOW_MANAGER_ADD_BID_ITEM: 0,
  WORKFLOW_MANAGER_EDIT_BID_ITEM: 0,
  WORKFLOW_MANAGER_GET_ITEM_INFO: 0,
  WORKFLOW_MANAGER_DELETE_ITEM: 0,
  WORKFLOW_MANAGER_ADD_SEAL: 0,
  WORKFLOW_MANAGER_EDIT_SEAL: 0,
  WORKFLOW_MANAGER_DELETE_SEAL: 0,
  WORKFLOW_MANAGER_QUERY_SEALS: 0,

  // 数据字典
  CITY_LIST: '/bidding/data/cityList',
}

function getProgress() {
  let obj = {}
  Object.keys(progressObj).forEach(staticKey => {
    let progress = progressObj[staticKey]
    let url = apiPath[staticKey]

    if (url) {
      obj[url] = progress
    }
  })
  return obj
}

export const apiPathProgress = getProgress()
