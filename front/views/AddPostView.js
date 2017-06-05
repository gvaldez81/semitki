'use strict';

let AddPostView = Backbone.View.extend({


  tagName: "div",


  className: "container addpost-form",


  events: {
    "click #closeadd": "closeadd",
    "click #schedule-enable": "schedule",
    "click #publish-btn": "schedule",
    "click #publish-enable": "publish",
    "change #imageFile": "imageUpload"
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


  imageUpload: function(event) {
    let fileInput = $("#imageFile");
    let file = fileInput[0].files[0];
    let form = new FormData($("#addpost-form")[0]);
    form.append('image', file);
    $.ajax(S.api("image_upload"),
      {
        type: "POST",
        contentType: "multipart/form-data",
        data: form,
        processData: false,
        headers: S.addAuthorizationHeader().headers,
        error: (jqXHR, textStatus, error) => {
          console.log(jqXHR.responseText);
        },
        success: (data, textStatus, jqHXR) => {
          console.log(jqHXR);
        }
      });
  },


  prepare_post: function(date) {
    let tags = [];
    tags.push({"account": this.data.bucket});
    tags.push({"account_id": this.data.bucket_id});
    tags.push({"like": $("#lkgroups").val()});
    tags.push({"rs": $("#rsgroups").val()});
    let content = {
      txt: $("#postxt").val(),
      link: $("#urlTarget").val(),
      linkType: $("input[name=linkType]:checked").val(),
      tags: tags,
      username: this.data.username
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
      error: (jqXHR, exception) => {
        S.logger("bg-danger", "Couldn't schedule new post", true);
      },
      success: (model, reponse) => {
        this.closeadd();
        S.logger("bg-success", "Post published succesfully", true);
      },
      wait: true,
      headers: S.addAuthorizationHeader().headers
    }
    let post = S.collection.get("posts")
      .create(this.prepare_post(new Date($("#scheduleFor").val())), options);
  },


  publish: function(e) {
    e.preventDefault();
    let options = {
      error: (error) => {
        S.logger("bg-danger", "Couldn't schedule new post", true);
      },

      success: (model, reponse) => {
        let url = S.api("post/" + model.id + "/publish");
        if(this.data.is_staff)
          url += "?staff=1";
        else if(this.data.is_page)
          url += "?page=1";
        $.ajax({
          url: url,
          headers: S.addAuthorizationHeader().headers,
          // TODO method: "POST"
        })
        .done((data) => {
          this.closeadd();
          console.log(data)
          S.logger("bg-success", data, true);
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

    Handlebars.registerHelper('currentDate', function() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
      let retVal = ("0" + d.getDate()).slice(-2)
                + " " + months[d.getMonth()]
                + ", " + d.getFullYear() ;
      return retVal;
    });

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


    let selectplace = "Select group(s)"

    // RS and Like group selects
    let lk = $("#lkgroups").select2({data: S.collection.get("groups")
      .toJSON().map((i) => {
        return  S.collection2select({id: i.id, text: i.name });
      })
      , placeholder : selectplace});
    let rs = $("#rsgroups").select2({data: S.collection.get("groups")
      .toJSON().map((i) => {
        return  S.collection2select({id: i.id, text: i.name });
      })
      , placeholder : selectplace
    });

    if (this.data.bucket=='facebook'){
      lk.empty().trigger('change');
      lk.select2({
          placeholder: "Not available for Facebook Posts"
      });
    }

    //$("#selectpage").selectpicker('render') ;

    return this;
  }
});
