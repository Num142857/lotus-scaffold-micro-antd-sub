
import Mock, { Random } from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  ['POST:' + API_PATH.WORKFLOW_MANAGER_DELETE_SEAL]: function (req, res) {
    let data = Mock.mock({
      'code': 0,
      'errmsg': 'mock',
      'data': {
        'id': 'mock',
        'gmtCreate': 'mock',
        'createdBy': 'mock',
        'gmtModify': 'mock',
        'modifiedBy': 'mock',
        'del': 24
      }
    })
    return [200, data]
  }
}

export default proxy
