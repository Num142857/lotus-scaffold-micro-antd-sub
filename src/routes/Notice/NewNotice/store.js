import { observable, configure, action, runInAction } from 'mobx'
import API_PATH from 'Common/apiPath'
import { post } from 'Util/request'
import { message } from 'antd'

configure({
  enforceActions: true
})
export default class Store {
  biddingType = [
    { id: 0, name: '工程' },
    { id: 1, name: '设计/勘察' },
    { id: 2, name: '服务' },
    { id: 3, name: '货物/设置' },
    { id: 4, name: '其他' },
  ]
  businessType = [{
    id: 0,
    name: '新城镇'
  },
  {
    id: 1,
    name: '住建部'
  },
  {
    id: 2,
    name: '集团'
  },
  {
    id: 3,
    name: '嗣横科技'
  },
  {
    id: 4,
    name: '正行'
  },
  ]

  @observable cityList = []
  @observable fileList = []
  @observable projectList = []
  @observable bidInfoList = []
  /**
   * 拉取城市列表
   *
   */
  @action.bound fetchCityList = async () => {
    let res = await post(API_PATH.CITY_LIST)

    runInAction(() => {
      if (res.code === 0) {
        let arr = []
        res.data.forEach(element => {
          let province = {
            value: element.value,
            label: element.title,
          }
          if (element.childList) {
            let citys = element.childList.map((city) => {
              return {
                value: city.value,
                label: city.title,
                parentValue: element.value
              }
            })
            province.children = citys
          }
          arr.push(province)
        })
        this.cityList = arr
      } else {
        message.warning(res.errmsg)
      }
    })
  }

  /**
   * 添加公告
   *
   * @param {any} params 公告参数
   */
  @observable submiting = false
  @action.bound addNotice = async (params, history) => {
    if (this.submiting) return
    runInAction(() => { this.submiting = true })
    params.city = params.city[1]

    // 提取文件列表
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
    // 显示参数转化
    params.displayApp = (params.displays.indexOf('displayApp') !== -1) ? 0 : 1
    params.displayPc = (params.displays.indexOf('displayPc') !== -1) ? 0 : 1

    // 如果有上传成功的分享图,添加到文件列表里
    if (params.shareImg.file.response.code === 0) {
      params.files.push({
        'id': params.shareImg.file.response.data.id,
        'fileName': params.shareImg.file.response.data.fileName,
        'fileOutName': params.shareImg.file.response.data.fileOutName,
        'isDisplay': params.shareImg.file.response.data.isDisplay,
        'type': params.shareImg.file.response.data.type
      })
    }

    // 招标文件关联
    if (this.currentBidInfo) {
      params.fileReviewId = this.currentBidInfo.id
    }

    // 获取小镇数据
    let town = this.projectList.find((item) => item.id === params.townId)
    if (town) {
      params.townName = town.proName
      params.townCode = town.proCode
    }

    let res = await post(API_PATH.NOTICE_MANAGER_ADD_NOTICE, params)
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

  @action.bound fetchProject = async (params) => {
    let res = await post(API_PATH.GET_PROJECT_LIST_ALL, {
      pageNo: 1,
      pageSize: 10000
    })
    runInAction(() => {
      if (res.code === 0) {
        this.projectList = res.data.list
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

    this.fileList.peek().splice(index, 1)

    this.fileList = this.fileList.peek()
  }

  @action changeCheckbox = (item) => {
    item.isDisplay = item.isDisplay === 0 ? 1 : 0
    this.fileList = this.fileList.peek()
  }

  // @action changeFileOutName = function (event, item) {
  //   item.fileOutName = event.target.value
  //   this.fileList = this.fileList.peek()
  // }

  @observable imageUrl = null
  /**
   * 分享图片上传回调
   * @param {any} info 回调返回参数
   */
  @observable Uploading = false
  @action.bound handleShareChange = (info) => {
    this.Uploading = true
    if (info.file.status !== 'uploading') {}
    if (info.file.response) {
      this.Uploading = false
      if (info.file.status === 'done' && info.file.response.code === 0) {
        this.getBase64(info.file.originFileObj, imageUrl => {
          runInAction(() => {
            this.imageUrl = imageUrl
          })
        })
      } else if (info.file.status === 'error' && !info.file.response.success) {
        this.clearProgress(info)
      } else {
        message.warn(info.file.response.errmsg)
      }
    }
  }

  /**
   * 文件列表上传回调函数
   * @param {any} info 返回的信息
   */
  @action uploadFileListChange = (info) => {
    if (info.file.status !== 'uploading') {}
    if (info.file.response) {
      if (info.file.status === 'done' && info.file.response.code === 0) {
        this.clearProgress(info)
        this.fileList.push({
          'fileName': info.file.name,
          'fileOutName': info.file.name,
          'isDisplay': 0,
          'id': info.file.response.data.id,
          'type': 0,
        })
        this.fileList = this.fileList.peek()
      } else if (info.file.status === 'error' && info.file.response.code !== 0) {
        this.clearProgress(info)
        message.warning(`${info.file.name} 上传失败.`)
      } else if (info.file.status === 'done' && info.file.response.code !== 0) {
        this.clearProgress(info)
        message.warning(`${info.file.name} 上传失败. ${info.file.response.errmsg}`)
      }
    }
  }

  /**
   * 清除文件上传的进度条
   * @param {any} info
   * @memberof Store
   */
  clearProgress(info) {
    for (let index = 0; index < document.querySelectorAll('.ant-upload-list-item').length; index++) {
      const ele = document.querySelectorAll('.ant-upload-list-item')[index]
      if (ele.querySelector('.ant-upload-list-item-info .ant-upload-list-item-name').textContent === info.file.name) {
        ele.querySelector('.anticon.anticon-cross').click()
        break
      }
    }
  }
  getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  // 文件关联
  @observable modalVisible = false
  @observable bidInfoList = []
  @observable currentBidInfo

  /**
   * 拉取关联文件的列表
   */
  @observable bidFilePageInfo = {
    pageSize: 10,
    records: 0
  }
  @action.bound fetchBidInfoList = async (params = {
    'status': DEV ? 0 : 2,
    'pageNo': '1',
    'pageSize': '10'
  }) => {
    let res = await post('/bidding/workflowManage/bid/bidInfoList', params)
    runInAction(() => {
      if (res.code === 0) {
        this.bidInfoList = res.data.data
        this.bidFilePageInfo.records = res.data.records
        this.bidFilePageInfo.current = res.data.pageNo
        this.bidFilePageInfo.pageSize = 10
      }
    })
  }

  @action.bound handleBidFileTableChange = async (page) => {
    this.fetchBidInfoList({
      'status': DEV ? 0 : 2,
      'pageNo': page.current,
      'pageSize': 10
    })
  }

  /**
   * 关联模态框相关操作
   */
  @action.bound openModal = () => {
    this.modalVisible = true
  }
  @action.bound closeModal = () => {
    this.modalVisible = false
  }
  @action.bound lineFlie = (file) => {
    this.closeModal()
    this.currentBidInfo = file
  }
  @action.bound clearBidInfo = (file) => {
    this.currentBidInfo = null
  }
}
