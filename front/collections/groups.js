
'use strict'

let Groups = Backbone.Collection.extend({

  model: Group,
  url: apiBuilder("group")

});
