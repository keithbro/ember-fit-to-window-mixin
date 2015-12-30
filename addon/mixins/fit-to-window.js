import Ember from 'ember';

/**
 * Maintains Ember.Component beights so that they fit vertically in the
 * viewport.
 */
export default Ember.Mixin.create({
  /**
   * Sums the heights of the DOM elements that will appear either above or
   * below.
   *
   * @property ignoreHeight
   * @type Integer
   */
  ignoreHeight: Ember.computed(
    function() {
      let ignoreHeight = 0;
      this.$().closest('html').find('.ignore').each((i, el) => {
        ignoreHeight += this.$(el).outerHeight(true);
      });
      return ignoreHeight;
    }
  ),

  /**
   * Sets the outerHeight of the component using this Mixin to be the height
   * of the window, minus the sum of the heights of the surrounding elements.
   *
   * @method setHeight
   */
  setHeight() {
    this.$().outerHeight(this.$(window).height() - this.get('ignoreHeight'));
  },

  /**
   * Called after the component has been rendered. Sets the height to the
   * correct value immediately and also sets up a listener to do so again on
   * window resize.
   *
   * @method didRender
   */
  didRender() {
    this._super();

    this.setHeight();
    this.$(window).on('resize', () => this.setHeight());
  },

  /**
   * Called when the component is about to be destroyed. Cleans up by removing
   * the window resize listener.
   *
   * @method willDestroy
   */
  willDestroy() {
    this._super();

    this.$(window).off('resize', () => this.setHeight());
  },
});
