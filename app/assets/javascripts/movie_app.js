$(document).ready(function(){

	//classes declaration
	var MovieList = Barebone.Model.extend({
		baseUrl: "http://cs3213.herokuapp.com/movies.json?page=",
		page: 1,
		url: "http://cs3213.herokuapp.com/movies.json?page=1",
		changeUrl: function(i){page = i; this.url=baseUrl+page;}
	});

	var IndexView = Barebone.View.extend({
		setup: function(){
			this.el = "pageBody";
			this.myMovieList = new MovieList();
			this.myMovieList.event.on("change", this.render, this);
			this.myMovieList.fetch();
		},
	
		render: function(){
			this.$el().html("");
			for(var i=0; i<this.myMovieList.attributes.length; i++){
				var renderString = "<a id='" + this.myMovieList.get("id", i) + "' class='MovieSimpleLink' href='javascript: void(0);'><b><u>"+this.myMovieList.get("title", i)+"</u></b></a><br /><br />";
    			renderString += "<a id='" + this.myMovieList.get("id", i) + "' class='MovieSimpleImg' href='javascript: void(0);'><div><img src='" + this.myMovieList.get("img_url", i) +"' /></div></a>";
    			this.$el().append(renderString);
			}
		},
	});

	var EditMovieView = Barebone.View.extend({

		setup: function() {
			console.log("Edit Movie Setup");
			this.render();
			this.registerDomEvents();			
		},

		events: {
			"click #updateMovieBtn" : "updateMovie"
		},		

		updateMovie: function() {
			this.event.trigger("change_page", null, {page: "userMovies"});
		},

		render: function() {
			this.$el().html("");
			var renderString = "<button id='updateMovieBtn'>Update Movie</button>";
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
			this.current_view.setup();
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
			console.log("Edit Movie");
			this.current_view = new EditMovieView();
			this.current_view.setup();
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
