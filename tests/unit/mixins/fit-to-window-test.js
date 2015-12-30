import Ember from 'ember';
import FitToWindowMixin from '../../../mixins/fit-to-window';
import { module, test } from 'qunit';

module('Unit | Mixin | fit to window');

// Replace this with your real tests.
test('it works', function(assert) {
  let FitToWindowObject = Ember.Object.extend(FitToWindowMixin);
  let subject = FitToWindowObject.create();
  assert.ok(subject);
});
