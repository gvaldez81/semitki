'use strict'

let hideCampaignView = Backbone.View.extend({
  tagName: "div",

  className: "modal-dialog",

initialize: function(data) {
    this.data = data || undefined;
  },

  events: {
    "click #close": "close",
    "click #delete":  "hideCampaign"
  },

  close: function() {

    $('#dialog-crud').modal('hide')

  },

  hideCampaign: function (e){

    e.preventDefault();
    let id = $("#campaign-id").val();
    let dialog = new hideCampaignView({title: new Array(S.collection.get("campaigns").get(id).toJSON())});
    //Update
    let model = S.collection.get("campaigns").get(id);
    model.set({'isactive': false});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't Campaign Delete", true);

      },

      success: (model, reponse) => {

        S.collection.get("campaigns").remove(model)
        $('#dialog-crud').modal('hide');       
        let campaignView = new CampaignView();
        campaignView.render(); 
        S.logger("bg-success", "Delete Campaign Succesfully", true);

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers,
        url: S.fixUrl(model.url()) 
        
    }

        let campaign = S.collection.get("campaigns");
        S.collection.get("campaigns").add(model)
            .sync("update", model, options);
  },

  render: function(){
    let template = $("#campaign-modal-hide").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },

});