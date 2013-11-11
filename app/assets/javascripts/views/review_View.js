MovieApp.Views.ReviewView = Backbone.View.extend({
  //This view correspond to the display of single review
  //for a single movie in movie detail view.	
  
  initialize: function(myReview){
    this.model = myReview;
  },

  render: function() {
    var renderString = "<div id='" + this.model.id + "' class = 'Review'><p>";
    renderString += "user: " + this.model.get("user")["username"] + "<br>";
    renderString += "comment: " + this.model.get("comment") + "<br>";
    renderString += "score: " + this.model.get("score") + "<br>";
    renderString += "updated at: "+ this.model.get("updated_at");

    if(this.model.get("user")["username"] == this.getUserName(gon.user_email)) {
      renderString += "<br /><a class='del' id='" + this.model.get("movie_id") + "_" + this.model.id + "' href='javascript: void(0);'>Delete</a>";
 }
      
    
     renderString += "</p></div>";    
    
    //$(this.el).html("<div class='MovieSimple'><p>" + this.model.get("title") + '</p><img src="'+ this.model.get("img_url") +'"></div>');
    $(this.el).html(renderString);
    return this;
  },

  getUserName : function(userEmail) {
    var username = "";

    for(var i=0; i<userEmail.length; i++) {
        if(userEmail[i] == "@")
          return username;
        else 
          username += userEmail[i];        
    }

    return "";
  }
})
