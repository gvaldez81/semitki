'use strict'

let editUserView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  events: {
    "submit form": "onSubmit"
  },


  initialize: function(data) {
    this.data = data || undefined;
  },


  render: function(){
    let template = $("#user-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
