'use strict'

let api_url = "127.0.0.1";
//let api_url = "159.203.134.236";
let api_port = 8000;

/**
 * Initializie Facebook JavaScript SDK 
 */
window.fbAsyncInit = function() {
  FB.init({
          appId      : 'app_id',
          xfbml      : true,
          version    : 'v2.8'
        });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function sameOrigin(url) {
  // test that a given url is a same-origin URL
  // url could be relative or scheme relative or absolute
  let host = document.location.host; // host + port
  let protocol = document.location.protocol;
  let sr_origin = '//' + host;
  let origin = protocol + sr_origin;

  // Allow absolute or scheme relative URLs to same origin
  return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
    (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
    // or any other URL that isn't scheme relative or absolute i.e relative.
    !(/^(\/\/|http:|https:).*/.test(url));
};

function csrfSafeMethod(method) {
// these HTTP methods do not require CSRF protection
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
};

function apiBuilder(resource) {
  // Builds the api url of a given resource
// TODO we need a development flag in the buid
  if(api_port == undefined) {
    return "//" + api_url + "/" + resource + "/";
  } else {
    return "//" + api_url + ":" + api_port + "/" + resource + "/";
  }
};
