'use strict'

let UserModel = Backbone.Model.extend({
  defaults: () => {
    return {
      id: undefined,
      username: undefined,
      first_name: undefined,
      last_name: undefined,
      is_superuser: undefined,
      is_staff: undefined,
      is_active: undefined
    }
  },    
  attributesChanged: () => {
    console.log("hello world");
  }
});
