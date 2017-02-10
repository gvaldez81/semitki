'use strict'

let Post = Backbone.Model.extend({
  defaults: () => {
      return {"url": undefined,
      "date": "2017-02-02T21:20:51Z",
              "topic": "Algo",
              "data": {
                            "txt": "le falta un parser para data"
                        },
              "owner": "http://127.0.0.1:8000/user/1/"
  }}
});
