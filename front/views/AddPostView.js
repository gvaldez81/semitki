'use strict';

let AddPostView = Backbone.View.extend({

  tagName: "div",

  className: "panel panel-default",

  events: {
    "click #closeadd": "closeadd",
    "click #schedule-enable": "schedule",
    "click #publish-btn": "schedule",
    "click #publish-enable": "publish",
  },


  initialize: function(data) {

    this.data = data || {};
    this.data.campaigns = S.collection.get("campaigns").toJSON().map((i) => {
      return S.collection2select({id: i.id, text: i.name});
    });

    S.toggleNavigation();

    let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "AddPostView"})

    if (tourFiltered.length > 0){

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


  closeadd: function() {
    S.toggleNavigation(true);
    this.scheduler = new SchedulerCreateView();
    this.remove();
  },


  prepare_post: function(date) {
    let tags = [];
    tags.push({"account": this.data.bucket});
    tags.push({"account_id": this.data.bucket_id});
    tags.push({"like": $("#lkgroups").val()});
    tags.push({"rs": $("#rsgroups").val()});
    if(this.data.is_page) {
      tags.push({"is_page": true});
    } else {
      tags.push({"is_page": false});
    }
    if(this.data.is_staff) {
      tags.push({"is_staff": true});
    } else {
      tags.push({"is_staff": false});
    }
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
        S.logger("bg-danger", S.polyglot.t("addpost.schedule_error"));
      },
      success: (model, reponse) => {
        this.closeadd();
        S.logger("bg-success", S.polyglot.t("addpost.schedule_success"));
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
        S.logger("bg-danger", S.polyglot.t("addpost.publish_error"));
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
          S.logger("bg-success", S.polyglot.t("addpost.publish_success"));
        })
        .fail((xhr, status, error) => {
          S.logger("bg-danger", S.polyglot.t("addpost.publish_error"));
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
      let months = poles["calendar.months"];
      let retVal = ("0" + d.getDate()).slice(-2)
                + " " + months[d.getMonth()]
                + ", " + d.getFullYear() ;
      return retVal;
    });

    let template = $("#addpost-template").html();
    let compiled = Handlebars.compile(template);

    this.$el.html(compiled(this.data));

    // Initialize any DOM element after the next line only
    $("#main").html(this.$el);

    // Datetime picker
    $("#schedule-post").datetimepicker({
      disabledDates: [new Date()]
    });

    // Campaigns and phases select
    let c = $("#campaignSelectorBox").select2({data: this.data.campaigns,
      placeholder: S.polyglot.t("addpost.select_campaign")});

    let p = $("#phaseSelectorBox").select2(
      {placeholder: S.polyglot.t("addpost.select_phase")});

    c.on("select2:select", (e) => {
      p.select2({data: S.collection.get("campaigns").get(e.target.value).
        toJSON().phases.map((i) => {
          return S.collection2select({id: i.id, text: i.name});
        })}).prop("disabled", false);
    });

    let selectplace = S.polyglot.t("addpost.select_group");

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
          placeholder: S.polyglot.t("addpost.notforfacebook")
      });
    }

    if (this.tour != undefined){
        this.tour.start(true);
    }

    // Initialize fileinput
    let user_id = S.user.attributes.pk;
    let customHeaders = S.addAuthorizationHeader().headers;
    // TODO check filename handling
    customHeaders['Content-Disposition'] = 'attachment;filename='+S.user.attributes.pk;
    $("#uploadfile").fileinput({
      uploadUrl: '//' + SEMITKI_CONFIG.api_url + ':' + SEMITKI_CONFIG.api_port +
        '/upload/',
      elErrorContainer: "#messages",
      allowedFileTypes: ['image', 'video'],
      allowedFileExtensions: ['jpg', 'jpeg', 'gif', 'png', 'webm', 'avi', 'mp4'],
      ajaxSettings: {
        headers: customHeaders
      }
    });

    $('#uploadfile').on('filepreupload', function(event, data, previewId, index) {
      let extra = data.extra;
      data.extra.file_name = S.user.attributes.pk;
      data.extra.file_type = 'image';
      data.extra.file_extension = 'png';
      console.log(data.extra);
      return data.extra;
    });

    return this;
  }
});
