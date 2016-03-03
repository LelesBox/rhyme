import {
  App,
  Article,
  Daily
} from './containers'

const config = [{
  path: '/',
  component: App,
  childRoutes: [{
    path: 'article',
    component: Article
  }, {
    path: 'daily',
    component: Daily
  }]
}]

export default config
