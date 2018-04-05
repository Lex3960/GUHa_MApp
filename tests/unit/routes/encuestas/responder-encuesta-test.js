import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | encuestas/responder-encuesta', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:encuestas/responder-encuesta');
    assert.ok(route);
  });
});
