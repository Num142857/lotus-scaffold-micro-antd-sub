import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { observer, Observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Modal, Tag, Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Table, InputNumber, DatePicker, Radio, message, Badge, Upload, Checkbox, Cascader } from 'antd'
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
export default class NewNotice extends Component {
  componentWillMount() {
    store = new Store()
    store.fetchCityList()
    store.fetchProject()
    store.fetchBidInfoList()
  }
  componentDidMount() {
  }
  addNotice = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.endTime = moment(values.endTime).format('YYYY-MM-DD HH:mm')
        store.addNotice(values, this.props.history)
      }
    })
  }
  suffixLen = (field, max) => {
    console.log(this.props.form.getFieldsValue())
    return <span style={{ color: '#00000073' }}>{(this.props.form.getFieldsValue()[field] || '').length}/{max}</span>
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '文档名称',
        dataIndex: 'fileName'
      },
      {
        title: '对外显示的文档名称',
        dataIndex: 'fileOutName',
        render: (text, record, index) => {
          return <Observer>{() =>
            <Form.Item>
              {getFieldDecorator('file' + record.id, {
                rules: [{ required: true, message: '请输入公告名称' }, { max: 40, message: '不能超过40字' }],
                initialValue: text,
              })(<Input />)
              }
            </Form.Item>
          }
          </Observer>
        },
      },
      {
        title: '显示',
        dataIndex: 'isDisplay',
        className: 'table-center',
        render: (text, record, index) => {
          return <Observer>{() => <Checkbox onChange={() => store.changeCheckbox(record)} checked={text === 0} />}</Observer>
        },
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <a onClick={() => store.removeFlie(record)}> 删除</a>
        ),
      },
    ]
    const uploadButton = (
      <div>
        <Icon type={store.Uploading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>图片上传</div>
      </div>
    )

    let bidInfoColumns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '招标文件名称',
        dataIndex: 'name',
        width: 150
      },
      {
        title: '项目名称',
        dataIndex: 'projectName',
        width: 150
      },
      {
        title: '所属小镇',
        dataIndex: 'townName',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (text, record, index) => {
          let str = ''
          switch (text) {
            case 0:
              str = '未发起'
              break
            case 1:
              str = '审批中'
              break
            case 2:
              str = '审批通过'
              break
            case 3:
              str = '终止审批'
              break
          }
          return str
        },
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <a onClick={() => store.lineFlie(record)}> 关联</a>
        ),
      },
    ]
    const fileModal = (
      <Modal
        title='选择招标文件'
        visible={store.modalVisible}
        onCancel={store.closeModal}
        // bodyStyle={{ padding: 0 }}
        width={800}
        footer={null}
      >
        <Table
          loading={store.loading}
          dataSource={store.bidInfoList}
          columns={bidInfoColumns}
          onChange={store.handleBidFileTableChange}
          pagination={{
            pageSize: store.bidFilePageInfo.pageSize,
            total: store.bidFilePageInfo.records,
            showTotal: total => `共 ${total} 条数据`,
            defaultPageSize: 10,
          }}
        />
      </Modal>
    )
    return (
      <div className='new-notice'>
        <PageHeaderLayout title='新增公告'>
          <Card title='项目概况' className='card' bordered={false}>
            <Form layout='vertical' onSubmit={this.addNotice}>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label='公告名称'>
                    {getFieldDecorator('noticeName', {
                      rules: [{ required: true, message: '请输入公告名称' }, { max: 40, message: '不能超过40字' }],
                    })(<Input placeholder='请输入公告名称' />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label='报名截止时间'>
                    {getFieldDecorator('endTime', {
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <DatePicker format={dateFormat} showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }} placeholder='报名截止时间' style={{ width: '100%' }} />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label='招标类型'>
                    {getFieldDecorator('bidType', {
                      rules: [{ required: true, message: '请选择招标类型' }],
                    })(
                      <Select placeholder='招标类型'>
                        {(store.biddingType || []).map((item, index) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label='所属小镇'>
                    {getFieldDecorator('townId')(
                      <Select
                        style={{ width: '100%' }}
                        showSearch
                        allowClear
                        placeholder='请选择所属小镇'
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        {(store.projectList || []).map((item) => <Option key={item.id} value={item.id}>{item.proName}</Option>)}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label='所在城市'>
                    {getFieldDecorator('city', {
                      rules: [{ required: true, message: '请选择所在城市' }],
                    })(
                      <Cascader options={store.cityList} onChange={() => {}} placeholder='请选择所在城市' />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label='业务类型'>
                    {getFieldDecorator('businessType', {
                      rules: [{ required: true, message: '请选择业务类型' }],
                    })(
                      <Select placeholder='请选择业务类型'>
                        {(store.businessType || []).map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title='投标须知' className='card' bordered={false}>
            <Form layout='vertical' >
              <Row gutter={16}>
                <Col lg={24} md={12} sm={24}>
                  <Form.Item label='投标须知'>
                    {getFieldDecorator('noticeContent', {
                      rules: [{ required: true, message: '请输入投标须知' }, { max: 2000, message: '不能超过2000字' }],
                    })(<TextArea placeholder='投标须知' autosize={{ minRows: 6 }} className='suffix-input' />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title='联系方式' className='card' bordered={false}>
            <Form layout='vertical' >
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label='联系人'>
                    {getFieldDecorator('linkman', {
                      rules: [{ required: true, message: '请输入联系人' }, { max: 20, message: '不能超过20字' }],
                    })(<Input placeholder='请输入联系人' />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label='联系电话'>
                    {getFieldDecorator('phone', {
                      rules: [
                        { required: true, message: '请输入联系电话' }
                      ],
                    })(
                      <Input placeholder='联系电话' />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label='联系邮箱'>
                    {getFieldDecorator('email', {
                      rules: [
                        { required: true, message: '请输入联系邮箱' },
                        { type: 'email', message: '请输入正确邮箱' }
                      ],
                    })(
                      <Input placeholder='联系邮箱' />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title='其他设置' className='card' bordered={false}>
            <Form layout='vertical' >
              <Row gutter={16}>
                <Col lg={24} md={12} sm={24}>
                  <Form.Item label='显示平台'>
                    {getFieldDecorator('displays', {
                      rules: [{ required: true, message: '请选择显示平台' }],
                      // valuePropName: 'checked',
                    })(
                      <CheckboxGroup options={[
                        { label: '官网', value: 'displayPc' },
                        { label: '金诚逸', value: 'displayApp' },
                      ]}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title='APP分享设置' className='card' bordered={false}>
            <Form layout='vertical' >
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24} span={16}>
                  <Form.Item label='标题'>
                    <div>
                      {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入标题' }, { max: 20, message: '不能超过20字' }],
                      })(
                        <Input placeholder='请输入标题' />
                      )}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24} span={16}>
                  <Form.Item label='摘要'>
                    <div>
                      {getFieldDecorator('summary', {
                        rules: [{ required: true, message: '请输入摘要' }, { max: 30, message: '不能超过30字' }],
                      })(
                        <Input placeholder='请输入摘要' />
                      )}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24} >
                  <Form.Item label='分享配图'>
                    <p className='avatar-upload-remark'>图片支持png,jpg格式,建议尺寸 200*200</p>
                    <div>
                      {getFieldDecorator('shareImg', {
                        rules: [{ required: true, message: '需要上传配图' }],
                      })(
                        <Upload
                          name='document'
                          listType='picture-card'
                          className='avatar-uploader'
                          accept='.png, .jpg, .jpge,.PNG, .JPG,  .JPGE'
                          showUploadList={false}
                          action='/bidding/files/upload'
                          data={{ docType: 2 }}
                          beforeUpload={store.beforeUpload}
                          onChange={store.handleShareChange}
                        >
                          {store.imageUrl ? <img style={{ width: '200px', height: '200px' }} src={store.imageUrl} alt='' /> : uploadButton}
                        </Upload>
                      )}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card title='招标文件' className='card' bordered={false}>
            <Form layout='vertical' >
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24} span={16}>
                  <Button icon='plus' type='primary' onClick={store.openModal}>关联招标文件</Button>
                  {fileModal}
                  <div className='file-tag'>{store.currentBidInfo ? <Tag closable onClose={store.clearBidInfo}>{store.currentBidInfo.id}.{store.currentBidInfo.name}</Tag> : null}</div>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title='附件' className='card' bordered={false}>
            <div className='tableList'>
              <div className='tableListOperator'>
                <Upload
                  name='document'
                  action='/bidding/files/upload'
                  accept='.doc, .xls,  .docx, .xlsx, .txt, .pdf,.DOC, .XLS, .DOCX, .XLSX, .TXT, .PDF'
                  onChange={store.uploadFileListChange.bind(store)}
                  data={{ docType: 0 }}
                  multiple
                >
                  <Button icon='plus' type='primary'>上传附件</Button>
                </Upload>
                <p className='upload-remark'>可支持doc、pdf、xls 、txt等格式的文件，每个文件大小不得超过64M</p>
              </div>
              <Table
                loading={store.loading}
                dataSource={store.fileList}
                columns={columns}
                defaultPageSize={10}
              />
            </div>

          </Card>
          <div className='subimit-box'>
            <Button disabled={store.submiting} onClick={(e) => {
              this.addNotice(e)
            }}
            >
             提交
            </Button>
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
