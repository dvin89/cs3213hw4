MovieApp.Collections.ReviewCollection = Backbone.Collection.extend({
  url: function(){
    return this.instanceUrl;
  },
  
  initialize: function(id){
    this.instanceUrl = "http://cs3213.herokuapp.com/movies/" + id["id"] + "/reviews.json";
  } 
});
