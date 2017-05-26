'use strict'

let ConnectedSortable = Backbone.View.extend({

  tagName: "table",

  className: "table table-striped table-bordered table-list",

  initialize: function(options) {
    _.extend(this, _.pick(options, "templateId", "targetId", "relatedTable",
    "tableId", "data"));
  },


  render: function() {

    let template = $(this.templateId).html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data)).attr("id", this.tableId);
    $(this.targetId).html(this.$el);

    let $tabs = $(this.relatedTable);
    $("tbody.connectedSortable")
       .sortable({
           connectWith: ".connectedSortable",
           items: "> tr:not(:first)",
           appendTo: $tabs,
           helper: "clone",
           zIndex: 999990,
        stop: (event, ui) => {
          console.log(ui);

          /*
          *                   Basado en el parentElement del target
          *                                     se define una bandera para en caso de success:
          *                                                       table-related = Tabla que lista las cuentas ligadas al grupo
          *                                                                         table-for-related = Tabla que lista las cuentas sin ligar al grupo
          *                                                                                         */
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
                 //                       // que hay que hacer con ls collections?
                 //                                             S.collection.get("account_groups").remove(model);
                 S.collection.get("related").remove(model);
              } else {
                 // Si salio de cuentas libres hacia cuentas ligadas
                 // que hay que hacer con ls collections?
                 S.collection.get("related").add(model);
              }
              S.logger("bg-success", "Account related to group", true);
            },

            wait: true,

            headers: S.addAuthorizationHeader().headers,

          };

          if (desligar) {
            //Si el elemento viene de cuentas ligadas el account_group se desactiva
            let id = ui.item.context.id
            let model = S.collection.get("account_groups").get(id);
            model.set({'isactive': false});
            //Aplicamos FIX al URL
            options.url=S.fixUrl(model.url())
            S.collection.get("account_groups").add(model).sync("update", model, options);
          } else {
            //Si el elemento viene de cuentas libres se crea un nuevo account_group
            account2group = new AccountGroup({
              'social_account': "http:" + apiBuilder("account") + account_id + "/",
              'social_group': "http:" + apiBuilder("group") + group_id + "/",
              'isactive' : isactive
            });
            S.collection.get("account_groups").create(account2group,options);

          }
         }
       }).disableSelection();
  }
});
