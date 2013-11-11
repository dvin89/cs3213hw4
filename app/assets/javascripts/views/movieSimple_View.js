MovieApp.Views.MovieSimpleView = Backbone.View.extend({
  //This view correspond to the display of single movie
  //in the tiled movie list	
  
  initialize: function(myMovie){
    this.model = myMovie;
  },

  render: function() {
    var renderString = "<a id='" + this.model.get("id") + "' class='MovieSimpleLink' href='javascript: void(0);'><b><u>"+this.model.get("title")+"</u></b></a><br /><br />";
    renderString += "<a id='" + this.model.get("id") + "' class='MovieSimpleImg' href='javascript: void(0);'><div><img src='" + this.model.get("img_url") +"' /></div></a>";
    $(this.el).html(renderString);
    return this;
  },

})
