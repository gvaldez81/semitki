'use strict'

let FbPageSearch = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    let pages = S.collection.get("pages").toJSON();

    this.fbPages = pages.map((p) => {
      let page = {
        id: p.page_id,
        text: p.name,
        avatar: p.image
      };

      return page;
    });

    return this;
  },


  render: function() {
    let template = $("#account-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled());
    $("#fb-pages-menu").html(this.$el);

    $("#fb-pages-menu .account-select").select2({
      placeholder: "Select page",
      data: this.fbPages
    });

    return this;
  }

});
