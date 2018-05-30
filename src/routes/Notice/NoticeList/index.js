import React, { Component, Fragment } from 'react'

import moment from 'moment'
import { observable, configure, action, runInAction } from 'mobx'
import { observer, Observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Table, InputNumber, DatePicker, Modal, message, Badge, Divider, Checkbox, Menu } from 'antd'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'
// import Operating from 'Components/Operating/'
import './style.less'
import store from './store'
const Search = Input.Search
const FormItem = Form.Item
const { Option } = Select
const confirm = Modal.confirm
@observer
class NoticeList extends Component {
  componentWillMount() {
    let params = {
      'pageNo': 1,
      'pageSize': 10
    }
    store.fetchData(params)
    store.fetchProject()
  }

  componentDidMount() {}

  handleSearch = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.handleSearch(values)
      }
    })
  };

  handleFormReset = () => {
    const { form } = this.props
    form.resetFields()
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSearch} layout='inline'>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label='公告名称'>
              {getFieldDecorator('noticeName')(<Input placeholder='请输入' />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label='小镇'>
              {getFieldDecorator('townId')(
                <Select
                  style={{ width: '100%' }}
                  showSearch
                  allowClear
                  placeholder='请选择'
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {(store.projectList || []).map((item) => <Option key={item.id} value={item.id}>{item.proName}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label='招标类型'>
              {getFieldDecorator('bidType')(
                <Select placeholder='请选择' style={{ width: '100%' }}>
                  {(store.biddingType || []).map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className='submitButtons'>
              <Button type='primary' htmlType='submit'>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        align: 'center',
        width: 100
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        width: 150,
        sorter: (a, b) => {
          return moment(b.gmtCreate).unix() - moment(a.gmtCreate).unix()
        },
        align: 'center',
        render: time => moment(time).format('YYYY-MM-DD HH:mm')
      },
      {
        title: '公告名称',
        dataIndex: 'noticeName',
        width: 250,
        align: 'center',
        render: (text, record, index) => {
          return <Link to={`/project/notice/detail/${record.id}`}>{text}</Link>
        },
      },
      {
        title: '报名截止时间',
        dataIndex: 'endTime',
        width: 150,
        sorter: (a, b) => {
          return moment(b.endTime).unix() - moment(a.endTime).unix()
        },
        align: 'center'
      },
      {
        title: '所属小镇',
        dataIndex: 'townName',
        align: 'center',
        width: 120
      },
      {
        title: '显示',
        dataIndex: 'displayAll',
        className: 'table-center',
        width: 80,
        render: (text, record, index) => {
          return <Observer>{() => <Checkbox onClick={store.itemDisplay.bind(store, record, index)} checked={record.displayAll === 0} />}</Observer>
        },
        align: 'center'
      },
      {
        title: '操作',
        width: 240,
        render: (text, record, index) => {
          return <Operating text={text} record={record} index={index} />
        }
      }
    ]

    let Operating = function(props) {
      let { record, text, index } = props
      return <Observer>
        {() => <Fragment>
          {record.isTop === 1}
          {record.isTop === 1
            ? <a onClick={() => { store.setTop(record) }}>置顶</a>
            : <a onClick={() => { store.cancelTop(record) }}>取消置顶</a>
          }
          {record.isSignUp !== 0
            ? <Fragment>
              <Divider type='vertical' />
              <a onClick={() => {
                confirm({
                  title: '确定是否删除?',
                  onOk() {
                    store.remove(record)
                  }
                })
              }}
              >删除</a>
            </Fragment> : null
          }

          <Divider type='vertical' />
          <Link to={`/project/notice/edit/${record.id}`}>编辑</Link>

          {record.isSignUp === 0
            ? <Fragment>
              <Divider type='vertical' />
              <Link to={`/project/notice/enroll/list/${record.id}/${record.noticeName}`}>报名信息</Link>
            </Fragment> : null
          }
        </Fragment>}
      </Observer>
    }

    return (
      <PageHeaderLayout title='招标公告'>
        <Button style={{ display: 'none' }}>
          {store.forceRenderNum}
        </Button>
        <Card bordered={false}>
          <div className='tableList'>
            <div className='tableListForm'>{this.renderForm()}</div>
            <div className='tableListOperator'>
              <Button icon='plus' type='primary' onClick={() => { this.props.history.push('/project/notice/new') }}>
                新建
              </Button>
            </div>
            <Table
              loading={store.loading}
              dataSource={store.listData.data}
              columns={columns}
              onChange={store.handleTableChange}
              bordered
              // scroll={{ y: 400 }}
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
        </Card>
      </PageHeaderLayout>
    )
  }
}

export default Form.create()(NoticeList)
