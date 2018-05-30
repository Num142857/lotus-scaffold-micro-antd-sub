import noticeManagerProxy from './noticeManager/'
import workflowManagerProxy from './workflowManager/'

const allProxy = {
  ...noticeManagerProxy,
  ...workflowManagerProxy
}

export default allProxy
