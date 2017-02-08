'use strict'

let User = Backbone.Model.extend({
  defaults: () => {
    return {
      id: 1,
      username: "root",
      first_name: "Admin",
      last_name: "Admin",
      is_superuser: true,
      is_staff: true,
      is_active: true
    }
  }
});
