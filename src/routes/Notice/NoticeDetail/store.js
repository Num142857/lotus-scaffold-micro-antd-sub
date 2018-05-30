import { observable, configure, action, runInAction } from 'mobx'
import API_PATH from 'Common/apiPath'
import { post } from 'Util/request'
import { message } from 'antd'

configure({ enforceActions: true })
export default class Store {
  biddingType = [
    { id: 0, name: '工程' },
    { id: 1, name: '设计/勘察' },
    { id: 2, name: '服务' },
    { id: 3, name: '货物/设置' },
    { id: 4, name: '其他' },
  ]
  businessType = [
    { id: 0, name: '新城镇' },
    { id: 1, name: '住建部' },
    { id: 2, name: '集团' },
    { id: 3, name: '嗣横科技' },
    { id: 4, name: '正行' },
  ]

  @observable fileList = []
  @observable detailData = {}
  @observable imageUrl

  @action fetchData = async (params) => {
    let res = await post(API_PATH.NOTICE_MANAGER_NOTICE_DETAIL, params)
    runInAction(() => {
      if (res.code === 0) {
        res.data.biddingTypeName = this.biddingType.find((item) => item.id === res.data.bidType).name
        res.data.businessTypeName = this.businessType.find((item) => item.id === res.data.businessType).name
        this.detailData = res.data
        this.fileList = (res.data.files || []).filter((item) => item.type === 0)
        this.imageUrl = ((res.data.files || []).find((item) => item.type === 2) || {}).url
      }
    })
  }
}
