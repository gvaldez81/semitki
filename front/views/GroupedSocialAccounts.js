'use strict'

let GroupedAccountsView = Backbone.View.extend({

  tagName: "div",

  className: "row",

  render: function() {

    let data = {
      "groups": Semitki.collection.get("groups").toJSON()
    }
    let template = $("#grouped-accounts-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#container").html(this.$el);

    // Render ungruped accounts list
    let account_list = new SocialAccountsList();
    account_list.render();
    // Render grouped accounts
    let grouped_accounts = new GroupedSocialAccountsList();
    grouped_accounts.render();

    $("#groupFinder").select2();

    return this;
  }

});
