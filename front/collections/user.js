'use strict'

let UserCollection = Backbone.Collection.extend({
  model: UserModel,
  url: "user"
});
