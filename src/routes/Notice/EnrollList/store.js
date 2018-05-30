import { observable, configure, action, runInAction } from 'mobx'
import API_PATH from 'Common/apiPath'
import { post } from 'Util/request'
configure({ enforceActions: true })
export default class Store {
    @observable listData = { data: [] }
    @observable query = { noticeId: null }
    @observable pageInfo = { pageSize: 10 }
    @observable loading = false

    @action.bound initQuery = (id) => {
      this.query.noticeId = id
    }
       // 获取数据
       @action.bound fetchData = async (params = {
         pageNo: this.pageInfo.pageIndex,
         pageSize: this.pageInfo.pageSize,
       }) => {
         this.loading = true
         params.noticeId = this.query.noticeId
         try {
           let res = await post(API_PATH.SIGNUP_LIST_ALL, params)
           runInAction(() => {
             let data = (res.data || { data: [] })
             this.loading = false
             if (res.code === 0) {
               this.listData = data
               this.pageInfo = {
                 pageIndex: data.pageNo,
                 pageSize: data.pageSize,
                 records: data.records
               }
             }
           })
         } catch (error) {
           // 错误处理
           console.log(error)
         }
       }

    // 显示
    @action.bound onShowSizeChange = (current, size) => {
      this.pageInfo.pageIndex = 1
      this.pageInfo.pageSize = size
      this.fetchData(this.pageInfo)
    }

    // 翻页
    @action.bound handleTableChange = (page) => {
      this.fetchData({ pageNo: page.current, pageSize: page.pageSize })
    }

  // 是否显示
    @action.bound itemDisplay = async(item) => {
      let params = {
        id: item.id,
        status: item.status === 0 ? 1 : 0
      }
      try {
        let res = await post(API_PATH.SIGN_UP_APPROVE, params)
        runInAction(() => {
          if (res.code === 0) {
            item.status = params.status
            message.success('修改成功')
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
