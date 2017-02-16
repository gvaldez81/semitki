'use strict'

let User = Backbone.Model.extend({
  initialize: () => {
    this.bind("change", this.attributesChanged);
  },
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
