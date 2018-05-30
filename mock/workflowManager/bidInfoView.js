
import Mock, { Random } from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  ['POST:' + API_PATH.WORKFLOW_MANAGER_GET_ITEM_INFO]: function (req, res) {
    let data = Mock.mock({
      'code': 0,
      'errormsg': 'mock',
      'data': [
        {
          'name': 'mock',
          'projectName': 'mock',
          'projectType': 99,
          'biddingType': 32,
          'town': 'mock',
          'townName': 'mock',
          'townCode': 'mock',
          'bidMode': 34,
          'leader': 'mock',
          'budget': 'mock',
          'bidTime': 'mock',
          'bidPlace': 'mock',
          'isCorporation': 'mock',
          'corporationId': 'mock',
          'corporationName': 'mock',
          'corporationCode': 'mock',
          'isProxy': 5,
          'proxyFee': 'mock',
          'isSeal': 75,
          'projectContent': 'mock',
          'fileSeals': {
            'name': 'mock',
            'type': 50,
            'id': 'mock'
          },
          'fileAccess': 'mock'
        }
      ]
    })
    return [200, data]
  }
}

export default proxy
