
import Mock, { Random } from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  ['POST:' + API_PATH.WORKFLOW_MANAGER_QUERY_SEALS]: function (req, res) {
    let data = Mock.mock({
      'code': 0,
      'errmsg': 'mock',
      'data|3-10': [
        {
          'id': 'mock',
          'name': 'mock',
          'type': 'mock'
        }
      ]
    })
    return [200, data]
  }
}

export default proxy
