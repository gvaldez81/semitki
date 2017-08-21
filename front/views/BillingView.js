'use strict'

let BillingView = Backbone.View.extend({
  tagName:"div",
  className:"row",

  initialize: function () {
    this.template = S.handlebarsCompile("#resource-template");
    this.tour = S.tour('BillingView');
  },

  render: function() {
    let data = {
      title: S.polyglot.t('billing.title'),
      items: S.collection.get("billing").toJSON() //.where({is_superuser: false})
    };

    this.$el.html(this.template(data));
    $("#main").html(this.$el);

    S.showButtons();

    if (this.tour != undefined){
          this.tour.start(true);
    }

    return this;
  }
});
