import React, { PureComponent } from 'react'
import moment from 'moment'
import { Row, Col, Form, Card, Select, List } from 'antd'

import TagSelect from 'Components/TagSelect'
import AvatarList from 'Components/AvatarList'
import Ellipsis from 'Components/Ellipsis'
import StandardFormRow from 'Components/StandardFormRow'

import styles from './Projects.less'

const { Option } = Select
const FormItem = Form.Item

/* eslint react/no-array-index-key: 0 */
@Form.create()
export default class CoverCardList extends PureComponent {
  componentDidMount() {
  }

  handleFormSubmit = () => {
    const { form, dispatch } = this.props
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields(err => {
        if (!err) {
          // eslint-disable-next-line
        }
      })
    }, 0)
  };

  render() {
    const { loading, form } = this.props
    const { getFieldDecorator } = form
    const list = [{ 'id': 'fake-list-0', 'owner': '付小小', 'title': 'Alipay', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png', 'status': 'active', 'percent': 81, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T14:01:27.876Z', 'createdAt': '2018-05-01T14:01:27.876Z', 'subDescription': '那是一种内在的东西， 他们到达不了，也无法触及的', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 153178, 'newUser': 1268, 'star': 168, 'like': 106, 'message': 11, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-1', 'owner': '曲丽丽', 'title': 'Angular', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png', 'status': 'exception', 'percent': 97, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T12:01:27.876Z', 'createdAt': '2018-05-01T12:01:27.876Z', 'subDescription': '希望是一个好东西，也许是最好的，好东西是不会消亡的', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 162059, 'newUser': 1666, 'star': 136, 'like': 130, 'message': 18, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-2', 'owner': '林东东', 'title': 'Ant Design', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png', 'status': 'normal', 'percent': 90, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T10:01:27.876Z', 'createdAt': '2018-05-01T10:01:27.876Z', 'subDescription': '生命就像一盒巧克力，结果往往出人意料', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 185198, 'newUser': 1127, 'star': 164, 'like': 186, 'message': 17, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-3', 'owner': '周星星', 'title': 'Ant Design Pro', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png', 'status': 'active', 'percent': 54, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T08:01:27.876Z', 'createdAt': '2018-05-01T08:01:27.876Z', 'subDescription': '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 132230, 'newUser': 1070, 'star': 139, 'like': 109, 'message': 15, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-4', 'owner': '吴加好', 'title': 'Bootstrap', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png', 'status': 'exception', 'percent': 91, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T06:01:27.876Z', 'createdAt': '2018-05-01T06:01:27.876Z', 'subDescription': '那时候我只会想自己想要什么，从不想自己拥有什么', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 134206, 'newUser': 1408, 'star': 116, 'like': 177, 'message': 14, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-5', 'owner': '朱偏右', 'title': 'React', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png', 'status': 'normal', 'percent': 58, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T04:01:27.877Z', 'createdAt': '2018-05-01T04:01:27.877Z', 'subDescription': '那是一种内在的东西， 他们到达不了，也无法触及的', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 130686, 'newUser': 1298, 'star': 174, 'like': 133, 'message': 20, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-6', 'owner': '鱼酱', 'title': 'Vue', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png', 'status': 'active', 'percent': 61, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T02:01:27.877Z', 'createdAt': '2018-05-01T02:01:27.877Z', 'subDescription': '希望是一个好东西，也许是最好的，好东西是不会消亡的', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 109075, 'newUser': 1952, 'star': 168, 'like': 122, 'message': 16, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }, { 'id': 'fake-list-7', 'owner': '乐哥', 'title': 'Webpack', 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', 'cover': 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png', 'status': 'exception', 'percent': 84, 'logo': 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', 'href': 'https://ant.design', 'updatedAt': '2018-05-01T00:01:27.877Z', 'createdAt': '2018-05-01T00:01:27.877Z', 'subDescription': '生命就像一盒巧克力，结果往往出人意料', 'description': '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。', 'activeUser': 171213, 'newUser': 1006, 'star': 160, 'like': 183, 'message': 11, 'content': '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。', 'members': [{ 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', 'name': '曲丽丽' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png', 'name': '王昭君' }, { 'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', 'name': '董娜娜' }] }]
    const cardList = list ? (
      <List
        rowKey='id'
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className='card'
              hoverable
              cover={<img alt={item.title} src={item.cover} height={154} />}
            >
              <Card.Meta
                title={<a href='#'>{item.title}</a>}
                description={<Ellipsis lines={2}>{item.subDescription}</Ellipsis>}
              />
              <div className='cardItemContent'>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className='avatarList'>
                  <AvatarList size='mini'>
                    {item.members.map((member, i) => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${i}`}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }

    return (
      <div className='coverCardList'>
        <Card bordered={false}>
          <Form layout='inline'>
            <StandardFormRow title='所属类目' block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect onChange={this.handleFormSubmit} expandable>
                    <TagSelect.Option value='cat1'>类目一</TagSelect.Option>
                    <TagSelect.Option value='cat2'>类目二</TagSelect.Option>
                    <TagSelect.Option value='cat3'>类目三</TagSelect.Option>
                    <TagSelect.Option value='cat4'>类目四</TagSelect.Option>
                    <TagSelect.Option value='cat5'>类目五</TagSelect.Option>
                    <TagSelect.Option value='cat6'>类目六</TagSelect.Option>
                    <TagSelect.Option value='cat7'>类目七</TagSelect.Option>
                    <TagSelect.Option value='cat8'>类目八</TagSelect.Option>
                    <TagSelect.Option value='cat9'>类目九</TagSelect.Option>
                    <TagSelect.Option value='cat10'>类目十</TagSelect.Option>
                    <TagSelect.Option value='cat11'>类目十一</TagSelect.Option>
                    <TagSelect.Option value='cat12'>类目十二</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title='其它选项' grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label='作者'>
                    {getFieldDecorator('author', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder='不限'
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value='lisa'>王昭君</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label='好评度'>
                    {getFieldDecorator('rate', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder='不限'
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value='good'>优秀</Option>
                        <Option value='normal'>普通</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <div className='cardList'>{cardList}</div>
      </div>
    )
  }
}
