'use strict'

let GrouppedAccountsView = Backbone.View.extend({
  tagName: "div",
  className: "row",

  initialize: function () {

  let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "GrouppedAccountsView"})

    if (tourFiltered.length>0){

      this.tour = new Tour({storage:false});
      this.tour.init();
      //sorteamos el arreglo por el Title. Importante a la hora de registrar elementos
      tourFiltered.sort(function(a,b) {
          return (a.title > b.title) 
                  ? 1 : ((b.title > a.title) 
          ? -1 : 0);} );
      
      let data = tourFiltered.map(element => {
            let salida  = {
              element: element.attributes.name,
              title :  element.attributes.title,
              content : element.attributes.content,  
            };
            //TODO Change for JS
            return $.extend(salida, element.attributes.options)
        });
      return this.tour.addSteps(data);
    }

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

    if(this.tour != undefined){
        this.tour.start(true);
    }

    return this;
  },

});
