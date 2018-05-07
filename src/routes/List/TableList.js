import React, { PureComponent, Fragment } from 'react'
import moment from 'moment'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd'
import StandardTable from 'Components/StandardTable'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

import styles from './TableList.less'

const FormItem = Form.Item
const { Option } = Select
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',')
const statusMap = ['default', 'processing', 'success', 'error']
const status = ['关闭', '运行中', '已上线', '异常']

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      handleAdd(fieldsValue)
    })
  }
  return (
    <Modal
      title='新建规则'
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label='描述'>
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder='请输入' />)}
      </FormItem>
    </Modal>
  )
})

@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj }
      newObj[key] = getValue(filtersArg[key])
      return newObj
    }, {})

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    }
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }
  };

  handleFormReset = () => {
    const { form } = this.props
    form.resetFields()
    this.setState({
      formValues: {},
    })
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    })
  };

  handleMenuClick = e => {
    const { dispatch } = this.props
    const { selectedRows } = this.state

    if (!selectedRows) return

    switch (e.key) {
      case 'remove':
        break
      default:
        break
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    })
  };

  handleSearch = e => {
    e.preventDefault()

    const { dispatch, form } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      }

      this.setState({
        formValues: values,
      })
    })
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    })
  };

  handleAdd = fields => {
    message.success('添加成功')
    this.setState({
      modalVisible: false,
    })
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSearch} layout='inline'>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label='规则编号'>
              {getFieldDecorator('no')(<Input placeholder='请输入' />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label='使用状态'>
              {getFieldDecorator('status')(
                <Select placeholder='请选择' style={{ width: '100%' }}>
                  <Option value='0'>关闭</Option>
                  <Option value='1'>运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className='submitButtons'>
              <Button type='primary' htmlType='submit'>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type='down' />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSearch} layout='inline'>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label='规则编号'>
              {getFieldDecorator('no')(<Input placeholder='请输入' />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label='使用状态'>
              {getFieldDecorator('status')(
                <Select placeholder='请选择' style={{ width: '100%' }}>
                  <Option value='0'>关闭</Option>
                  <Option value='1'>运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label='调用次数'>
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label='更新日期'>
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder='请输入更新日期' />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label='使用状态'>
              {getFieldDecorator('status3')(
                <Select placeholder='请选择' style={{ width: '100%' }}>
                  <Option value='0'>关闭</Option>
                  <Option value='1'>运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label='使用状态'>
              {getFieldDecorator('status4')(
                <Select placeholder='请选择' style={{ width: '100%' }}>
                  <Option value='0'>关闭</Option>
                  <Option value='1'>运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type='primary' htmlType='submit'>
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type='up' />
            </a>
          </span>
        </div>
      </Form>
    )
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm()
  }

  render() {
    const { loading } = this.props
    const { selectedRows, modalVisible } = this.state
    const data = { 'list': [{ 'key': 0, 'disabled': true, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 0', 'title': '一个任务名称 0', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 328, 'status': 3, 'updatedAt': '2017-06-30T16:00:00.000Z', 'createdAt': '2017-06-30T16:00:00.000Z', 'progress': 72 }, { 'key': 1, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 1', 'title': '一个任务名称 1', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 922, 'status': 1, 'updatedAt': '2017-06-30T16:00:00.000Z', 'createdAt': '2017-06-30T16:00:00.000Z', 'progress': 20 }, { 'key': 2, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 2', 'title': '一个任务名称 2', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 144, 'status': 1, 'updatedAt': '2017-07-01T16:00:00.000Z', 'createdAt': '2017-07-01T16:00:00.000Z', 'progress': 66 }, { 'key': 3, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 3', 'title': '一个任务名称 3', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 201, 'status': 2, 'updatedAt': '2017-07-01T16:00:00.000Z', 'createdAt': '2017-07-01T16:00:00.000Z', 'progress': 55 }, { 'key': 4, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 4', 'title': '一个任务名称 4', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 449, 'status': 2, 'updatedAt': '2017-07-02T16:00:00.000Z', 'createdAt': '2017-07-02T16:00:00.000Z', 'progress': 41 }, { 'key': 5, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 5', 'title': '一个任务名称 5', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 579, 'status': 0, 'updatedAt': '2017-07-02T16:00:00.000Z', 'createdAt': '2017-07-02T16:00:00.000Z', 'progress': 63 }, { 'key': 6, 'disabled': true, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 6', 'title': '一个任务名称 6', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 829, 'status': 1, 'updatedAt': '2017-07-03T16:00:00.000Z', 'createdAt': '2017-07-03T16:00:00.000Z', 'progress': 50 }, { 'key': 7, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 7', 'title': '一个任务名称 7', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 540, 'status': 1, 'updatedAt': '2017-07-03T16:00:00.000Z', 'createdAt': '2017-07-03T16:00:00.000Z', 'progress': 73 }, { 'key': 8, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 8', 'title': '一个任务名称 8', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 200, 'status': 0, 'updatedAt': '2017-07-04T16:00:00.000Z', 'createdAt': '2017-07-04T16:00:00.000Z', 'progress': 96 }, { 'key': 9, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 9', 'title': '一个任务名称 9', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 795, 'status': 0, 'updatedAt': '2017-07-04T16:00:00.000Z', 'createdAt': '2017-07-04T16:00:00.000Z', 'progress': 54 }, { 'key': 10, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 10', 'title': '一个任务名称 10', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 90, 'status': 1, 'updatedAt': '2017-07-05T16:00:00.000Z', 'createdAt': '2017-07-05T16:00:00.000Z', 'progress': 33 }, { 'key': 11, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 11', 'title': '一个任务名称 11', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 217, 'status': 0, 'updatedAt': '2017-07-05T16:00:00.000Z', 'createdAt': '2017-07-05T16:00:00.000Z', 'progress': 40 }, { 'key': 12, 'disabled': true, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 12', 'title': '一个任务名称 12', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 227, 'status': 2, 'updatedAt': '2017-07-06T16:00:00.000Z', 'createdAt': '2017-07-06T16:00:00.000Z', 'progress': 21 }, { 'key': 13, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 13', 'title': '一个任务名称 13', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 374, 'status': 2, 'updatedAt': '2017-07-06T16:00:00.000Z', 'createdAt': '2017-07-06T16:00:00.000Z', 'progress': 88 }, { 'key': 14, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 14', 'title': '一个任务名称 14', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 409, 'status': 3, 'updatedAt': '2017-07-07T16:00:00.000Z', 'createdAt': '2017-07-07T16:00:00.000Z', 'progress': 81 }, { 'key': 15, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 15', 'title': '一个任务名称 15', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 287, 'status': 0, 'updatedAt': '2017-07-07T16:00:00.000Z', 'createdAt': '2017-07-07T16:00:00.000Z', 'progress': 65 }, { 'key': 16, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 16', 'title': '一个任务名称 16', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 487, 'status': 3, 'updatedAt': '2017-07-08T16:00:00.000Z', 'createdAt': '2017-07-08T16:00:00.000Z', 'progress': 97 }, { 'key': 17, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 17', 'title': '一个任务名称 17', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 602, 'status': 0, 'updatedAt': '2017-07-08T16:00:00.000Z', 'createdAt': '2017-07-08T16:00:00.000Z', 'progress': 76 }, { 'key': 18, 'disabled': true, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 18', 'title': '一个任务名称 18', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 138, 'status': 0, 'updatedAt': '2017-07-10T00:00:00.000Z', 'createdAt': '2017-07-10T00:00:00.000Z', 'progress': 32 }, { 'key': 19, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 19', 'title': '一个任务名称 19', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 164, 'status': 2, 'updatedAt': '2017-07-10T00:00:00.000Z', 'createdAt': '2017-07-10T00:00:00.000Z', 'progress': 48 }, { 'key': 20, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 20', 'title': '一个任务名称 20', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 544, 'status': 1, 'updatedAt': '2017-07-11T00:00:00.000Z', 'createdAt': '2017-07-11T00:00:00.000Z', 'progress': 91 }, { 'key': 21, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 21', 'title': '一个任务名称 21', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 861, 'status': 0, 'updatedAt': '2017-07-11T00:00:00.000Z', 'createdAt': '2017-07-11T00:00:00.000Z', 'progress': 56 }, { 'key': 22, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 22', 'title': '一个任务名称 22', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 312, 'status': 2, 'updatedAt': '2017-07-12T00:00:00.000Z', 'createdAt': '2017-07-12T00:00:00.000Z', 'progress': 12 }, { 'key': 23, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 23', 'title': '一个任务名称 23', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 26, 'status': 3, 'updatedAt': '2017-07-12T00:00:00.000Z', 'createdAt': '2017-07-12T00:00:00.000Z', 'progress': 89 }, { 'key': 24, 'disabled': true, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 24', 'title': '一个任务名称 24', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 255, 'status': 0, 'updatedAt': '2017-07-13T00:00:00.000Z', 'createdAt': '2017-07-13T00:00:00.000Z', 'progress': 33 }, { 'key': 25, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 25', 'title': '一个任务名称 25', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 170, 'status': 3, 'updatedAt': '2017-07-13T00:00:00.000Z', 'createdAt': '2017-07-13T00:00:00.000Z', 'progress': 18 }, { 'key': 26, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 26', 'title': '一个任务名称 26', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 549, 'status': 3, 'updatedAt': '2017-07-14T00:00:00.000Z', 'createdAt': '2017-07-14T00:00:00.000Z', 'progress': 44 }, { 'key': 27, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 27', 'title': '一个任务名称 27', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 722, 'status': 2, 'updatedAt': '2017-07-14T00:00:00.000Z', 'createdAt': '2017-07-14T00:00:00.000Z', 'progress': 74 }, { 'key': 28, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 28', 'title': '一个任务名称 28', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 574, 'status': 0, 'updatedAt': '2017-07-15T00:00:00.000Z', 'createdAt': '2017-07-15T00:00:00.000Z', 'progress': 61 }, { 'key': 29, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 29', 'title': '一个任务名称 29', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 748, 'status': 1, 'updatedAt': '2017-07-15T00:00:00.000Z', 'createdAt': '2017-07-15T00:00:00.000Z', 'progress': 18 }, { 'key': 30, 'disabled': true, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 30', 'title': '一个任务名称 30', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 310, 'status': 1, 'updatedAt': '2017-07-16T00:00:00.000Z', 'createdAt': '2017-07-16T00:00:00.000Z', 'progress': 22 }, { 'key': 31, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 31', 'title': '一个任务名称 31', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 968, 'status': 0, 'updatedAt': '2017-07-16T00:00:00.000Z', 'createdAt': '2017-07-16T00:00:00.000Z', 'progress': 52 }, { 'key': 32, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 32', 'title': '一个任务名称 32', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 76, 'status': 1, 'updatedAt': '2017-07-17T00:00:00.000Z', 'createdAt': '2017-07-17T00:00:00.000Z', 'progress': 1 }, { 'key': 33, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 33', 'title': '一个任务名称 33', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 834, 'status': 3, 'updatedAt': '2017-07-17T00:00:00.000Z', 'createdAt': '2017-07-17T00:00:00.000Z', 'progress': 1 }, { 'key': 34, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 34', 'title': '一个任务名称 34', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 343, 'status': 2, 'updatedAt': '2017-07-18T00:00:00.000Z', 'createdAt': '2017-07-18T00:00:00.000Z', 'progress': 80 }, { 'key': 35, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 35', 'title': '一个任务名称 35', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 134, 'status': 1, 'updatedAt': '2017-07-18T00:00:00.000Z', 'createdAt': '2017-07-18T00:00:00.000Z', 'progress': 93 }, { 'key': 36, 'disabled': true, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 36', 'title': '一个任务名称 36', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 449, 'status': 0, 'updatedAt': '2017-07-19T00:00:00.000Z', 'createdAt': '2017-07-19T00:00:00.000Z', 'progress': 81 }, { 'key': 37, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 37', 'title': '一个任务名称 37', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 435, 'status': 1, 'updatedAt': '2017-07-19T00:00:00.000Z', 'createdAt': '2017-07-19T00:00:00.000Z', 'progress': 36 }, { 'key': 38, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 38', 'title': '一个任务名称 38', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 80, 'status': 0, 'updatedAt': '2017-07-20T00:00:00.000Z', 'createdAt': '2017-07-20T00:00:00.000Z', 'progress': 76 }, { 'key': 39, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 39', 'title': '一个任务名称 39', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 183, 'status': 3, 'updatedAt': '2017-07-20T00:00:00.000Z', 'createdAt': '2017-07-20T00:00:00.000Z', 'progress': 34 }, { 'key': 40, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 40', 'title': '一个任务名称 40', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 730, 'status': 0, 'updatedAt': '2017-07-21T00:00:00.000Z', 'createdAt': '2017-07-21T00:00:00.000Z', 'progress': 74 }, { 'key': 41, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 41', 'title': '一个任务名称 41', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 364, 'status': 0, 'updatedAt': '2017-07-21T00:00:00.000Z', 'createdAt': '2017-07-21T00:00:00.000Z', 'progress': 4 }, { 'key': 42, 'disabled': true, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 42', 'title': '一个任务名称 42', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 317, 'status': 2, 'updatedAt': '2017-07-22T00:00:00.000Z', 'createdAt': '2017-07-22T00:00:00.000Z', 'progress': 47 }, { 'key': 43, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 43', 'title': '一个任务名称 43', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 326, 'status': 1, 'updatedAt': '2017-07-22T00:00:00.000Z', 'createdAt': '2017-07-22T00:00:00.000Z', 'progress': 22 }, { 'key': 44, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'no': 'TradeCode 44', 'title': '一个任务名称 44', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 711, 'status': 3, 'updatedAt': '2017-07-23T00:00:00.000Z', 'createdAt': '2017-07-23T00:00:00.000Z', 'progress': 94 }, { 'key': 45, 'disabled': false, 'href': 'https://ant.design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', 'no': 'TradeCode 45', 'title': '一个任务名称 45', 'owner': '曲丽丽', 'description': '这是一段描述', 'callNo': 128, 'status': 3, 'updatedAt': '2017-07-23T00:00:00.000Z', 'createdAt': '2017-07-23T00:00:00.000Z', 'progress': 43 }], 'pagination': { 'total': 46, 'pageSize': 10, 'current': 1 }}
    const columns = [
      {
        title: '规则编号',
        dataIndex: 'no',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '服务调用次数',
        dataIndex: 'callNo',
        sorter: true,
        align: 'right',
        render: val => `${val} 万`,
        // mark to display a total number
        needTotal: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        onFilter: (value, record) => record.status.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href=''>配置</a>
            <Divider type='vertical' />
            <a href=''>订阅警报</a>
          </Fragment>
        ),
      },
    ]

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key='remove'>删除</Menu.Item>
        <Menu.Item key='approval'>批量审批</Menu.Item>
      </Menu>
    )

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    }

    return (
      <PageHeaderLayout title='查询表格'>
        <Card bordered={false}>
          <div className='tableList'>
            <div className='tableListForm'>{this.renderForm()}</div>
            <div className='tableListOperator'>
              <Button icon='plus' type='primary' onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type='down' />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    )
  }
}
