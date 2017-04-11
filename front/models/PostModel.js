'use strict'

let Post = Backbone.Model.extend({

  defaults: () => {
    return {
    "date": new Date(),
    "phase": undefined,
    "content": {},
    "owner": 1
    }
  },

  url: () => {
    return apiBuilder("post");
  }
});
