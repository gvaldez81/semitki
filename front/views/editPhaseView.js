'use strict'

let editPhaseView = Backbone.View.extend({

  tagName: "div",
  className: "modal-dialog",

  initialize: function(data) {
    this.data = data || undefined;
  },

  events: {
    "click #edit": "editphase"
  },

editphase: function (e){

    e.preventDefault();
    let id = $("#edit-id").val();
    let dialog = new editPhaseView({title: new Array(S.collection.get("phases").get(id).toJSON())});
    let model = S.collection.get("phases").get(id);
        model.set({name: $("#input_name").val(),
        description: $("#input_description").val(),
        campaign: $("#campaign").val()});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't Phase Edit", true);

      },

      success: (model, reponse) => {

        $('#dialog-crud').modal('hide');       
        let phaseView = new PhaseView();
        phaseView.render(); 
        S.logger("bg-success", "Edit Phase Succesfully", true);

      },

      wait: true,
      headers: S.addAuthorizationHeader().headers,
      url: S.fixUrl(model.url()) 
        
    }

      let group = S.collection.get("phases");
      S.collection.get("phases").add(model)
          .sync("update", model, options);
  },

  render: function(){

    Handlebars.registerHelper('ifCond', function(v1, v2) {
      if(v1 === v2.campaign) {
        return "selected";
      }
      return null;
    });

    let template = $("#phase-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

  },

});