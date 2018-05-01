import React, { PureComponent } from 'react';
import { Card, Button, Icon, List } from 'antd';
import Ellipsis from 'Components/Ellipsis';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CardList.less';

export default class CardList extends PureComponent {
  componentDidMount() {

  }

  render() {
    const { loading } = this.props;
    const list = [{ "id": "fake-list-0", "owner": "付小小", "title": "Alipay", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png", "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png", "status": "active", "percent": 53, "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png", "href": "https://ant.design", "updatedAt": "2018-05-01T13:58:24.293Z", "createdAt": "2018-05-01T13:58:24.293Z", "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的", "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。", "activeUser": 194359, "newUser": 1570, "star": 167, "like": 148, "message": 18, "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。", "members": [{ "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", "name": "曲丽丽" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", "name": "王昭君" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", "name": "董娜娜" }] }, { "id": "fake-list-1", "owner": "曲丽丽", "title": "Angular", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png", "status": "exception", "percent": 52, "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", "href": "https://ant.design", "updatedAt": "2018-05-01T11:58:24.293Z", "createdAt": "2018-05-01T11:58:24.293Z", "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的", "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。", "activeUser": 117754, "newUser": 1562, "star": 151, "like": 127, "message": 19, "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。", "members": [{ "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", "name": "曲丽丽" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", "name": "王昭君" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", "name": "董娜娜" }] }, { "id": "fake-list-2", "owner": "林东东", "title": "Ant Design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", "cover": "https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png", "status": "normal", "percent": 92, "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", "href": "https://ant.design", "updatedAt": "2018-05-01T09:58:24.293Z", "createdAt": "2018-05-01T09:58:24.293Z", "subDescription": "生命就像一盒巧克力，结果往往出人意料", "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。", "activeUser": 109128, "newUser": 1091, "star": 127, "like": 185, "message": 11, "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。", "members": [{ "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", "name": "曲丽丽" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", "name": "王昭君" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", "name": "董娜娜" }] }, { "id": "fake-list-3", "owner": "周星星", "title": "Ant Design Pro", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png", "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png", "status": "active", "percent": 70, "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png", "href": "https://ant.design", "updatedAt": "2018-05-01T07:58:24.293Z", "createdAt": "2018-05-01T07:58:24.293Z", "subDescription": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆", "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。", "activeUser": 169432, "newUser": 1259, "star": 111, "like": 176, "message": 18, "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。", "members": [{ "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", "name": "曲丽丽" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", "name": "王昭君" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", "name": "董娜娜" }] }, { "id": "fake-list-4", "owner": "吴加好", "title": "Bootstrap", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png", "cover": "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png", "status": "exception", "percent": 76, "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png", "href": "https://ant.design", "updatedAt": "2018-05-01T05:58:24.293Z", "createdAt": "2018-05-01T05:58:24.293Z", "subDescription": "那时候我只会想自己想要什么，从不想自己拥有什么", "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。", "activeUser": 169721, "newUser": 1622, "star": 152, "like": 111, "message": 19, "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。", "members": [{ "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", "name": "曲丽丽" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", "name": "王昭君" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", "name": "董娜娜" }] }, { "id": "fake-list-5", "owner": "朱偏右", "title": "React", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png", "cover": "https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png", "status": "normal", "percent": 54, "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png", "href": "https://ant.design", "updatedAt": "2018-05-01T03:58:24.293Z", "createdAt": "2018-05-01T03:58:24.293Z", "subDescription": "那是一种内在的东西， 他们到达不了，也无法触及的", "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。", "activeUser": 190161, "newUser": 1008, "star": 188, "like": 119, "message": 18, "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。", "members": [{ "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", "name": "曲丽丽" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", "name": "王昭君" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", "name": "董娜娜" }] }, { "id": "fake-list-6", "owner": "鱼酱", "title": "Vue", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png", "cover": "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png", "status": "active", "percent": 63, "logo": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png", "href": "https://ant.design", "updatedAt": "2018-05-01T01:58:24.293Z", "createdAt": "2018-05-01T01:58:24.293Z", "subDescription": "希望是一个好东西，也许是最好的，好东西是不会消亡的", "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。", "activeUser": 119002, "newUser": 1923, "star": 122, "like": 188, "message": 20, "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。", "members": [{ "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", "name": "曲丽丽" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", "name": "王昭君" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", "name": "董娜娜" }] }, { "id": "fake-list-7", "owner": "乐哥", "title": "Webpack", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png", "cover": "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png", "status": "exception", "percent": 63, "logo": "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png", "href": "https://ant.design", "updatedAt": "2018-04-30T23:58:24.293Z", "createdAt": "2018-04-30T23:58:24.293Z", "subDescription": "生命就像一盒巧克力，结果往往出人意料", "description": "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。", "activeUser": 111209, "newUser": 1092, "star": 167, "like": 132, "message": 18, "content": "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。", "members": [{ "avatar": "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", "name": "曲丽丽" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", "name": "王昭君" }, { "avatar": "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", "name": "董娜娜" }] }]
    const content = (
      <div className={'pageHeaderContent'}>
        <p>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={'contentLink'}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={'extraImg'}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    return (
      <PageHeaderLayout title="卡片列表" content={content} extraContent={extraContent}>
        <div className={'cardList'}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={'card'} actions={[<a>操作一</a>, <a>操作二</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={'cardAvatar'} src={item.avatar} />}
                      title={<a href="#">{item.title}</a>}
                      description={
                        <Ellipsis className={'item'} lines={3}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={'newButton'}>
                    <Icon type="plus" /> 新增产品
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
