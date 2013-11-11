$(document).ready(function(){

	//classes declaration
	var MovieList = Barebone.Model.extend({
		baseUrl: "http://cs3213.herokuapp.com/movies.json?page=",
		page: 1,
		url: "http://cs3213.herokuapp.com/movies.json?page=1",
		changeUrl: function(i){page = i; this.url=baseUrl+page;}
	});

	var IndexView = Barebone.View.extend({
		setup: function(options){
			this.event = options.event;
			this.el = "pageBody";
			this.myMovieList = new MovieList();
			this.myMovieList.event.on("change", this.render, this);
			this.myMovieList.fetch();
		},
	
		render: function(){			
			for(var i=0; i<this.myMovieList.attributes.length; i++){
				var renderString = "<a id='" + this.myMovieList.get("id", i) + "' class='MovieSimpleLink' href='javascript: void(0);'><b><u>"+this.myMovieList.get("title", i)+"</u></b></a><br /><br />";
    			renderString += "<a id='" + this.myMovieList.get("id", i) + "' class='MovieSimpleImg' href='javascript: void(0);'><div><img src='" + this.myMovieList.get("img_url", i) +"' /></div></a>";
    			this.$el().append(renderString);
			}
		},
	});

	var EditMovieView = Barebone.View.extend({

		setup: function(options) {
			this.event = options.event;
			this.el = "pageBody";			
			this.render();
			this.registerDomEvents();			
		},

		events: {
			"click #updateMovieBtn" : "updateMovie",
			"click #cancelUpdateBtn" : "cancelUpdate"
		},		

		updateMovie: function() {
			this.event.trigger("change_page", null, {page: "userMovies"});
		},

		cancelUpdate: function() {
			this.event.trigger("change_page", null, {page: "userMovies"});
		},

		render: function() {
			this.$el().html("");
			var renderString = "<button id='updateMovieBtn'>Update Movie</button>";

			// <div id='movieForm' style='margin-left:10px;'>
			renderString += "<form id='movieForm' name='movie' method='POST'>";
			renderString += "<h1 style='font-weight: bold;'>Edit Movie</h1>";
			renderString += "<table>";			
			renderString += "<tr><td><label style='font-size: large;'><b>Title:</b></label></td></tr>";			
			renderString += "<tr><td><input type='text' name='movie[title]' id='movie_title'></td></tr>";
			renderString += "<tr><td><label style='font-size: large;'><b>Summary:</b></label></td></tr>";
			renderString += "<tr><td><textarea maxlength='255' name='movie[summary]' id='summary' rows='10' cols='100'></textarea></td></tr>";
			renderString += "<tr><td><label style='font-size: large;'><b>Image:</b></label></td></tr>"
			renderString += "<tr><td><input type='file' name='movie[img]' id='movie_img'></td></tr>";
			renderString += "<tr height='20px'><td></td></tr>";
			renderString += "<tr><td>";		
			renderString += "<input type='button' class='btn btn-primary' id='updateMovieBtn' value='Update Movie' />&nbsp;
								<input type='button' class='btn' id='cancelUpdateBtn' value='Cancel' />";
			renderString += "</td></tr></table></form>";
			// </div>
			this.$el().append(renderString);
		},
	});

	var ViewController = Barebone.View.extend({

		setup: function() {
			this.event = new Barebone.Event();
			this.event.on("change_page", this.change_page, this);
			this.showIndex();
		},

		change_page: function(model, options) {
			if(options.page == "index") 
				this.showIndex();
			
			if(options.page == "userMovies")
				this.showUserMovies();

			if(options.page == "createMovies")
				this.showCreateMovies();

			if(options.page == "editMovie")
				this.showEditMovie();

			if(options.page == "movieDetail")
				this.showMovieDetail();

		},

		//Shows the index page
		showIndex: function() {
			this.current_view = new IndexView();
			this.current_view.setup({event: this.event});
		},

		//Shows all User Movies
		showUserMovies: function() {
			console.log("User Movies are shown here");
		},

		//Shows the form to create a new Movie
		showCreateMovies: function() {

		},

		//Show the form to update the Movie
		showEditMovie: function() {			
			this.current_view = new EditMovieView();
			this.current_view.setup({event: this.event});
		},

		//Shows the Movie's details and its reviews
		showMovieDetail: function() {

		},
	});

	//code here
	var myViewController = new ViewController();
	myViewController.setup();
	myViewController.showEditMovie();

});
