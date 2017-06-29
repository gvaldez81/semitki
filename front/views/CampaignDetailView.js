'use strict'

let CampaignDetailView = Backbone.View.extend({

  tagName: "div",

  className: "row",

  initialize: function() {
    this.navigation = new NavigationView();
    this.footer = new FooterView();

    let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "CampaignDetailView"})

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
  },

  events: {
    "click #save": "create",
    "click #delete": "delete"
  },

  create: () => {

    let data = {
      name: $("#name").val(),
      description: $("#description").val()
    };

    let resource = new Campaign();
    resource.save(data, S.addAuthorizationHeader());
    this.render();
  },


  delete: () => {
    let campaigns = S.collection.get("campaigns");
    let campaign = campaigns.get($("#campaignFinder").val());
    campaigns.sync("delete", campaign, S.addAuthorizationHeader());
  },

  render: function(){
    let data = {
      campaigns: S.collection.get("campaigns").toJSON()
    };
    let template = $("#campaign-template").html();
    let compiled = Handlebars.compile(template);

    this.navigation.render();
    this.footer.render();

    this.$el.html(compiled(data));
    $("#main").html(this.$el);

    $("#campaignFinder").select2();

    if (this.tour != undefined){
         this.tour.start(true)     
    }

    return this;
  }
});
