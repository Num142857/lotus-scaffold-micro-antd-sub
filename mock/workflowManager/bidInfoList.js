
import Mock, { Random } from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  ['POST:' + API_PATH.WORKFLOW_MANAGER_QUERY_BID_LIST]: function (req, res) {
    let data = Mock.mock({
      'code': 0,
      'errormsg': 'mock',
      'data': [
        {
          'pageNo': 86,
          'pageSize': 40,
          'records': 3,
          'pages': 82,
          'data|20': [
            {
              'id|1000-50000': 1,
              'name': 'name',
              'town': 'town',
              'status|1-4': 1,
              'gmtCreate': '@datetime',
              'createdBy': 'mock',
              'gmtModify': '@datetime',
              'modifiedBy': 'mock',
              'del': 'mock'
            }
          ]
        }
      ]
    })
    return [200, data]
  }
}

export default proxy
