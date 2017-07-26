'use strict'

let StaffMenuView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {

    this.on('ready', this.post_render);
    S.collection.get('user').on('update', this.post_render);
    S.collection.get('pages').on('update', this.post_render);

    return this;
  },


  post_render: function() {
    let acts = S.collection.get("user").where({is_superuser: false});

    let accounts = acts.map((a) => {
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

    let fbPages = pages.map((p) => {
      let page = {
        id: 'p_'+p.page_id,
        text: p.name,
        avatar: 'storage/'+p.image_path,
        page: 'Page',
        bucket: p.bucket
      };

      return page;
    });
    let templateSelect = function(account) {
      if(!account.id) { return account.text; }
      let $t = $(

        '<span class="sn-pic sn-w40 '+account.bucket+' no-after-check">'
        +'<img src="'+account.avatar+'">'
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
      data: accounts.concat(fbPages),
      templateResult: templateSelect,
      templateSelection: templateSelect
    });

  },


  render: function() {
    let template = $("#account-select-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled());
    $("#staff-menu").html(this.$el);

    this.trigger('ready');
    return this;
  }

});
