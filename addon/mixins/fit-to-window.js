import Ember from 'ember';

export default Ember.Mixin.create({
  ignoreHeight: Ember.computed(
    function() {
      let ignoreHeight = 0;
      this.$().closest('html').find('.ignore').each((i, el) => {
        ignoreHeight += this.$(el).outerHeight(true);
      });
      return ignoreHeight;
    }
  ),

  setHeight() {
    this.$().outerHeight(this.$(window).height() - this.get('ignoreHeight'));
  },

  didRender() {
    this._super();

    this.setHeight();
    this.$(window).on('resize', () => this.setHeight());
  },

  willDestroy() {
    this._super();

    this.$(window).off('resize', () => this.setHeight());
  },
});
