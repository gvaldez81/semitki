
'use strict'

let Accounts = Backbone.Collection.extend({

  model: Account,
  url: apiBuilder("account")

});
