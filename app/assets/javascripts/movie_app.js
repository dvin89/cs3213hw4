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

	var ViewController = Barebone.View.extend({

		setup: function() {
			this.event = new Barebone.Event();
			this.event.on("change_page", this.change_page, this);
		},

		change_page: function(model, options) {
			if(options.page == "index") {
				this.show_page_one();
			}

		},

		showIndex: function() {
			this.current_view = new IndexView();
			this.current_view.setup();
		},
	});

	//code here
	var myViewController = new ViewController();
	myViewController.setup();






});
