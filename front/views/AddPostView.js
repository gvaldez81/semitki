'use strict'

let AddPostView = Backbone.View.extend({


  tagName: "div",


  className: "container addpost-form",


  events: {
    "click #closeadd": "closeadd",
    "click #schedule-enable": "schedule",
    "click #publish-btn": "schedule",
    "click #publish-enable": "publish"
  },


  initialize: function(data) {
    this.data = data || {};
    this.data.campaigns = S.collection.get("campaigns").toJSON().map((i) => {
      return S.collection2select({id: i.id, text: i.name});
    });
    S.toggleNavigation();
  },


  closeadd: function() {
    S.toggleNavigation(true);
    this.scheduler = new SchedulerCreateView();
    this.remove();
  },


  prepare_post: function(date) {
    let tags = [];
    tags.push({"account": this.data.bucket});
    tags.push({"account_id": this.data.username});
    tags.push({"like": $("#lkgroups").val()});
    tags.push({"rs": $("#rsgroups").val()});
    let content = {
      txt: $("#postxt").val(),
      img: "http://images2.fanpop.com/image/photos/13700000/Beautiful-Pug-pugs-13728067-1600-1200.jpg",
      tags: tags,
    };

    let post = {
      date: date,
      campaign: $("#campaignSelectorBox").val(),
      phase: $("#phaseSelectorBox").val(),
      content: content,
      owner: S.user.attributes.pk,
      published: false
    };
    let response = new Post(post);
    return response;
  },


  schedule: function(e) {
    e.preventDefault();
    let options = {
      error: (error) => {
        S.logger("bg-danger", "Couldn't schedule new post", true);
      },
      success: (model, reponse) => {
        console.log(model);
        this.closeadd();
        S.logger("bg-success", "Post published succesfully", true);
      },
      wait: true,
      headers: S.addAuthorizationHeader().headers
    }
    let post = S.collection.get("posts")
      .create(this.prepare_post(new Date($("#scheduleFor").val())), options);
    console.log("scheduling");
  },


  publish: function(e) {
    e.preventDefault();
    let options = {
      error: (error) => {
        S.logger("bg-danger", "Couldn't schedule new post", true);
      },
      success: (model, reponse) => {
        let url = S.api("post/" + model.id + "/publish");
        $.ajax({
          url: url,
          headers: S.addAuthorizationHeader().headers,
          //method: "POST"
        })
        .done((data) => {
          this.closeadd();
          S.logger("bg-success", "Post published succesfully", true);
        })
        .fail((xhr, status, error) => {
          S.logger("bg-danger", "Post error"+ xhr.responseText, true);
        });
      },
      wait: true,
      headers: S.addAuthorizationHeader().headers
    };
    let post = S.collection.get("posts")
      .create(this.prepare_post(new Date()), options);

  },


  render: function() {
    let template = $("#addpost-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));

    $("#main").html(this.$el);

    // DAtetime picker
    $("#schedule-post").datetimepicker({
      disabledDates: [
        new Date()
      ]
    });

    // Campaigns and phases select
    let c = $("#campaignSelectorBox").select2({data: this.data.campaigns,
      placeholder: "Select a campaign"});
    let p = $("#phaseSelectorBox").select2({placeholder: "Select a phase"});
    c.on("select2:select", (e) => {
      p.select2({data: S.collection.get("campaigns").get(e.target.value).
        toJSON().phases.map((i) => {
          return S.collection2select({id: i.id, text: i.name});
        })}).prop("disabled", false);
    });

    // RS and Like group selects
    let lk = $("#lkgroups").select2({data: S.collection.get("groups")
      .toJSON().map((i) => {
        return  S.collection2select({id: i.id, text: i.name });
      })
    });
    let rs = $("#rsgroups").select2({data: S.collection.get("groups")
      .toJSON().map((i) => {
        return  S.collection2select({id: i.id, text: i.name });
      })
    });

    return this;
  }
});
