MovieApp.Views.MovieCreateView = Backbone.View.extend({
  //This view correspond to the detailed movie view (with review etc)
  el: '#pageBody',  

  initialize: function(){ 
  },

  events: {
    //create an event "click on Create class" will trigger function "submit_movie_info" 
    "click #Create": "submit_movie_info",
    "click .IndexNav": "go_index",
    "click .MyMoviesNav": "go_my_movie",
    "click .LogoutNav": "go_logout"
  },

  render: function() {
    var myNavBarView = new MovieApp.Views.NavBarView();
    $(this.el).html(myNavBarView.render().el);
    var renderString = "<div style='margin-left: 20px;' id='movieForm'><form name='movie' method='POST'>";
    renderString += "<table><tr>";
    renderString += "<td colspan=2><h1>Create new movie</h1></td></tr>";
    renderString += "<tr><td>Title: </td><td><input type='text' name='movie[title]' id='movie_title'></td></tr>";
    renderString += "<tr><td>Summary: </td><td> <input type='text' name='movie[summary]' id='summary'></td></tr>";
    renderString += "<tr><td>Image: </td><td> <input type='file' name='movie[img]' id='movie_img'></td></tr>";
    renderString += "<tr><td colpsan=2  style='text-align: center;'><button class='btn btn-primary' id='Create' type='button'>Create</button></td></tr></table></form></div>";
    
    $(this.el).append(renderString);    

    return this;
  },

  submit_movie_info: function(e){
    var selector = $(e.target).parent().parent().parent().parent().parent();
  	 selector.ajaxSubmit({
      url:  "http://cs3213.herokuapp.com/movies.json",
      dataType: 'json',
      data: {"access_token": gon.token},
      method: "POST",
      error: function(error, err) {
	      alert("Please log in."); 
      },
      success: function(msg) {
   	    window.router.navigate("movie/" + msg.id, {trigger: true});
      },
      beforeSubmit: function(arr, $form, options) { 
       	if($("#movie_title").val() == "") {
          alert("Please enter movie title");
          return false;
        } 
        else if($("#movie_img").val() == "")
        {
       	 	alert("Please choose image.");
          return false;
        }
        else 
        {
          return true;
        }
  		}
    });
    return false;
  },

  create_new_movie : function() {
    window.router.navigate("create", {trigger: true});
  },

  go_index : function() {
    window.router.navigate("", {trigger: true});
  },
  
  go_my_movie : function() {
    window.router.navigate("myMovies", {trigger: true});
  },

  go_logout : function() {
    window.router.navigate("", {trigger: true});
  }
})
