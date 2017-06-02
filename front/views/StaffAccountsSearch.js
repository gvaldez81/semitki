'use strict'

let StaffAccountsView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    let acts = S.collection.get("user").toJSON();

    this.accounts = acts.map((a) => {
      let account = {
        id: a.id,
        text: a.username,
        avatar: a.image_path,
        group: a.name
      };

      return account;
    });

    return this;
  },


  render: function() {
    let template = $("#account-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled());
    $("#staff-menu").html(this.$el);

    $(".account-select").select2({
      placeholder: "Select account",
      data: this.accounts
    });

    return this;
  }

});
