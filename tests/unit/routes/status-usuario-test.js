import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | status-usuario', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:status-usuario');
    assert.ok(route);
  });
});
