import Ember from 'ember';
import FitToWindowMixin from 'ember-fit-to-window-mixin/mixins/fit-to-window';
import { module, test } from 'qunit';

module('Unit | Mixin | fit to window');

test('component lifecycle', function(assert) {
  let newOuterHeight;
  let attachedResizeHandler = false;
  let detachedResizeHandler = false;

  const component = Ember.Component.extend(FitToWindowMixin).create({
    fixedHeight: 100,

    $(selector) {
      return {
        height() {
          if (selector === window) { return 500; }
        },

        outerHeight(_newOuterHeight) {
          if (selector === undefined) { newOuterHeight = _newOuterHeight; }
        },

        on(event, func) {
          if (event === 'resize') { attachedResizeHandler = func; }
        },

        off(event, func) {
          if (event === 'resize') { detachedResizeHandler = func; }
        },
      };
    },
  });

  assert.strictEqual(
    newOuterHeight, undefined,
    "component's outerHeight not yet set"
  );
  assert.notOk(attachedResizeHandler, "resize handler not yet attached");
  assert.notOk(detachedResizeHandler, "resize handler not yet detached");

  component.didRender();

  assert.strictEqual(
    newOuterHeight, 400,
    "component's outerHeight has been set"
  );
  assert.ok(attachedResizeHandler, "resize handler has been attached");
  assert.notOk(detachedResizeHandler, "resize handler not yet detached");

  component.willDestroy();

  assert.ok(detachedResizeHandler, "resize handler has been detached");
});
