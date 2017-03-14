'use strict'

let Posts = Backbone.Collection.extend({
  model: Post,
  url: apiBuilder("post")
});
