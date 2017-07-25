'use strict'

let Campaigns = Backbone.Collection.extend({
  model: Campaign,
  url: apiBuilder("campaign"),
});
