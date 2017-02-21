
'use strict'

let Campaigns = Backbone.Collection.extend({

  model: Campaign,
  url: "//127.0.0.1:8000/campaign/"

});
