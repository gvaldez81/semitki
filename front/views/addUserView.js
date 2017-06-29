'use strict'

let addUserView = Backbone.View.extend({
  tagName: "div",

  className: "modal-dialog",

    initialize: function(data) {

      let tourFiltered = S.collection.get("tour_element").filter(
        function(obj){ return obj.attributes.view == "addUserView"})
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

  events: {
    "click #save": "saveuser"
  },

  saveuser: function(e) {

  if ($("#input_confpass").val() === $("#input_password").val()){

    e.preventDefault();
    let options = {

      error: (error) => {

        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't User Save", true);

      },


      success: (model, reponse) => {

        console.log(model);
        $('#dialog-crud').modal('hide');
        let userView = new UserView();
        userView.render();
        S.logger("bg-success", "Save User Succesfully", true);

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers,
    }

    let group = S.collection.get("user")
        .create(this.adduser(), options);
        console.log("User");

      }else{

        S.logger("bg-danger", "Passwords do not match.", true);

      }

   },

  adduser:() =>{

    let user = {

      first_name: $("#input_fname").val(),
      last_name: $("#input_lname").val(),
      email: $("#input_email").val(),
      username: $("#input_username").val(),
      password: $("#input_password").val(),
      is_active: true

    };

    let users = new UserModel(user);
    return users;

  },


  render: function(){

    
    let template = $("#user-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

    if(this.tour != undefined){
        this.tour.start(true);
    }
  },

});
