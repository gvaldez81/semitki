'use strict'

let GrouppedAccountsView = Backbone.View.extend({
  tagName: "div",
  className: "row",

  initialize: function () {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.related = new ConnectedSortable({
      templateId: "#connected-sortable-template",
      targetId: "#related",
      relatedTable: "#table-related",
      tableId: "table-related"
    });
    this.available = new ConnectedSortable({
      templateId: "#connected-sortable-template",
      targetId: "#available",
      relatedTable: "#table-related",
      tableId: "table-for-related"
    });
    this.navigation.render();
    this.footer.render();
    return this;
  },


  events: {
    "change #group": "filteraccount"
  },


  filteraccount: function() {
    if ($("#group").val() !== "") {
      let options = {
        success: (collection, response, options) => {
          let group = S.collection.get("groups").get($("#group").val());
          S.collection.get("groups").filtering(group);
          let related = {
            items: group.attributes.related
          };
          this.related.data = related;
          this.available.data = S.unrelatedAccounts(related);
          this.related.render();
          this.available.render();

        },
        error: (conllection, response, options) => {
          S.logger("bg-danger", "Couldn't fetch groups from server", true);
        },
        headers: S.addAuthorizationHeader().headers
      };
      S.collection.get("groups").fetch(options);

    } else {
      let data = S.collection.get("accounts").toJSON()
        .map(account => {
           return {
            id: account.id,
            social_account_url: {
              bucket: account.bucket,
              username: account.username
            }
          };
        });
      this.available.data = { items: data };
      this.available.render();
      this.related.data = {};
      this.related.render();
    }
    return this;
  },


  render: function () {

    let data = {
      groups: S.collection.get("groups").toJSON(),
    };

    let template = $("#grouppedaccounts").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#main").html(this.$el);
    this.related.render();
    this.available.render();

    return this;
  },

});
