'use strict'

let GroupMenuView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    let acts = S.collection.get("accounts").toJSON();

    this.accounts = acts.map((a) => {
      let groups = '';
      S.collection.get("groups").map(function (group){
      if (group.get('related').length>0){
        group.get('related').forEach(function(account) {
          if (account.social_account_url.id==a.id){
            groups = groups+'['+group.get('name')+']';
          }
        }); 
      }
      });
      let account = {
        id: a.id,
        text: a.username,
        avatar: a.image_path,
        group: groups,
        bucket: a.bucket
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

        '<span class="sn-pic sn-w40 '+account.bucket+' no-after-check">'
        +'<img src="storage/'+account.avatar+'">'
        +'</span>'
        +'<div class="community-info">'
        +'  <div class="community-name">'+account.text
        +'   <div class="community-post-date">'+account.group+'</div>'
        +'  </div>'
        +'</div>'
      );
      return $t;
    };

    $("#account-menu .account-select").select2({
      placeholder: "Select account",
      data: this.accounts,
      templateResult: templateSelect,
      templateSelection: templateSelect
    });


    return this;
  }

});
