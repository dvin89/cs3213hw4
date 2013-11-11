MovieApp.Views.UserMoviesView = Backbone.View.extend({
	el: '#pageBody',	

	initialize : function(userMovies) {
		this.collection = userMovies;
		this.render();			
	},

	render : function() {
		var current = this;
		var movieRenderString = "<table cellpadding='10'>";
		var count = 0;

		this.collection.each(function(movieModel) {
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
			
		});

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