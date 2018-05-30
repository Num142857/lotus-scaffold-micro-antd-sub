
import Mock, { Random } from 'mockjs'
import API_PATH from '../../common/apiPath'

const proxy = {
  ['POST:' + API_PATH.NOTICE_MANAGER_CHANGE_DISPLAY]: function (req, res) {
    let data = Mock.mock({
      'code': 0,
      'errmsg': 'mock'
    })
    return [200, data]
  }
}

export default proxy
