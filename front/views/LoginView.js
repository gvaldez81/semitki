'use strict'

let getUser = (jwtoken) => {
  console.log(Semitki.jwtheader + jwtoken);
    $.ajax('http://127.0.0.1:8000/user/' + this.username,
      {
        beforeSend: (xhr, settings) => {
          xhr.setRequestHeader(Semitki.jwtheader + jwtoken);
        },
      }).fail((error) => {
        console.log(error.statusText);
      }).done((data) => {
        console.log(data);
      });
    //Semitki.router.navigate("dashboard", {trigger: true});
  };
let LoginView = Backbone.View.extend({
  tagName: "div",
  className: "panel panel-info",
  events: {
    "click #login-button": "tryLogin"
  },
  tryLogin: () => {
    let $form = $('#login-form');
    this.username = $form.find("input[name='username']").val();
    this.password = $form.find("input[name='password']").val();
    //this.model.bind("validated", this.validated) TODO code validated
    let url = $form.attr("action");
    let csrftoken = Cookies.get("csrftoken");
    $.ajax(url,
       {
         beforeSend: (xhr, settings) => {
          if (!csrfSafeMethod(settings.type)
            && sameOrigin(settings.url)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
        },
        data: {
          username: this.username,
          password: this.password
        },
        method: "POST",
        dataType: "JSON"
      }).done((data) => {
        Semitki.jwtoken = data.token;
      //  getUser(Semitki.jwtoken);
     });
  },

  render: function() {
    let template = $("#login-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
  }
});

