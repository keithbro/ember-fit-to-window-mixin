import Ember from 'ember';
import FitToWindowMixin from 'ember-fit-to-window-mixin/mixins/fit-to-window';
import { module, test } from 'qunit';

module('Unit | Mixin | fit to window');

test('component lifecycle', function(assert) {
  let newOuterHeight;
  let eventHandlers = Ember.A();

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

        on(eventName, func) {
          eventHandlers.addObject({ eventName, func });
        },

        off(eventName) {
          const eventHandler = eventHandlers.findBy('eventName', eventName);
          assert.ok(
            eventHandler, `found event handler to detach (${eventName})`
          );
          eventHandlers = eventHandlers.without(eventHandler);
        },
      };
    },
  });

  assert.strictEqual(
    newOuterHeight, undefined,
    "component's outerHeight not yet set"
  );
  assert.deepEqual(eventHandlers, [], 'no event handlers attached yet');

  component.didRender();

  assert.strictEqual(
    newOuterHeight, 400,
    "component's outerHeight has been set"
  );
  assert.strictEqual(
    eventHandlers.length, 1, 'one event handler was attached'
  );
  assert.ok(
    eventHandlers[0].eventName.match(/^resize\.ember\d+$/),
    'a namespaced resize handler was attached'
  );

  component.willDestroyElement();
  assert.strictEqual(
    eventHandlers.length, 0, 'the resize event handler was detached'
  );
});
