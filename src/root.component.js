import React from 'react'
import { Provider } from 'react-redux'
import App from './models/example/App'
import BasicLayout from './layouts/BasicLayout'
import UserLayout from './layouts/UserLayout'
import {
  BrowserRouter,
  Route,
  Router,
  HashRouter,
  hashHistory,
  Switch,
  Redirect
} from 'react-router-dom'
import { getRouterData } from './common/router'
export default class RootComponent extends React.Component {
    state = { store: this.props.store, globalEventDistributor: this.props.globalEventDistributor };

    componentDidCatch(error, info) {
      console.log(error, info)
    }
    componentWillMount() {
      let previousPath = ''
      this.props.history.listen((location, action) => {
        console.log('网址改变了,sub已经知道')
        if (previousPath === location.pathname) return
        console.log('前后网址不一样,准备跳转')
        console.log(location, action)
        // 记录一下
        previousPath = location.pathname
        if (action === 'PUSH') { this.props.globalEventDistributor.dispatch({ type: 'to', path: location.pathname }) }
      })
    }

    setStore(store) {
      this.setState({ ...this.state, store: store })
    }

    setGlobalEventDistributor(globalEventDistributor) {
      this.setState({ ...this.state, globalEventDistributor: globalEventDistributor })
    }

    render() {
      let ret = <div></div>
      const routerData = getRouterData()
      let customProps = { routerData: routerData, globalEventDistributor: this.state.globalEventDistributor }
      console.log(routerData)
      console.log(this.props)
      if (this.state.store && this.state.globalEventDistributor) {
        ret = <Provider store={this.state.store}>
          <Router history={this.props.history}>
            <Switch>
              <Route render={props => <BasicLayout {...customProps} {...props} />} />
            </Switch>
          </Router>
        </Provider>
      }
      return ret
    }
}
