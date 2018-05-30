
import Mock, { Random } from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  ['POST:' + API_PATH.NOTICE_MANAGER_QUERY_LIST]: function (req, res) {
    let pageSize = req.pageSize || 10
    let data = Mock.mock({
      'code': 0,
      'errmsg': 'mock',
      'data': [
        {
          'pageNo': req.pageNo || 1,
          'pageSize': pageSize,
          'records': 100,
          'pages': 20,
          [`data|${pageSize}`]: [
            {
              'id|0-50000': 1,
              'noticeName': '公告名称',
              'endTime': Random.datetime(),
              'townName': '所属小镇',
              'isDisplay|0-1': 1,
              'status|0-1': 1,
              'gmtCreate': Random.datetime(),
              'createdBy': 'mock',
              'gmtModify': Random.datetime(),
              'modifiedBy': 'mock',
              'del|0-1': 1
            }
          ]
        }
      ]
    })
    return [200, data]
  }

}

export default proxy
