'use strict'

let api_url = "127.0.0.1";
let api_port = 8000;

function sameOrigin(url) {
  // test that a given url is a same-origin URL
  // url could be relative or scheme relative or absolute
  var host = document.location.host; // host + port
  var protocol = document.location.protocol;
  var sr_origin = '//' + host;
  var origin = protocol + sr_origin;

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
  if(api_port == undefined) {
    return "//" + api_url + "/" + resource + "/";
  } else {
    return "//" + api_url + ":" + api_port + "/" + resource + "/";
  }
};
