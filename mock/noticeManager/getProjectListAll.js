
import Mock, { Random } from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  ['POST:' + API_PATH.GET_PROJECT_LIST_ALL]: function (req, res) {
    let data = Mock.mock({
      'code': 0,
      'errmsg': 'mock',
      'data': [
      ]
    })
    return [200, data]
  }
}

export default proxy
