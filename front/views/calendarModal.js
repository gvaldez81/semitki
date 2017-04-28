'use strict'

let CalendarModal = Backbone.View.extend({

  tagName: "div",

  className: "modal-dialog",


  render: function() {
    let template = $("#calendar-modal-template").html();
    let compiled = Handlebars.compile(template);

    this.$el.html(compiled);

    $("#dialog").html(this.$el);

    return this;
  }

});
