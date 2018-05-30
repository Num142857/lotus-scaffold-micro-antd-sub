
import Mock, { Random } from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  ['POST:' + API_PATH.NOTICE_MANAGER_NOTICE_DETAIL]: function (req, res) {
    let data = Mock.mock({
      'code': 70,
      'errmsg': 'mock',
      'data': [
        {
          'fileReviewId': 9,
          'noticeName': 'mock',
          'endTime': 'mock',
          'bidType': 18,
          'townName': 'mock',
          'townId': 13,
          'townCode': 'mock',
          'city': 7,
          'noticeContent': 'mock',
          'linkman': 'mock',
          'phone': 'mock',
          'email': 'mock',
          'title': 'mock',
          'summary': 'mock',
          'displayType': 59,
          'isTop': 88,
          'topTime': 'mock',
          'status': 89,
          'isDisplay': 29,
          'businessType': 23,
          'gmtCreate': 'mock',
          'createdBy': 'mock',
          'gmtModify': 'mock',
          'modifiedBy': 'mock',
          'del': 'mock'
        }
      ]
    })
    return [200, data]
  }
}

export default proxy
