'use strict'

let Posts = Backbone.Collection.extend({
  model: "Post",
  url: "//127.0.0.1:8000/post"
});
