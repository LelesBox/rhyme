import {
  handleActions
} from 'redux-actions'

const initialState = {
  selectSummary: false,
  selectArticle: false,
  selectDaily: false,
  selectFavorite: false,
}

export default handleActions({
  'init navi' (state, action) {
    console.log(Object.assign({}, initialState, {
      selectSummary: true
    }))
    return Object.assign({}, initialState, {
      selectSummary: true
    })
  },
  'click navi summary' (state, action) {
    return Object.assign({}, initialState, {
      selectSummary: true
    })
  },
  'click navi article' (state, action) {
    return Object.assign({}, initialState, {
      selectArticle: true
    })
  },
  'click navi daily' (state, action) {
    return Object.assign({}, initialState, {
      selectDaily: true
    })
  },
  'click navi favorite' (state, action) {
    return Object.assign({}, initialState, {
      selectFavorite: true
    })
  }
}, initialState)
