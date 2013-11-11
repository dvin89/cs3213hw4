$(document).ready(function(){

	//classes declaration

	//Models
	var NewMovie = Barebone.Model.extend({
    url: "http://cs3213.herokuapp.com/movies.json",
  });

	var MovieToEdit = Barebone.Model.extend({
		baseUrl: "http://cs3213.herokuapp.com/movies/",

		initialize: function(id) {
			this.url = baseUrl + id + ".json";
		},
	});

	var UserMovies = Barebone.Model.extend({
		this.userMovies : Array(), 

		//takes in MovieList found in movie.app.js
		//uses MovieList found in movie.app.js
		initialize : function() {
			this.myMovieList = new MovieList();
			this.myMovieList.fetch();

			var username = this.getUserName(gon.user_email);

			for (var i=0; i<myMovieList.length; i++) {
				var movieModel = new Barebone.Model(myMovieList[i].get("user"));
				if(movieModel.get("username") == username)
					userMovies.push(myMovieList[i]);
			};
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
		 },
	});
	
	var MovieList = Barebone.Model.extend({
		baseUrl: "http://cs3213.herokuapp.com/movies.json?page=",
		page: 1,
		url: "http://cs3213.herokuapp.com/movies.json?page=1",
		changeUrl: function(i){page = i; this.url=baseUrl+page;}
	});
	

	//Views
	var CreateMovieView = Barebone.View.extend({
		setup: function(options){
			this.el = "pageBody";
			this.event = option.event;
			this.render();
		},	
		
		render: function(){
			this.$el().html("");
			var renderString = "<div style='margin-left: 20px;' id='movieForm'><form id='createMovieForm' name='movie' method='POST'>";
	    	renderString += "<table><tr>";
	   		renderString += "<td colspan=2><h1>Create new movie</h1></td></tr>";
	    	renderString += "<tr><td>Title: </td><td><input type='text' name='movie[title]' id='movie_title'></td></tr>";
	    	renderString += "<tr><td>Summary: </td><td> <input type='text' name='movie[summary]' id='summary'></td></tr>";
	    	renderString += "<tr><td>Image: </td><td> <input type='file' name='movie[img]' id='movie_img'></td></tr>";
	    	renderString += "<tr><td colpsan=2  style='text-align: center;'><button class='btn btn-primary' id='Create' type='button'>Create</button></td></tr></table></form></div>";
	    
	    	this.$el().append(renderString);
	    	this.registerDomEvents();
		},
		
		events: {
			"click #Create": "create"
		},
		
		create: function(){
			var myNewMovie = new NewMovie();
			myNewMovie.event.on("change", this.hookToMovieDetail, this);
			myNewMovie.save(document.getElementById("createMovieForm"), {"access_token": gon.token});
		},
		
		hookToMovieDetail: function(){
			//this is supposed to be a function to link to a page showing the newly created movie details
			this.event.trigger("change_page", null, {page: "index"});
		}
	
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
			this.$el().html("");
			for(var i=0; i<this.myMovieList.attributes.length; i++){
				var renderString = "<a id='" + this.myMovieList.get("id", i) + "' class='MovieSimpleLink' href='javascript: void(0);'><b><u>"+this.myMovieList.get("title", i)+"</u></b></a><br /><br />";
    			renderString += "<a id='" + this.myMovieList.get("id", i) + "' class='MovieSimpleImg' href='javascript: void(0);'><div><img src='" + this.myMovieList.get("img_url", i) +"' /></div></a>";
    			this.$el().append(renderString);
			}
		},
	});

	var EditMovieView = Barebone.View.extend({
		movieID: "0",
		movieToEdit: {},

		setup: function(options) {
			this.event = options.event;
			this.el = "pageBody";
			this.movieID = options.movieID;	
			this.movieToEdit = new MovieToEdit(this.movieID);		
			this.render();
			this.registerDomEvents();			
		},

		events: {
			"click #updateMovieBtn" : "updateMovie",
			"click #cancelUpdateBtn" : "goToUserMovies"
		},		

		updateMovie: function() {
			this.movieToEdit.event.on("change", this.goToUserMovies, this);
			this.movieToEdit.save(document.getElementById("updateMovieForm"), {"access_token": gon.token});
		},

		goToUserMovies: function() {
			this.event.trigger("change_page", null, {page: "userMovies"});
		},

		render: function() {			
			this.movieToEdit.fetch();

			this.$el().html("");
			var renderString = "<div id='movieForm' style='margin-left:10px;'>";			
			renderString += "<form id='updateMovieForm' name='movie' method='POST'>";
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
			renderString += "</td></tr></table></form></div>";

			this.$el().append(renderString);
			$("#movie_title").val(this.movieToEdit.get('title'));
			$("#summary").val(this.movieToEdit.get('summary'));
		},
	});	
	
	var UserMovieView = Barebone.View.extend({
		model: {};

		initialize: function(movieModel) {
			this.model = movieModel;
		}, 

		render : function() {
		    var avg_score = new Number(this.model.get('avg_score'));
		    var title = this.model.get('title');

		    if(title.length > 30) 
		      title = title.substr(0,30) + " ...";

		    var movieRenderString = "<div><p><b style='font-size:large;'>" + title + "</b></p></div>";
		    movieRenderString += "<div><p><b>Average Score</b>: " +  avg_score.toPrecision(4) + "&nbsp;&nbsp;" + 
		      "<a href='javascript: void(0);'" + 
		      "onclick=document.getElementById('hiddenVal').innerHTML='" +  this.model.get('id') + "'; " +
		      "id='editMovie'><img width='18' height='18' " +
		      "src='http://png-5.findicons.com/files/icons/2443/bunch_of_cool_bluish_icons/512/edit_notes.png'>" +
		      "</img></a><a href='javascript: void(0);' " + 
		      "onclick=document.getElementById('hiddenVal').innerHTML='" +  this.model.get('id') + "'; " + 
		      "id='deleteMovie'><img src='http://www.pdfdu.com/images/del.png' width='18' height='18'></img>" +
		      "</a></p></div>";
		    movieRenderString += "<div><img src='" + this.model.get('img_url') + "'></img></div>";    
		    
		    $(this.el).html(movieRenderString);	

		    return this;
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
				var userMovieView = new UserMovieView(movieModel);

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

			this.registerDomEvents();

			return this;
		},	

		events : {
			"click #editMovie" : "editMovie",
			"click #deleteMovie" : "deleteMovie",
		},

		editMovie : function() {		
			this.event.trigger("change_page", null, {page: "editMovie", id: document.getElementById('hiddenVal').value});
		},

		deleteMovie : function() {	
			var userResponse = confirm("Are you sure you want to delete this movie?");	

			if(userResponse) {	
				for (var i=0; i<this.myMovies.userMovies.length; i++) {
					var aModel = this.myMovies.userMovies[i];

					if(aModel.get('id') == document.getElementById('hiddenVal').value) {
						aModel.destroy();
						break;
					}
				}

				this.event.trigger("change_page", null, {page: "userMovies"});
			} else {
				return;
			}
		},

	});
	var NewReview = Barebone.Model.extend({
		baseUrl: function(){
			return this.instanceUrl;
		},

		initialize: function(id){
			this.instanceUrl = "http://cs3213.herokuapp.com/movies/" + id["id"] + "/reviews.json";
		} 
	});
	
	//display reviews
	var ReviewViewClass = Barebone.View.extend({

		setup: function(options){
			this.event = options.event;
			this.el = "pageBody";
			this.render(options.movieID);
			this.registerDomEvents();
		},
		events : {
			"click .del" : "deleteReview",
		},

		deleteReview: function (e) {
    			var movie_review_id = $(e.target)[0].id.split("_");
			var dr = new NewReview();
         		dr.url= "http://cs3213.herokuapp.com/movies/" + movie_review_id[0] + "/reviews/" + movie_review_id[1] + ".json";
        		dr.destroy();

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
  		},	
		render: function(id){
			var nr = new NewReview(id);
			this.nr.fetch();

			this.$el().html("");
			for(var i=0; i<this.nr.attributes.length; i++)
			{
                                var renderString = "<a id='" + this.nr.get("id", i) + "' class='Review'><p>";
				renderString+= "user:" + this.nr.get("user", i)["username"]+"</u></b></a><br /><br />";
                            	renderString += "comment: " + this.nr.get("comment",i) + "<br>"; 
				renderString += "score: " + this.nr.get("score",i) + "<br>";
    				renderString += "updated at: "+ this.nr.get("updated_at",i)                
			
                        }
			if(this.nr.get("user")["username"] == this.getUserName(gon.user_email)) {
      				renderString += "<br /><a class='del' id='" + this.nr.get("movie_id") + "_" + this.nr.id + "' href='javascript: void(0);'>Delete</a></p></div>";
 			}

			this.$el().append(renderString);
		}
	});
	
	var ReviewViewForm = Barebone.View.extend({
		setup: function(options){
			this.event = options.event;
			this.el = "pageBody";
		},
		events: {
                        "click #save" : "saveReview",                        
        },

		saveReview: function() {
			var myNewReview = new NewReview();
            myNewReview.save(document.getElementById("createReviewForm"),{"access_token": gon.token});
			myNewReview.event.on("change", this.refreshReviews, this);
		},
		refreshReviews: function(){
                        //Is there need to refresh reviews?
                        this.event.trigger("change_page", null, {page: "index"});
        },

		render: function(){
			this.$el().html("");
			var renderString = "<div style='margin-left: 20px;' id='reviewForm'><form id='createReviewForm' name='review' method='POST'>";
            renderString += "<table><tr>";
            renderString += "<td colspan=2><h1>Create new review</h1></td></tr>";
            renderString += "<tr><td>Score: </td><td><input type='text' name='movie[title]' id='score'></td></tr>";
            renderString += "<tr><td>Comment: </td><td>  <textarea id ='comment' rows=3 cols=50></textarea></td></tr>";             
            renderString += "<tr><td colpsan=2  style='text-align: center;'><button class='btn btn-primary' id='save' type='button'>Save</button></td></tr></table></form></div>";
       
            this.$el().append(renderString);
            this.registerDomEvents();
		}
		
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
				this.showEditMovie(options.id);

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
			this.current_view = new UserMoviesView();
			this.current_view.setup({event: this.event});
		},

		//Shows the form to create a new Movie
		showCreateMovies: function() {
			this.current_view = new CreateMovieView();
			this.current_view.setup({event: this.event});
		},

		//Show the form to update the Movie
		showEditMovie: function(id) {			
			this.current_view = new EditMovieView();
			this.current_view.setup({event: this.event, movieID: id});
		},

		//Shows the Movie's details and its reviews
		showMovieDetail: function() {
			
		},
	});

	//code here
	var myViewController = new ViewController();
	myViewController.setup();

});