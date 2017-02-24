'use strict'

let Projects = Backbone.Collection.extend({

  model: Project,
  url: apiBuilder("project"),

});
