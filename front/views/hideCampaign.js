'use strict'

let hideCampaign = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  events: {
    "submit form": "onSubmit",
    "click .process_button": "doProcess"
  },


  initialize: function(data) {
    this.data = data || undefined;
  },

  render: function(){
    let template = $("#campaign-modal-hide").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-hide").html(this.$el);
  },


});
