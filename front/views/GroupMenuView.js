'use strict'

let GroupMenuView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    let groups = S.collection.get("groups").toJSON();

    this.accounts = groups.map((group) => {
      let account = {
        "group": group.name
      };
      group.related.forEach((a) => {
        account.id = a.social_account_url.id;
        account.text = a.social_account_url.username;
        account.bucket = a.social_account_url.bucket;
        account.image = a.social_account_url.image;
      });

      return account;
    });

    return this;
  },


  render: function() {
    let template = $("#account-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled());
    $("#account-menu").html(this.$el);

    let templateSelect = function(account) {
      if(!account.id) { return account.text; }
      let $t = $(
        '<span><img src="'+account.image+'"></span><span>'+
        account.username+' ['+account.bucket+']</span>'
      );
      return $t;
    };

    let data = [{id: "1", text: "algo"}, {id: "2", text: "mas"}];

    $(".account-select").select2({
      placeholder: "Select account",
      data: data
    });


    $(".account-select").select2({
      templateResult: templateSelect,
      templateSelection: templateSelect,
      debug: true
    });
    return this;
  }

});
