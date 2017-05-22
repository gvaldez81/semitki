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
    this.listenTo(this.model, 'sync', this.render);

  },

  render: function () {

    let data = {

      groups: S.collection.get("groups").toJSON()

    };
    if (S.collection.get("related")!== undefined) {

      data.groupped = S.collection.get("related").toJSON()
      data.groupname=S.collection.get("related").toJSON()[0].name

    }

    Handlebars.registerHelper('lookup2', function (collection, id) {
      let collectionLength = collection.length;

      for (var i = 0; i < collectionLength; i++) {

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
                /*
                  Basado en el parentElement del target
                  se define una bandera para en caso de success:
                  table-related = Tabla que lista las cuentas ligadas al grupo
                  table-for-related = Tabla que lista las cuentas sin ligar al grupo
                */
                let desligar = (event.target.parentElement.attributes
                                .getNamedItem('id').nodeValue == 'table-related'
                            ? true : false)
                let group_id = $("#group").val();
                let account_id = ui.item.context.id;
                let isactive = undefined;
                let account2group = undefined;
                let options = {
                  error: (error) => {

                    S.logger("bg-danger", "Error saving account to group", true);

                  },
                  success: (model, response) => {

                    if (desligar){
                      // Si salio de cuentas ligadas hacia cuentas libres
                      // que hay que hacer con ls collections?
                      S.collection.get("account_groups").remove(model);
                      S.collection.get("related").remove(model);
                    }else{
                      // Si salio de cuentas libres hacia cuentas ligadas
                      // que hay que hacer con ls collections?
                      S.collection.get("related").add(model);
                    }
                    S.logger("bg-success", "Account related to group", true);
                  },
                  wait: true,
                  headers: S.addAuthorizationHeader().headers,

                };

                if (desligar){
                  //Si el elemento viene de cuentas ligadas el account_group se desactiva
                  let id = ui.item.context.id
                  let model = S.collection.get("account_groups").get(id);
                  model.set({'isactive': false});
                  //Aplicamos FIX al URL
                  options.url=S.fixUrl(model.url())
                  S.collection.get("account_groups").add(model).sync("update", model, options);
                }else{
                  //Si el elemento viene de cuentas libres se crea un nuevo account_group
                  account2group = new AccountGroup({
                    'social_account': "http:" + apiBuilder("account") + account_id + "/",
                    'social_group': "http:" + apiBuilder("group") + group_id + "/",
                    'isactive' : isactive
                  });
                  S.collection.get("account_groups").create(account2group,options);

                }
              }

        })
        .disableSelection();

    return this;

  }
});
