import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | ver-solicitud', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:ver-solicitud');
    assert.ok(route);
  });
});
