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
    this.render();
  },

  delete: () => {
    let projects = Semitki.collection.get("projects");
    let project = projects.get($("#projectFinder").val());
    projects.sync("delete", project, Semitki.addAuthorizationHeader());
  },

  render: function(){
    let data = {
      projects: Semitki.collection.get("projects").toJSON()
    };
    let template = $("#project-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#container").html(this.$el);

    $("#projectFinder").select2();

    return this;
  }
});
