'use strict'

let hidePhaseView = Backbone.View.extend({
  tagName: "div",

  className: "modal-dialog",

  initialize: function(data) {
    this.data = data || undefined;
  },

 events: {
    "click #close": "close",
    "click #delete":  "hidephases"
  },

  close: function() {

    $('#dialog-crud').modal('hide')

  },

  hidephases: function (e){

    e.preventDefault();
    let id = $("#phase-id").val();
    let dialog = new hidePhaseView({title: new Array(S.collection.get("phases").get(id).toJSON())});
    //Update
    let model = S.collection.get("phases").get(id);
    model.set({'isactive': false});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't Phase Delete", true);

      },

      success: (model, reponse) => {

        S.collection.get("phases").remove(model)
        $('#dialog-crud').modal('hide');       
        let phaseView = new PhaseView();
        phaseView.render(); 
        S.logger("bg-success", "Delete Phase Succesfully", true);

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers,
        url: S.fixUrl(model.url()) 
        
    }

        let campaign = S.collection.get("phases");
        S.collection.get("phases").add(model)
            .sync("update", model, options);

  },

  render: function(){
    
    let template = $("#phase-modal-hide").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

  },

});