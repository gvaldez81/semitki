'use strict'

let CampaignView = Backbone.View.extend({

  tagName: "div",

  className: "row",

  initialize: function() {

    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.modal_edit = new editCampaignView();
    this.modal_add = new addCampaignView();

    let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "CampaignView"})
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
    this.modal = new editCampaignView();
    this.modal_add = new addCampaignView();
    this.tour = new Tour();
    this.tour.init();
    //let user = S.user
      let data = S.collection.get("tour_element").toArray()
        .map(element => {
           return {
              element: element.attributes.name,
              title :  element.attributes.title,
              content : element.attributes.content,
              opt:{
                options: element.attributes.options
              }
           };
        });
      return this.tour.addSteps(data);
  },


  events: {
    "click #save": "create",
    "click #edit": "edit",
    "click #delete": "delete",
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .btn-add": "addItem"
  },

  addItem: () => {
    let dialog = new addCampaignView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new editCampaignView({
      item: new Array(S.collection.get("campaigns").get(id).toJSON())
    });
    dialog.render();
  },

  hideItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new hideCampaignView({
      item: new Array(S.collection.get("campaigns").get(id).toJSON())
    });
    dialog.render();
  },

  delete: () => {
    let campaigns = S.collection.get("campaigns");
    let campaign = campaigns.get($("#campaignFinder").val());
    campaigns.sync("delete", campaign, S.addAuthorizationHeader());
  },

  render: function(){
    this.modal_edit.render();
    this.modal_add.render();
    let data = {
      campaigns: S.collection.get("campaigns").toJSON()
    };

    let template = $("#campaign-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#container").html(this.$el);
    $("#main").html(this.$el);
    S.showButtons();

    if (this.tour != undefined){
<<<<<<< HEAD
      this.tour.start(true);
=======
         this.tour.start(true);  
>>>>>>> tour
    }

    return this;
  }
});
