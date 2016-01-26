/**
 * Created by blake on 1/18/16.
 */
module.exports = {
  index: function*() {
    var users = [{name: 'Dead Horse'}, {name: 'Jack'}, {name: 'Tom'}]
      yield this.render('content', {
      users: users
    });
  },
  build: function*() {
    yield this.render('build/index', {});
  },
  release: function*() {
    yield this.render('release');
  }
}