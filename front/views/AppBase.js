'use strict';

let AppBaseView = Backbone.View.extend({

  tagName: 'div',

  className: 'container',

  initialize: function() {
    console.log('base init');
  },

  render: function() {
    let compiled = S.handlebarsCompile('#base-template');
    this.$el.html(compiled);
    $('body').html(this.$el);
    return this;
  }
});
