'use strict'

let AccountGroup = Backbone.Model.extend({


  defaults: function() {
    return {
      "isactive": true
    };
  },

  url: function() {
    return apiBuilder("account_group");
  }

});
