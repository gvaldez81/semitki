'use strict'

let GroupedSocialAccountsList = Backbone.View.extend({

  tagName: "div",

  className: "form-group",

  render: function() {
    let template = $("#groupedaccounts-list-template").html();
    let compiled = Handlebars.compile(template);
    let data = {
      accounts: Semitki.collection.get("accounts").toJSON()
    };

    this.$el.html(compiled(data));
    $("#grouped-accounts-container").append(this.$el);

    // TODO $("#grouped-select").select2();

    return this;
  }
});
