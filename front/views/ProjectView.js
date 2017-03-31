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
    resource.save(data, S.addAuthorizationHeader());
    this.render();
  },

  delete: () => {
    let projects = S.collection.get("projects");
    let project = projects.get($("#projectFinder").val());
    projects.sync("delete", project, S.addAuthorizationHeader());
  },

  render: function(){
    let data = {
      projects: S.collection.get("projects").toJSON()
    };
    let template = $("#project-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#container").html(this.$el);

    $("#projectFinder").select2();

    return this;
  }
});
