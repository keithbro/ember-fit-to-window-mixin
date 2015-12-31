import Ember from 'ember';

/**
 * Maintains Ember.Component beights so that they fit vertically in the
 * viewport.
 */
export default Ember.Mixin.create({
  fixedHeightSelector: '.ignore',

  /**
   * Sums the heights of the DOM elements that will appear either above or
   * below.
   *
   * @property fixedHeight
   * @type Integer
   */
  fixedHeight: Ember.computed(
    function() {
      const selector = this.get('fixedHeightSelector');

      let fixedHeight = 0;
      this.$().closest('html').find(selector).each((i, el) => {
        fixedHeight += this.$(el).outerHeight(true);
      });
      return fixedHeight;
    }
  ),

  /**
   * Sets the outerHeight of the component using this Mixin to be the height
   * of the window, minus the sum of the heights of the surrounding elements.
   *
   * @method setHeight
   */
  setHeight() {
    this.$().outerHeight(this.$(window).height() - this.get('fixedHeight'));
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
