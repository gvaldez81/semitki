'use strict'

let editGroupsView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  initialize: function(data) {
    this.data = data || undefined;
  },

  events: {
    "click #edit": "edit"
  },



  edit: (ev) => {

    let id = $("#edit-id").val();
    let dialog = new editGroupsView({title: new Array(S.collection.get("groups").get(id).toJSON())});

    let model = S.collection.get("groups").get(id);
        model.set({name: $("#input_name").val(),
                  description: $("#input_description").val(),});


    S.collection.get("groups").add(model)
      .sync("update", model, {
        url: S.fixUrl(model.url()),
        headers: S.addAuthorizationHeader().headers,
        success: function(model, response) {
         //S.collection.get("groups").fetch(model)
          console.log("EditedGroups")

        },

  });
  },

  render: function(){
    let template = $("#group-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
