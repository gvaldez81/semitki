'use strict'

let Users = Backbone.Collection.extend({
  model: UserModel,
  url: apiBuilder("user")
});
