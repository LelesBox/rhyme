import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MenuBar from '../../components/MenuBar'
import NavigationBar from '../../components/NavigationBar'
import * as NaviBarActions from '../../actions/navigationBarAction'
import * as MenuActions from '../../actions/menuAction'
import Article from '../Article'
import Daily from '../Daily'
import style from './style.scss'
import { Link, browserHistory } from 'react-router'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {menu, navi, menuActions, naviActions, children} = this.props
    return (
      <div className={style.content}>
        <div className={style.rightContent}>
          <div className={style.rightContentContainer}>
            {/*<NavigationBar {...navi} actions={naviActions}></NavigationBar>*/}
            {children}
          </div>
        </div>
        <MenuBar {...menu} actions={menuActions}></MenuBar>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {menu: state.menu, navi: state.navi}
}

function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(MenuActions, dispatch),
    naviActions: bindActionCreators(NaviBarActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
