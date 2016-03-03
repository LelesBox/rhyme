import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as NaviBarActions from '../../actions/navigationBarAction'
import NavigationBar from '../../components/NavigationBar'
import ContentView from '../../components/ContentView'
import TagView from '../../components/TagView'
import style from './style.scss'

class ArticleView extends Component {
  render() {
    const {navi, naviActions} = this.props
    return (
      <div>
        <div className={style.contenView}>
          <ContentView></ContentView>
        </div>
        <div className={style.tagView}>
          <TagView></TagView>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {navi: state.navi}
}

function mapDispatchToProps(dispatch) {
  return {
    naviActions: bindActionCreators(NaviBarActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView)
