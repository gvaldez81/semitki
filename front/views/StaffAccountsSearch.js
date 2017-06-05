'use strict'

let StaffAccountsView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    let acts = S.collection.get("user").where({is_superuser: false});

    this.accounts = acts.map((a) => {
      let account = {
        id: 'u_'+a.attributes.id,
        text: a.attributes.username,
        avatar: 'img/semitki.png',
        page: '',
        bucket: a.attributes.bucket
      };

      return account;
    });

    let pages = S.collection.get("pages").toJSON();

    this.fbPages = pages.map((p) => {
      let page = {
        id: 'p_'+p.page_id,
        text: p.name,
        avatar: p.image_path,
        page: 'Page',
        bucket: p.bucket
      };

      return page;
    });


    return this;
  },


  render: function() {
    let template = $("#account-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled());
    $("#staff-menu").html(this.$el);

    let templateSelect = function(account) {
      if(!account.id) { return account.text; }
      let $t = $(

        '<span class="sn-pic sn-w40 '+account.bucket+' no-after-check">'
        +'<img src="storage/'+account.avatar+'">'
        +'</span>'
        +'<div class="community-info">'
        +'  <div class="community-name">'+account.text
        +'   <div class="community-post-date">'+account.page+'</div>'
        +'  </div>'
        +'</div>'
      );
      return $t;
    };

    $("#staff-menu .account-select").select2({
      placeholder: "Select account",
      data: this.accounts.concat(this.fbPages),
      templateResult: templateSelect,
      templateSelection: templateSelect
    });

    return this;
  }

});
