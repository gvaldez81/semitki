'use strict'

let StaticPages = Backbone.Collection.extend({

  model: StaticPage,

  url: () => {
    return apiBuilder("static_page");
  }
});
