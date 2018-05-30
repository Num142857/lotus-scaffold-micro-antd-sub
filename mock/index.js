import noticeManagerProxy from './noticeManager/'
import workflowManagerProxy from './workflowManager/'
import user from './user/'

const allProxy = {
  ...noticeManagerProxy,
  ...workflowManagerProxy,
  ...user
}

export default allProxy
