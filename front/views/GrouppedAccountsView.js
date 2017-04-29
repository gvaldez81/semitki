'use strict'

let GrouppedAccountsView = Backbone.View.extend({
  tagName: "div",
  className: "row",

  initialize: function () {
    this.navigation = new NavigationView();   
    this.footer = new FooterView();
     this.related = new GrouppedAccountsRelatedView();
    this.navigation.render();
    this.footer.render();
 
  },


  events: {
    "change #group": "filteraccount"
  },


  filteraccount:() =>{
    S.collection.get("groups").filtering($('#group').val())
    let view = new GrouppedAccountsRelatedView();
    view.render();
  },

  render: function () {

    let data = {
      groups: S.collection.get("groups").toJSON(),
    };
    let cuentasfree = []
    S.collection.get("accounts").toJSON().forEach(function (element){
        function findAccount(account){
            return account.id === element.id;
        }
        if (!(S.collection.get("account_groups").toJSON().map(function(cuenta){return cuenta.social_account_url;}).find(findAccount))){
            cuentasfree.push(element);
       }
    });
    data.free = cuentasfree;

    let template = $("#grouppedaccounts").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#main").html(this.$el);
    this.related.render();

    return this;
  }
});
