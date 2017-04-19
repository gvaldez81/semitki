'use strict'

let CampaignDetailView = Backbone.View.extend({
    tagName: "div",
    className: "row",

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
    this.$el.html(compiled(data));
    $("#container").html(this.$el);

    $("#campaignFinder").select2();

    return this;
  }
});
