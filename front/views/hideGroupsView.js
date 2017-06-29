'use strict'

let hideGroupsView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  initialize: function(data) {
    if (data == undefined){
      this.data = undefined;  
    }else{
      this.data = data;
      //TOUR
      let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "hideGroupsView"})

      if (tourFiltered.length>0){

         this.tour = new Tour({storage:false});
         this.tour.init();
        //sorteamos el arreglo por el Title. Importante a la hora de registrar elementos
        tourFiltered.sort(function(a,b) {
            return (a.title > b.title) 
                    ? 1 : ((b.title > a.title) 
            ? -1 : 0);} );
        
        let data = tourFiltered.map(element => {
              let salida  = {
                element: element.attributes.name,
                title :  element.attributes.title,
                content : element.attributes.content,  
              };
              //TODO Change for JS
              return $.extend(salida, element.attributes.options)
          });
        return this.tour.addSteps(data);
      }
    }

  },


  events: {
    "click #close": "close",
    "click #delete": "hidegroup",
   },

  close: function() {
       $('#dialog-crud').modal('hide')
      },

  hidegroup: function (e){

    e.preventDefault();
    let id = $("#group-id").val();
    let dialog = new hideGroupsView({title: new Array(S.collection.get("groups").get(id).toJSON())});
    //Update
    let model = S.collection.get("groups").get(id);
    model.set({'isactive': false});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't Group Delete", true);

      },

      success: (model, reponse) => {

        S.collection.get("groups").remove(model)
        $('#dialog-crud').modal('hide');       
        let groupView = new GroupsView();
        groupView.render(); 
        S.logger("bg-success", "Delete Group Succesfully", true);

      },

      wait: true,
      headers: S.addAuthorizationHeader().headers,
      url: S.fixUrl(model.url()) 
        
    }

    let group = S.collection.get("groups");
    S.collection.get("groups").add(model)
        .sync("update", model, options);
  },


  render: function(){

    let template = $("#group-modal-hide").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

    if(this.tour != undefined){
        this.tour.start(true);
    }

  },


});
