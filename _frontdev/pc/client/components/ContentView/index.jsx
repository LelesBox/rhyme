import React, {Component} from 'react'
import style from './style.scss'

class ContentListView extends Component {
  render() {
    var s = [
      {
        id: 0,
        avatar: 'https://cdn-images-1.medium.com/fit/c/36/36/1*W9JOI6bJJ2iniOxwSGC2iQ.png',
        authorname: "Jon Westenberg",
        tag: "Life Learning",
        time: "15 hr ago!!!!!",
        image: "https://cdn-images-1.medium.com/fit/t/800/240/1*TuuANmxjJpzKrzdfbNlm_A.jpeg",
        title: "我的博客实践之路",
        summary: "这是一段测试摘要，很多时候我也想拥有自己的博客，这不，我自己做出来了，下面是我自己搭建网站时记录的一些实践总结"
      },
      {
        id: 2,
        avatar: 'https://cdn-images-1.medium.com/fit/c/36/36/1*W9JOI6bJJ2iniOxwSGC2iQ.png',
        authorname: "Jon Westenberg",
        tag: "Life Learning",
        time: "16 hr ago!!!!!",
        image: "https://cdn-images-1.medium.com/fit/t/800/240/1*TuuANmxjJpzKrzdfbNlm_A.jpeg",
        title: "我的博客实践之路!!!!",
        summary: "这是一段测试摘要，很多时候我也想拥有自己的博客，这不，我自己做出来了，下面是我自己搭建网站时记录的一些实践总结"
      }
    ]
    // const Items = this.props.ContentItems;
    var Items = s.map((item) => {
      return (
        <div className={style.container} key={item.id}>
          <div className={style.profile}>
            <img className={style.avatar} src={item.avatar}></img>
            <div className={style.author}>
              <div className={style.name}>
                <span className={style.authorname}>{item.authorname}</span>
                <span className={style. in}> in </span>
                <span className={style.tag}>{item.tag}</span>
                <br></br>
                <span className={style.time}>{item.time}</span>
              </div>
            </div>
          </div>
          <img className={style.image} src={item.image}></img>
          <div className={style.title}>
            {item.title}
          </div>
          <div className={style.summary}>
            {item.summary}
          </div>
        </div>
      )
    })
    return (
      <div>
        {Items}
      </div>
    )
  }
}

export default ContentListView
