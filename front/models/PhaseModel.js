'use strict'

let Phase = Backbone.Model.extend({
  idAttribute: "id",
  defaults: () => {

    return {
      "name": undefined,
      "description": undefined,
      "isactive": undefined,
      "valid_to": undefined,
    }
  },

url: () => {
    //return "/phase/" + this.id;
    return apiBuilder("post");
  }


});
