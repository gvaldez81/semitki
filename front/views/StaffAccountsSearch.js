'use strict'

let StaffAccountsView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    let acts = S.collection.get("user").where({is_superuser: false});

    this.accounts = acts.map((a) => {
      let account = {
        id: a.attributes.id,
        text: a.attributes.username,
        avatar: a.attributes.image_path,
        group: a.attributes.name
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

    $("#staff-menu .account-select").select2({
      placeholder: "Select account",
      data: this.accounts
    });

    return this;
  }

});
