//class declarations
var UserMovies = Barebone.Model.extend({
	this.userMovies : Array(), 

	//takes in MovieList found in movie.app.js
	initialize : function() {
		this.myMovieList = new MovieList();
		this.myMovieList.event.on("change", this.render, this);
		this.myMovieList.fetch();

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

	setup : function(options) {
		this.event = options.event;
		var userMovies = new UserMovies();
		userMovies.initialize();
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

	events: {
		"click #updateMovieBtn" : "updateMovie"
	},		

	updateMovie: function() {
		this.event.trigger("change_page", null, {page: "userMovies"});
	},

	events : {
		"click #editMovie" : "editMovie",
		"click #deleteMovie" : "deleteMovie",
	},

	editMovie : function() {		
		this.event.trigger("change_page", null, {page: "editMovie"});
	},

	deleteMovie : function() {	
		var userResponse = confirm("Are you sure you want to delete this movie?");	

		if(userResponse)	
			this.event.trigger("change_page", null, {page: "userMovies"});
		else 
			return;
	},

});

//code here
var userMovieView = new UserMoviesView();
userMoviesView.setup(event: this.event);