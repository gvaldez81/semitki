'use strict'
/* global Backbone */
/* global S */
/* global NavigationView */
/* global FooterView */
/* global AccountGroup */
/* global apiBuilder */
/* exported GrouppedAccountsRelatedView */


let GrouppedAccountsRelatedView = Backbone.View.extend({
  tagName: "div",
  className: "row",

  initialize: function () {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
  },


  render: function () {
    let data = {
      groups: S.collection.get("groups").toJSON()
    };
    if (S.collection.get("related") !== undefined) {
      data.groupped = S.collection.get("related").toJSON();
      data.groupname = S.collection.get("related").toJSON()[0].name;
    }

    Handlebars.registerHelper('lookup2', function (collection, id) {
      let collectionLength = collection.length;

      for (let i = 0; i < collectionLength; i++) {
        if (collection[i].id === id) {
          return collection[i];
        }

      }

      return null;
    });

    let template = $("#grouppedaccounts-related").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
     $("#related").html(this.$el);

    // It doen't fully apply here, even if it works I believe
    // http://stackoverflow.com/questions/22437946/drag-and-drop-of-table-rows-between-two-similar-table-in-jquery-with-draggable-a#22438459
    let $tabs = $('#table-related');
    $("tbody.connectedSortable")
        .sortable({
            connectWith: ".connectedSortable",
            items: "> tr:not(:first)",
            appendTo: $tabs,
            helper: "clone",
            zIndex: 999990,
            stop: (event, ui) => {
              let group_id = $("#group").val();
              let account_id = ui.item.context.id;
              let account2group = new AccountGroup({
                social_account: "http:" + apiBuilder("account") + account_id + "/",
                social_account_url: "http:" + apiBuilder("account") + account_id + "/",
                social_group: "http:" + apiBuilder("group") + group_id + "/",
                social_group_url: "http:" + apiBuilder("group") + group_id + "/",
                isactive: true
              });
              let options = {
                error: (error) => {
                  S.logger("bg-danger", "Error saving account to group", true);
                },
                success: (model, response) => {
                  S.logger("bg-success", "Account realted to group", true);
                },
                wait: true,
                headers: S.addAuthorizationHeader().headers
              };
              S.collection.get("account_groups").create(account2group,
                options);
            }
        })
        .disableSelection();

    return this;

  }
});
