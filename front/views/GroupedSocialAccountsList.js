'use strict'

let SocialAccountsList = Backbone.View.extend({

  tagName: "form",

  className: "form-group",

  render: function() {
    let template = $("#accounts-list-template").html();
    let compiled = Handlebars.compile(template);
    let data = {
      accounts: Semitki.collection.get("accounts").toJSON()
    };

    this.$el.append(compiled(data));
    $("#account-list-container").append(this.$el);

    return this;
  }
});
