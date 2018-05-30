import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { observer, Observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Table, InputNumber, DatePicker, Radio, message, Badge, Upload, Checkbox, Cascader } from 'antd'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'
import FooterToolbar from 'Components/FooterToolbar'
import './style.less'
import Store from './store'
const CheckboxGroup = Checkbox.Group
const Search = Input.Search
const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input
const dateFormat = 'YYYY-MM-DD HH:mm'
let store
@Form.create()
@observer
export default class NoticeDetail extends Component {
  componentWillMount() {
    store = new Store()
    let { params } = this.props.match

    store.fetchData({ id: params.id })
  }
  componentDidMount() {
  }
  handleFormReset = () => {
    const { form } = this.props
    form.resetFields()
  };
  addNotice = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.endTime = moment(values.endTime).format('YYYY-MM-DD HH:mm')
        store.addNotice(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const uploadButton = (
      <div>
        <Icon type={store.Uploading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>图片上传</div>
      </div>
    )
    let formLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    }
    return (
      <div className='new-notice notice-detail'>
        <PageHeaderLayout title='公告信息'>
          <Card title='项目概况' className='card' bordered={false}>
            <Form>
              <Row gutter={16} className='lable-p-b-30'>
                <Col lg={6} md={12} sm={24}>
                  公告编号: {store.detailData.id}
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                创建人:{store.detailData.createdBy}
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                创建时间:{store.detailData.gmtCreate}
                </Col>
              </Row>
              <Row gutter={16} className='lable-p-b-30'>
                <Col lg={6} md={12} sm={24}>
                  公告名称: {store.detailData.noticeName}
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                报名截止时间:{store.detailData.endTime}
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                招标类型:{store.detailData.biddingTypeName}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                所属小镇:{store.detailData.townName}
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                所在城市:{store.detailData.cityName}
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                业务类型:{store.detailData.businessTypeName}
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title='投标须知' className='card' bordered={false}>
            <Form layout='vertical' >
              <Row gutter={16}>
                <Col lg={24} md={12} sm={24}>
                  {store.detailData.noticeContent}
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title='联系方式' className='card' bordered={false}>
            <Form >
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  联系人: {store.detailData.linkman}
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  联系电话:{store.detailData.phone}
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  联系邮箱:{store.detailData.email}
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title='其他设置' className='card' bordered={false}>
            <Form >
              <Row>
                <Col lg={6} md={12} sm={24}>
                显示平台: {store.detailData.displayApp === 0 ? '金诚逸   ' : ''}
                  {store.detailData.displayPc === 0 ? '官网' : ''}
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
            </Form>
          </Card>

          <Card title='APP分享设置' className='card' bordered={false}>
            <Form >
              <Row gutter={16} className='lable-p-b-30'>
                <Col lg={8} md={12} sm={24} span={16}>
                标题:{store.detailData.title}
                </Col>
              </Row>
              <Row gutter={16} className='lable-p-b-30'>
                <Col lg={8} md={12} sm={24} span={16}>
                摘要 :{store.detailData.summary}
                </Col>
              </Row>
              <Row gutter={16} className='lable-p-b-30'>
                <Col lg={8} md={12} sm={24} >
                  分享配图:
                  <img style={{ width: '200px', height: '200px', display: 'block' }} src={store.imageUrl} />
                </Col>
              </Row>
            </Form>
          </Card>
          <Card title='招标文件' className='card' bordered={false}>
            <Form layout='vertical'>
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24} span={16}>
                  {store.detailData.fileReviewId
                    ? <Link to={`/project/flow/flowInfo/${store.detailData.fileReviewId}`}>
                      {store.detailData.fileReviewId}. {store.detailData.fileReviewName}
                    </Link>
                    : null}
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title='附件' className='card' bordered={false}>
            {(store.fileList || []).map((item, index) => <a style={{ display: 'block', paddingBottom: 10 }} key={index} href={`/bidding/files/download?url=${item.url}&id=${item.id}`} download>{item.fileOutName || item.fileName}</a>)}
          </Card>
          <div className='subimit-box'>
            <Button onClick={() => this.props.history.push('/project/notice/list')}>返回</Button>
          </div>

          {/* <FooterToolbar style={{ width: '100%' }}>
            <Button type='primary'>
            提交
            </Button>
          </FooterToolbar> */}
        </PageHeaderLayout>
      </div>
    )
  }
}
