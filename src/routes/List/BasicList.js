import React, { PureComponent } from 'react'
import moment from 'moment'
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
} from 'antd'

import PageHeaderLayout from '../../layouts/PageHeaderLayout'

import styles from './BasicList.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { Search } = Input

export default class BasicList extends PureComponent {
  componentDidMount() {
  }

  render() {
    const { loading } = this.props
    const list = [{ 'id': 'fake-list-0', 'owner': '付小小', 'title': 'Alipay', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png', 'status': 'active', 'percent': 94, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T13:56:15.573Z', 'createdAt': '2018-05-01T13:56:15.573Z', 'subDescription': '那是一种内在的东西， 他们到达不了，也无法触及的', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 168559, 'newUser': 1868, 'star': 120, 'like': 186, 'message': 19, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-1', 'owner': '曲丽丽', 'title': 'Angular', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png', 'status': 'exception', 'percent': 75, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T11:56:15.573Z', 'createdAt': '2018-05-01T11:56:15.573Z', 'subDescription': '希望是一个好东西，也许是最好的，好东西是不会消亡的', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 106810, 'newUser': 1218, 'star': 183, 'like': 106, 'message': 15, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-2', 'owner': '林东东', 'title': 'Ant Design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png', 'status': 'normal', 'percent': 73, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T09:56:15.573Z', 'createdAt': '2018-05-01T09:56:15.573Z', 'subDescription': '生命就像一盒巧克力，结果往往出人意料', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 128592, 'newUser': 1885, 'star': 187, 'like': 120, 'message': 12, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-3', 'owner': '周星星', 'title': 'Ant Design Pro', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png', 'status': 'active', 'percent': 92, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T07:56:15.573Z', 'createdAt': '2018-05-01T07:56:15.573Z', 'subDescription': '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 159119, 'newUser': 1157, 'star': 139, 'like': 166, 'message': 11, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-4', 'owner': '吴加好', 'title': 'Bootstrap', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png', 'status': 'exception', 'percent': 57, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T05:56:15.573Z', 'createdAt': '2018-05-01T05:56:15.573Z', 'subDescription': '那时候我只会想自己想要什么，从不想自己拥有什么', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 119558, 'newUser': 1822, 'star': 198, 'like': 124, 'message': 16, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }]
    const Info = ({ title, value, bordered }) => (
      <div className='headerInfo'>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    )

    const extraContent = (
      <div className='extraContent'>
        <RadioGroup defaultValue='all'>
          <RadioButton value='all'>全部</RadioButton>
          <RadioButton value='progress'>进行中</RadioButton>
          <RadioButton value='waiting'>等待中</RadioButton>
        </RadioGroup>
        <Search className='extraContentSearch' placeholder='请输入' onSearch={() => ({})} />
      </div>
    )

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    }

    const ListContent = ({ data: { owner, createdAt, percent, status }}) => (
      <div className='listContent'>
        <div className='listContentItem'>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className='listContentItem'>
          <span>开始时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className='listContentItem'>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    )

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    )

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type='down' />
        </a>
      </Dropdown>
    )

    return (
      <PageHeaderLayout>
        <div className='standardList'>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title='我的待办' value='8个任务' bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title='本周任务平均处理时间' value='32分钟' bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title='本周完成任务数' value='24个任务' />
              </Col>
            </Row>
          </Card>

          <Card
            className='listCard'
            bordered={false}
            title='标准列表'
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button type='dashed' style={{ width: '100%', marginBottom: 8 }} icon='plus'>
              添加
            </Button>
            <List
              size='large'
              rowKey='id'
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item actions={[<a>编辑</a>, <MoreBtn />]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape='square' size='large' />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    )
  }
}
