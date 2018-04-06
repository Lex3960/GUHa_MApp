import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | responder-encuesta', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:responder-encuesta');
    assert.ok(route);
  });
});
