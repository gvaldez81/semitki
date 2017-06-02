'use strict'

let GroupMenuView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    let acts = S.collection.get("accounts").toJSON();

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
    $("#account-menu").html(this.$el);

    let templateSelect = function(account) {
      if(!account.id) { return account.text; }
      let $t = $(
        '<span><img src="'+account.image+'"></span><span>'+
        account.username+' ['+account.bucket+']</span>'
      );
      return $t;
    };

    $("#account-menu .account-select").select2({
      placeholder: "Select account",
      data: this.accounts
    });


    $("#account-menu .account-select").select2({
      templateResult: templateSelect,
      templateSelection: templateSelect
    });
    return this;
  }

});
