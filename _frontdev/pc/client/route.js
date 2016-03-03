import {
  App,
  Article,
  Daily
} from './containers'

const config = [{
  path: '/',
  component: App,
  indexRoute: {
    component: Article
  },
  childRoutes: [{
    path: 'article',
    component: Article
  }, {
    path: 'daily',
    component: Daily
  }]
}]

export default config
