import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import style from './style.scss'

class NavigationBar extends Component {
  constructor(props) {
    super(props)
    // 初始化
    this.props.actions.InitNavi()
  }

  render() {
    console.log(this.props)
    const {selectArticle, selectDaily, selectFavorite, selectSummary, actions} = this.props
    return (
      <div className={style.container}>
        <ul className={style.navigateUl}>
          <li className={selectSummary
            ? style.naviSelect
            : ""} onClick={() => {
            actions.ClickNaviSummary();
            browserHistory.push('/summary');
          }}>
            <span>摘要</span>
          </li>
          <li className={selectArticle
            ? style.naviSelect
            : ""} onClick={() => {
            actions.ClickNaviArticle();
            browserHistory.push('/article');
          }}>文章</li>
          <li className={selectDaily
            ? style.naviSelect
            : ""} onClick={() => {
            actions.ClickNaviDaily();
            browserHistory.push('/daily');
          }}>日记</li>
          <li className={selectFavorite
            ? style.naviSelect
            : ""} onClick={() => {
            actions.ClickNaviFavorite();
            browserHistory.push('/fav');
          }}>收藏</li>
        </ul>
      </div>
    )
  }
}

export default NavigationBar
