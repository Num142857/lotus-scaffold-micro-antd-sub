import { observable, configure, action, runInAction } from 'mobx'
import API_PATH from 'Common/apiPath'
import { post } from 'Util/request'
import { message } from 'antd'
import originStroe from '../NewNotice/store'
configure({ enforceActions: true })
export default class Store extends originStroe {
    @observable cityList = []
    @observable projectList = []
    @observable bidInfoList = []
    @observable detailData = {}
    @observable shareImg = {}
    @observable shareImgUrl
    @observable currentBidInfo
    // 后端设计错误,再加一个删除列表
    @observable delList = []

/**
 * 获取详情数据
 * @param {any} params 查询条件
 */
@action fetchData = async(params) => {
  let res = await post(API_PATH.NOTICE_MANAGER_NOTICE_DETAIL, params)
  runInAction(() => {
    if (res.code === 0) {
      res.data.displays = []
      res.data.displayPc === 0 ? res.data.displays.push('displayPc') : null
      res.data.displayApp === 0 ? res.data.displays.push('displayApp') : null
      console.log(res.data.displayPc, res.data.displayApp, res.data.displays)
      this.detailData = res.data
      // 如果有文件列表
      if (res.data.files) {
        // 拿出分享图片的url
        this.shareImg = (res.data.files.find((item) => {
          if (item.type === 2) return item
        }) || {})
        this.shareImgUrl = this.shareImg.url
      }
      // 拿到公告附件
      this.fileList = (res.data.files || []).filter((item) => item.type === 0)
      // 如果有招标文件
      if (res.data.fileReviewId) {
        this.currentBidInfo = {
          name: res.data.fileReviewName,
          id: res.data.fileReviewId
        }
      }
    }
  })
}

/**
 * 编辑公告操作
 *
 * @param {any} params 提交参数
 * @param {any} history 用于跳转页面
 */
@observable submiting = false;
@action.bound editNotice = async (params, history) => {
  if (this.submiting) return
  runInAction(() => { this.submiting = true })
  params.city = params.city[1]
  params.files = this.fileList.peek().map((item, index) => {
    let fileOutName = params[`file${item.id}`]
    params[`file${item.id}`] = null
    return {
      'id': item.id,
      'fileName': item.fileName,
      'fileOutName': fileOutName,
      'isDisplay': item.isDisplay,
      'type': item.type
    }
  })
  params.displayType = 0
  // 显示参数转化
  params.displayApp = (params.displays.indexOf('displayApp') !== -1) ? 0 : 1
  params.displayPc = (params.displays.indexOf('displayPc') !== -1) ? 0 : 1

  if (params.shareImg.file && params.shareImg.file.response.code === 0) {
    params.files.push({
      'id': params.shareImg.file.response.data.id,
      'fileName': params.shareImg.file.response.data.fileName,
      'fileOutName': params.shareImg.file.response.data.fileOutName,
      'isDisplay': params.shareImg.file.response.data.isDisplay,
      'type': params.shareImg.file.response.data.type
    })
  } else if (this.shareImg) {
    params.files.push({
      'id': this.shareImg.id,
      'fileName': this.shareImg.fileName,
      'fileOutName': this.shareImg.fileOutName,
      'isDisplay': this.shareImg.isDisplay,
      'type': this.shareImg.type
    })
  }
  // 获取小镇数据
  let town = this.projectList.find((item) => item.id === params.townId)
  if (town) {
    params.townName = town.proName
    params.townCode = town.proCode
  }

  let res = await post(API_PATH.NOTICE_MANAGER_UPDATE_NOTICE, params)

  // 后端设计错误,单独要调删除接口
  for (let index = 0; index < this.delList.length; index++) {
    const element = this.delList[index]
    let delRes = await post('/bidding/files/delete', {
      'id': element.id,
      'docType': element.type
    })
    if (delRes.code !== 0) {
      message.warning(delRes.errmsg)
    }
  }

  runInAction(() => {
    this.submiting = false
    if (res.code === 0) {
      message.success('提交成功')
      history.push('/project/notice/list')
    } else {
      message.warning(res.errmsg)
    }
  })
}

@action removeFlie = function (item) {
  let index
  this.fileList.peek().find((element, i) => {
    index = i
    return element.id === item.id
  })

  this.delList.push(item)
  this.fileList.peek().splice(index, 1)
  this.fileList = this.fileList.peek()
}
}
