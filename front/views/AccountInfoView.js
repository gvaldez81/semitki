'use strict'

let AccountInfoView = Backbone.View.extend({
    tagName:"div",
    className:"row",

/*    initialize: () =>{
        Semitki.users.fetch(Semitki.addAuthorizationHead());
    },*/
    
    
    events: {
    
    "click #save": "save"
},
    
    save: () => {
        
        let data = {
            username: $("#name").val()
            
        };
        alert("fuck");
    },
    
  render: function() {
    let template = $("#accountinfo").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
}
});