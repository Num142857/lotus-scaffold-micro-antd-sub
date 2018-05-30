
import Mock, { Random } from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  ['POST:' + API_PATH.NOTICE_MANAGER_QUERY_SIGNED_LIST]: function (req, res) {
    let data = Mock.mock({
      'code': 98,
      'errmsg': 'mock',
      'data': {
        'pageNo': 47,
        'pageSize': 91,
        'records': 45,
        'pages': 70,
        'data': [
          {
            'gmtCreate': 'mock',
            'createdBy': 'mock',
            'gmtModify': 'mock',
            'modifiedBy': 'mock',
            'del': 60,
            'id': 79,
            'name': 'mock',
            'linkman': 'mock',
            'phone': 'mock',
            'email': 'mock',
            'signUpTime': 'mock',
            'signUpdata': 'mock',
            'status': 96
          }
        ]
      }
    })
    return [200, data]
  }
}

export default proxy
