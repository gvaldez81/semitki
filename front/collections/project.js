'use strict'

let Projects = Backbone.Collection.extend({

  model: Project,
  url: "//127.0.0.1:8000/project/",

});