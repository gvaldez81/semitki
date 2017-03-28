'use strict'

let ProjectView = Backbone.View.extend({
    tagName: "div",
    className: "row",

  events: {
    "click #save": "create",
    "click #delete": "delete"
  },

  create: () => {

    let data = {
      name: $("#name").val(),
      description: $("#description").val()
    };

    let resource = new Project();
    resource.save(data, Semitki.addAuthorizationHeader());
  },

  delete: () => {
    //TODO imlpemnt it
    console.log("delete");
  },

  render: function(){
    let template = $("#project-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
  }
});
