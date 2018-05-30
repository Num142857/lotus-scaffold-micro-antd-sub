
import Mock, { Random } from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  ['POST:' + API_PATH.NOTICE_MANAGER_APPROVE_SIGNED_ITEM]: function (req, res) {
    let data = Mock.mock({
      'code': 0,
      'errmsg': 'mock',
      'data': [
        {
          'gmtCreate': Random.datetime(),
          'createdBy': 'mock',
          'gmtModify': Random.datetime(),
          'modifiedBy': 'mock',
          'del': 59
        }
      ]
    })
    return [200, data]
  }
}

export default proxy
