import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { observer, Observer } from 'mobx-react'
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Table, InputNumber, DatePicker, Radio, message, Badge, Divider, Checkbox } from 'antd'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'
import FooterToolbar from 'Components/FooterToolbar'
import './style.less'
import Store from './store'
const Search = Input.Search
const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input
let store = new Store()
@Form.create()
@observer
export default class EnrollList extends Component {
  componentWillMount() {
    let params = {
      'pageNo': 1,
      'pageSize': 10,
      'noticeId': this.props.match.params.id
    }
    store.initQuery(this.props.match.params.id)
    store.fetchData(params)
  }
  componentDidMount() {
  }

  handleFormReset = () => {
    const { form } = this.props
    form.resetFields()
  };

  render() {
    const { getFieldDecorator } = this.props.form
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '公司名称',
        dataIndex: 'name',
      },
      {
        title: '联系人',
        dataIndex: 'linkman'
      },
      {
        title: '联系手机',
        dataIndex: 'phone',
      },
      {
        title: '联系邮箱',
        dataIndex: 'email',
      },
      {
        title: '报名资料',
        dataIndex: 'signUpdata',
        render: (text, record, index) => {
          let files = (record.files || []).filter((item) => item.type === 6)
          return (files || []).map((item, index) => <a style={{ display: 'block', marginBotton: 10 }} download key={index} href={`/bidding/files/download?url=${item.url}`}>{item.fileOutName}</a>)
        },
      },
      {
        title: '报名时间',
        dataIndex: 'signUpTime',
      },
      {
        title: '资料审批',
        dataIndex: 'status',
        render: (text, record, index) => {
          return <Observer>{() => (<div><Checkbox onClick={store.itemDisplay.bind(store, record, index)} checked={record.status === 0} />  通过</div>)}</Observer>
        },
      },
      {
        title: '来源',
        dataIndex: 'source',
        render: (text, record, index) => {
          return text === 0 ? '官网' : '金诚逸'
        },
      },
    ]
    return (
      <div className='enroll-list'>
        <PageHeaderLayout title={`招标公告: ${this.props.match.params.name}`} content={`编码: ${this.props.match.params.id}`}>
          <Card bordered={false}>
            <div className='tableList'>
              <Table
                loading={store.loading}
                dataSource={store.listData.data}
                columns={columns}
                onChange={store.handleTableChange}
                bordered
                pagination={{
                  showQuickJumper: true,
                  showSizeChanger: true,
                  pageSize: store.pageInfo.pageSize,
                  pageSizeOptions: ['10', '30', '50'],
                  onShowSizeChange: store.onShowSizeChange,
                  total: store.pageInfo.records,
                  showTotal: total => `共 ${total} 条数据`,
                  defaultPageSize: 10,
                  current: store.pageInfo.pageIndex,
                  className: 'pagination',
                  size: 'normal'
                }}
              />
            </div>
            <div className='subimit-box'>
              <Button onClick={(e) => this.props.history.push('/project/notice/list')}>返回</Button>
            </div>
          </Card>

        </PageHeaderLayout>
      </div>
    )
  }
}

