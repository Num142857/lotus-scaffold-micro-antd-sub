import { observable, configure, action, runInAction } from 'mobx'
import API_PATH from 'Common/apiPath'
import { post } from 'Util/request'
import { message } from 'antd'
configure({ enforceActions: true, computedRequiresReaction: false })
class Store {
  @observable forceRenderNum = 0
  @observable listData = { data: [] }
  @observable pageInfo = { pageSize: 10 }
  @observable query = { noticeName: '', town: '', biddingType: '' }
  @observable loading = false
  @observable projectList = []
  biddingType = [
    { id: 0, name: '工程' },
    { id: 1, name: '设计/勘察' },
    { id: 2, name: '服务' },
    { id: 3, name: '货物/设置' },
    { id: 4, name: '其他' },
  ]

  // 获取数据
  @action.bound fetchData = async (params = {
    noticeName: this.query.noticeName,
    townId: this.query.townId,
    bidType: this.query.bidType,
    pageNo: this.pageInfo.pageIndex,
    pageSize: this.pageInfo.pageSize,
  }) => {
    this.loading = true
    try {
      let res = await post(API_PATH.NOTICE_MANAGER_QUERY_LIST, params)
      // await 之后修改数据,必须走runInAction
      runInAction(() => {
        let data = (res.data || { data: [] })
        this.loading = false
        if (res.code === 0) {
          this.listData = data
          this.pageInfo = {
            pageIndex: data.pageNo,
            pageSize: data.pageSize,
            records: data.records || 0
          }
        }
      })
    } catch (error) {
      // 错误处理

    }
  }

  @action.bound fetchProject = async () => {
    let res = await post(API_PATH.GET_PROJECT_LIST_ALL, { pageNo: 1, pageSize: 10000 })
    runInAction(() => {
      if (res.code === 0) {
        this.projectList = res.data.list
      } else {
        message.warning(res.errmsg)
      }
    })
  }

  // 显示
  @action.bound onShowSizeChange = (current, size) => {
    this.pageInfo.pageIndex = 1
    this.pageInfo.pageSize = size
    this.fetchData(Object.assign(this.pageInfo, this.query))
  }

  // 翻页
  @action.bound handleTableChange = (page) => {
    this.pageInfo.pageIndex = page.current
    this.pageInfo.pageSize = page.pageSize
    this.fetchData({ pageNo: page.current, pageSize: page.pageSize, ...this.query })
  }

  // 搜索
  @action.bound handleSearch = async (params) => {
    this.query = {
      'noticeName': params.noticeName,
      'townId': params.townId,
      'bidType': params.bidType,
    }
    this.pageInfo.pageIndex = 1
    this.fetchData({ pageNo: this.pageInfo.pageIndex, pageSize: this.pageInfo.pageSize, ...this.query })
  }

  // 置顶
  @action.bound setTop = async (item) => {
    let params = {
      'id': item.id
    }
    try {
      let res = await post(API_PATH.NOTICE_MANAGER_IS_TOP, params)
      runInAction(() => {
        if (res.code === 0) {
          message.success('置顶成功')
          item.isTop = 0
          this.fetchData()
        } else {
          message.success('置顶失败')
        }
      })
    } catch (error) {
      // 错误处理
      console.log(error)
    }
  }

  // 取消置顶
  @action.bound cancelTop = async (item) => {
    let params = {
      'id': item.id
    }
    try {
      let res = await post(API_PATH.NOTICE_MANAGER_CANCEL_TOP, params)
      runInAction(() => {
        if (res.code === 0) {
          message.success('取消置顶成功')
          item.isTop = 1
          this.fetchData()
        } else {
          message.waring('取消置顶失败')
        }
      })
    } catch (error) {
      // 错误处理
      console.log(error)
    }
  }

  // 是否显示
  @action.bound itemDisplay = async (item) => {
    let params = {
      id: item.id,
      displayAll: item.displayAll === 0 ? 1 : 0
    }
    try {
      let res = await post(API_PATH.NOTICE_MANAGER_CHANGE_DISPLAY, params)
      runInAction(() => {
        if (res.code === 0) {
          item.displayAll = params.displayAll
        }
      })
    } catch (error) {
      // 错误处理
      console.log(error)
    }
  }

  @action.bound remove = async (item) => {
    let params = {
      id: item.id,
      displayAll: item.displayAll === 0 ? 1 : 0
    }
    try {
      let res = await post('/bidding/noticeManage/deleteNotice', params)
      runInAction(() => {
        if (res.code === 0) {
          this.fetchData()
          message.success('删除成功')
        } else {
          message.warn(res.errmsg)
        }
      })
    } catch (error) {
      // 错误处理
      console.log(error)
    }
  }
}

export default new Store()

