'use strict'

let GroupMenuView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    let acts = S.collection.get("accounts").toJSON();

    let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "GroupMenuView"})
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

    this.accounts = acts.map((a) => {
      let groups = '';
      S.collection.get("groups").map(function (group){
      if (group.get('related').length>0){
        group.get('related').forEach(function(account) {
          if (account.social_account_url.id==a.id){
            groups = groups+'['+group.get('name')+']';
          }
        }); 
      }
      });
      let account = {
        id: a.id,
        text: a.username,
        avatar: a.image_path,
        group: groups,
        bucket: a.bucket
      };

      return account;
    });

    return this;
  },

  render: function() {
    let template = $("#account-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled());
    $("#account-menu").html(this.$el);

    let templateSelect = function(account) {
      if(!account.id) { return account.text; }
      let $t = $(

        '<span class="sn-pic sn-w40 '+account.bucket+' no-after-check">'
        +'<img src="storage/'+account.avatar+'">'
        +'</span>'
        +'<div class="community-info">'
        +'  <div class="community-name">'+account.text
        +'   <div class="community-post-date">'+account.group+'</div>'
        +'  </div>'
        +'</div>'
      );
      return $t;
    };

    $("#account-menu .account-select").select2({
      placeholder: "Select account",
      data: this.accounts,
      templateResult: templateSelect,
      templateSelection: templateSelect
    });

      if(this.tour != undefined){
        this.tour.start(true);
      }

    return this;
  }

});
