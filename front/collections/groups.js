
'use strict'

let Groups = Backbone.Collection.extend({

  model: Group,
  url: apiBuilder("accounts_group")

});
