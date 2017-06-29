'use strict'

let UserView = Backbone.View.extend({
  tagName:"div",
  className:"row",

  initialize: function () {

   let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "UserView"})

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
     
    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.modal_add = new addUserView();
    this.modal_edit = new editUserView();
    S.users.fetch(S.addAuthorizationHeader());

  },



  events: {

    "click #delete": "delete",
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .btn-add": "addItem"
  },


  save: () => {
    let data = {
      username: $("#username").val(),
      email: $("#email").val(),
      first_name: $("#fname").val(),
      last_name: $("#lname").val()
    };

    let user = new UserModel();
    user.save(data, S.addAuthorizationHeader());

  },

  delete: () => {
    let user = S.users.get($("#userFinder").val());
    S.users.sync("delete", user, S.addAuthorizationHeader());
  },


  addItem: () =>{
    let dialog = new addUserView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new editUserView({item: new Array(S.collection.get("user").get(id).toJSON())});
    dialog.render();
  },

  hideItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new hideUserView({item: new Array(S.collection.get("user").get(id).toJSON())});
    dialog.render();
  },


  render: function() {
    //S.users = new Users();
    // TODO probably better fetching on user demand rather than on the render
    //console.log(S.users.toJSON());
    this.modal_add.render();
    this.modal_edit.render();
    let data = {
      users: S.collection.get("user").toJSON() //.where({is_superuser: false})

    };
    console.log(data);
    let template = $("#user-template").html();
    let compiled = Handlebars.compile(template);

    this.$el.html(compiled(data));
    $("#container").html(this.$el);
    $("#main").html(this.$el);

    S.showButtons();

    if (this.tour != undefined){
          this.tour.start(true);
    }

    return this;
  }
});
