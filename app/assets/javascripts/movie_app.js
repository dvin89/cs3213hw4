$(document).ready(function(){

	//classes declaration
	var NewMovie = Barebone.Model.extend({
    url: "http://cs3213.herokuapp.com/movies.json",
  });
	
	var MovieList = Barebone.Model.extend({
		baseUrl: "http://cs3213.herokuapp.com/movies.json?page=",
		page: 1,
		url: "http://cs3213.herokuapp.com/movies.json?page=1",
		changeUrl: function(i){page = i; this.url=baseUrl+page;}
	});
	
	var CreateMovieView = Barebone.View.extend({
		setup: function(){
			this.el = "pageBody";
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
			alert("in cre8");
			var myNewMovie = new NewMovie();
			myNewMovie.event.on("change", this.hookToMovieDetail, this);
			myNewMovie.save(document.getElementById("createMovieForm"), {"access_token": gon.token});
		},
		
		hookToMovieDetail: function(){
			//this is supposed to be a function to link to a page showing the newly created movie details
		}
	
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



	//code here
	//var myIndexView = new IndexView();
	//myIndexView.setup();
	
	var mycreatemovie = new CreateMovieView();
	mycreatemovie.setup();







});
