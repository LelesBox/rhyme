import {
  handleActions
} from 'redux-actions'

const initialState = {
  showSlideComponent: false,
  showSlideIconColor: "#fff",
  showSearch: false,
  showSearchIconColor: "#fff",
  showFav: false,
  showFavIconColor: "#fff",
  showArticle: false,
  showArticleIconColor: "#fff",
  showMydemo: false,
  showMydemoIconColor: "#fff",
  showProfile: false,
  showProfileIconColor: "#fff"
}

export default handleActions({
  'expand menubar' (state, action) {
    return Object.assign({}, initialState, {
      showSlideComponent: true,
      showSlideIconColor: "#ccc"
    })
  },
  'init menubar' (state, action) {
    return initialState
  },
  'click search' (state, action) {
    return Object.assign({}, initialState, {
      showSearch: !state.showSearch,
      showSearchIconColor: !state.showSearch ? "#ccc" : "#fff"
    })
  },
  'click fav' (state, action) {
    return Object.assign({}, initialState, {
      showFav: !state.showFav,
      showFavIconColor: !state.showFav ? "#ccc" : "#fff"
    })
  },
  'click article' (state, action) {
    return Object.assign({}, initialState, {
      showArticle: !state.showArticle,
      showArticleIconColor: !state.showArticle ? "#ccc" : "#fff"
    })
  },
  'click demo' (state, action) {
    return Object.assign({}, initialState, {
      showMydemo: !state.showMydemo,
      showMydemoIconColor: !state.showMydemo ? "#ccc" : "#fff"
    })
  },
  'click profile' (state, action) {
    return Object.assign({}, initialState, {
      showProfile: !state.showProfile,
      showProfileIconColor: !state.showProfile ? "#ccc" : "#fff"
    })
  }
}, initialState)
