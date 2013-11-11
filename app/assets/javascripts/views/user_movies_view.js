//class declarations
var UserMovies = Barebone.Model.extend({
	var userMovies : Array(), 

	//takes in MovieList found in movie.app.js
	initialize : function(myMovieList)	{
		var username = this.getUserName(gon.user_email);

		for (var i=0; i<myMovieList.length; i++) {
			var movieModel = new Barebone.Model(myMovieList[i].get("user"));
			if(movieModel.get("username") == username)
				userMovies.push(myMovieList[i]);
		};
	},
});

var UserMoviesView = Barebone.View.extend({
	el: '#pageBody',	

	initialize : function(userMovies) {
		this.myMovies = userMovies;
		this.render();
	},

	render : function() {
		var current = this;
		var movieRenderString = "<table cellpadding='10'>";
		var count = 0;

		for (var i=0; i<this.myMovies.userMovies.length; i++) {
			var movieModel = this.myMovies.userMovies[i];			
			var userMovieView = new MovieApp.Views.UserMovieView(movieModel);

			if(count == 0)
				movieRenderString += "<tr>";
			
			if(count < 4) {
				movieRenderString += "<td width=25% style='vertical-align:top;'>" + userMovieView.render().$el.html() + "</td>";
				count++;	
			}				

			if(count == 4) {
				count = 0;
				movieRenderString += "</tr>";
			} 
			
		};

		movieRenderString += "</table>";
		movieRenderString += "<label id='hiddenVal' style='visibility: hidden;'></label>";

		var myNavBarView = new MovieApp.Views.NavBarView();
		$(this.el).html(myNavBarView.render().el);
		
		$(current.el).append(movieRenderString);

		return this;
	},	

	events : {
		"click #editMovie" : "editMovie",
		"click #deleteMovie" : "deleteMovie",
	},

	editMovie : function() {		
		window.router.navigate("editMovie/" + document.getElementById('hiddenVal').innerHTML, {trigger : true});
	},

	deleteMovie : function() {	
		var userResponse = confirm("Are you sure you want to delete this movie?");	

		if(userResponse)	
			window.router.navigate("deleteMovie/" + document.getElementById('hiddenVal').innerHTML, {trigger : true});
		else 
			return;
	},

});

//code here
var userMovies = new UserMovies();
var myMovieList = myIndexView.myMovieList; //myIndexView from movie_app.js
userMovies.initialize(myMovieList);

var userMovieView = new UserMoviesView();
userMoviesView.initialize(userMovies);