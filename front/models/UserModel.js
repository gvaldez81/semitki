'use strict'

let UserModel = Backbone.Model.extend({

  defaults: () => {
    
    return {

      email: undefined,
      first_name: undefined,
      last_name: undefined,
      is_superuser: undefined,
      is_staff: undefined,
      is_active: undefined,
      posts: []

    }
  },

  url: function(username){

  if (username === undefined) {
       return apiBuilder("user")
  } else {
       return apiBuilder("user") + username
    }
  },

});