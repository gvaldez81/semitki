'use strict'

let About = Backbone.Model.extend({
    
 defaults: () => {
    return{
        "title": undefined,
        "content": undefined,
        "template": undefined,
        "page": undefined
    } 
 },
    
    
url: () => {
    return "/about/" + this.id;
}
    
    
});