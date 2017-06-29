'use strict'

let addGroupsView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  events: {
    "click #save": "saveGroup"
  },


  initialize: function(data) {

    let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "addGroupsView"})
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

    this.data = data || undefined;

  },

  saveGroup: function(e) { 

    e.preventDefault();
    let options = {

      error: (error) => {

        $('#dialog-crud').modal('hide');
        let groupView = new GroupsView();
        groupView.render();          
        S.logger("bg-danger", "Couldn't Group Save", true);

      },

      success: (model, reponse) => {

        console.log(model);
        $('#dialog-crud').modal('hide');       
        let groupView = new GroupsView();
        groupView.render(); 
        S.logger("bg-success", "Save Group Succesfully", true);

      },

      wait: true,
      headers: S.addAuthorizationHeader().headers

    }

    let group = S.collection.get("groups")
        .create(this.addgroup(), options);
        console.log("Group");

  },

  addgroup:() =>{

    let groups = {
      name: $("#input_name").val(),
      description: $("#input_description").val(),
      isactive: true

    };

    let groupModel = new Group(groups); 
    return groupModel;

  },

  render: function(){

    let template = $("#group-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

    if(this.tour != undefined){
        this.tour.start(true);
    }
  },

});