'use strict'

let SocialAccountsList = Backbone.View.extend({

  tagName: "div",

  className: "form-group",

  render: function() {
    let template = $("#accounts-list-template").html();
    let compiled = Handlebars.compile(template);
    let data = {
      accounts: S.collection.get("accounts").toJSON()
    };

    this.$el.html(compiled(data));
    $("#accounts-list-container").append(this.$el);

    // TODO FIX slect2 not rendering data $("#accounts-select").select2();

    return this;
  }
});
