'use strict'

let Organizations = Backbone.Collection.extend({
  model: Organization,
  url: apiBuilder("organization"),
});
