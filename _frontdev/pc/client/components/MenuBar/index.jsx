import React, {Component} from 'react'
import style from './style.scss';
import {VelocityComponent, VelocityTransitionGroup, velocityHelpers} from 'velocity-react';
import * as ui from 'velocity-animate/velocity.ui';
import SliderBar from "./SliderBar"

let myAnimations = {
  show: velocityHelpers.registerEffect({
    // longer due to spring timing
    defaultDuration: 400,
    calls: [
      [
        {
          width: '33%'
        },
        0.1
      ],
      [
        {
          opacity: 1,
          translateX: [0, 50]
        },
        1.0, {
          // delay: 100,
          // easing: 'ease-in'
        }
      ]
    ]
  }),
  hide: velocityHelpers.registerEffect({
    defaultDuration: 400,
    calls: [
      [
        {
          opacity: 0,
          translateX: [50, 0]
        },1
      ],
      [
        {
          width: "0px"
        },1
      ]
    ]
  })
}

class MenuBar extends Component {
  ExpandMenu() {
    console.log(this.props.showSlideComponent)
    this.props.showSlideComponent
      ? this.props.actions.InitMenu()
      : this.props.actions.ExpandMenu()
  }

  render() {
    const {width, showSlideComponent, actions} = this.props
    return (
      <div className={style.menu}>
        <div className={style.leftmenu}>
          <ul className={style.itemContainer}>
            <li>
              <i className="fa fa-reorder fa-2x" style={{
                color: this.props.showSlideIconColor
              }} onClick={:: this.ExpandMenu}></i>
            </li>
            <li>
              <i className="fa fa-search fa-2x" style={{
                color: this.props.showSearchIconColor
              }} onClick={() => {
                this.props.actions.ClickSearch()
              }}></i>
            </li>
            <li>
              <i className="fa fa-heart-o fa-2x" style={{
                color: this.props.showFavIconColor
              }} onClick={() => {
                this.props.actions.ClickFav()
              }}></i>
            </li>
            <li>
              <i className="fa fa-file-text-o fa-2x" style={{
                color: this.props.showArticleIconColor
              }} onClick={() => {
                this.props.actions.ClickArticle()
              }}></i>
            </li>
            <li>
              <i className="fa fa-terminal fa-2x" style={{
                color: this.props.showMydemoIconColor
              }} onClick={() => {
                this.props.actions.ClickDemo()
              }}></i>
            </li>
            <li>
              <i className="fa fa-user fa-2x" style={{
                color: this.props.showProfileIconColor
              }} onClick={() => {
                this.props.actions.ClickProfile()
              }}></i>
            </li>
          </ul>
        </div>
        <VelocityComponent animation={showSlideComponent
          ? myAnimations.show
          : myAnimations.hide}>
          <SliderBar className={style.rightmenu}></SliderBar>
        </VelocityComponent>
      </div>
    )
  }
}

export default MenuBar
