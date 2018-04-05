import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | solicitudes/nueva-solicitud', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:solicitudes/nueva-solicitud');
    assert.ok(route);
  });
});
