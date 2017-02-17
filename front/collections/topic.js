'use strict'

let Topics = Backbone.Collection.extend({

  model: Topic,
  url: "//127.0.0.1:8000/topic/"

});
