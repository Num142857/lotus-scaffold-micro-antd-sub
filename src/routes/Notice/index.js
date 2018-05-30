import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import NotFound from '../Exception/404'
import { getRoutes } from '../../utils/utils'
export default class Notice extends Component {
    state={}
    render() {
      let { match, routerData } = this.props
      return (
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))}
          <Redirect exact from='/project/notice/' to='/project/notice/list' />
          <Route render={NotFound} />
        </Switch>
      )
    }
}
