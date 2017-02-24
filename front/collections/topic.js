'use strict'

let Topics = Backbone.Collection.extend({

  model: Topic,
  url: apiBuilder("topic")

});
