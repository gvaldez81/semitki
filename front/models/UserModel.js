'use strict'

let UserModel = Backbone.Model.extend({

  defaults: () => {
    
    return {

      first_name: undefined,
      last_name: undefined,
      is_superuser: undefined,
      is_staff: undefined,
      is_active: undefined,
      posts: []
    }
  },

  url: function(username){

    return apiBuilder("user") + username
    
  }
});
