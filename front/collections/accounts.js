
'use strict'

let Accounts = Backbone.Collection.extend({

  model: Account,
  url: "//127.0.0.1:8000/account/"

});
