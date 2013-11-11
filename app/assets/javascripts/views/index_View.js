MovieApp.Views.IndexView = Backbone.View.extend({
  //This view correspond to the tiled display of all movie	
  el: '#pageBody',
  pageNo: 1,

  //template: JST['indexTemplate'](),

  initialize: function(){
    //Fetch the data from http://cs3213.herokuapp.com/movies.json 
    //when we initialize this view
    this.collection = new MovieApp.Collections.MovieCollection();  
    this.collection.fetch({reset: true});
    this.collection.bind("reset", this.render, this);     
  }, 

  getPage : function() {
    this.collection = new MovieApp.Collections.MovieCollection(this.pageNo);  
    this.collection.fetch({reset: true});
    this.collection.bind("reset", this.render, this);  
  },

  reducePageNo : function() {
    this.pageNo--;
    this.getPage();
  },

  increasePageNo : function() {
    this.pageNo++;
    this.getPage();
  },

  events: {
    //create an event "click on CreateMovie class" will trigger function "create_new_movie" 
    "click .CreateMovieNav": "create_new_movie",
    "click .IndexNav": "go_index",
    "click .MyMoviesNav": "go_my_movie",
    "click .LogoutNav": "go_logout",
    "click .Next": "increasePageNo",
    "click .Previous": "reducePageNo",
    "click .MovieSimpleLink": "show_movie_detail",
    "click .MovieSimpleImg": "show_movie_detail",
  },

  render : function() {
    var current = this;
    var myNavBarView = new MovieApp.Views.NavBarView();
    var movieRenderString = "";
    var count = 0;
    var movieCount = 30;
    var current = this;

    movieRenderString += "<center>";

    if(this.pageNo == 1)
      movieRenderString += "Previous";
    else
      movieRenderString += "<a class='Previous' href='javascript: void(0);'>Previous</a>";

    movieRenderString += " | ";

    var tempCollection = new MovieApp.Collections.MovieCollection(this.pageNo + 1);
    tempCollection.fetch({
      reset: true, 
      success: function() {
        if(tempCollection.length == 0)
            movieRenderString += "Next";
          else 
            movieRenderString += "<a class='Next' href='javascript: void(0);'>Next</a>";

          movieRenderString += "</center>";

          movieRenderString += "<table cellpadding='20'>";

          current.collection.each(function(myMovie) {

           var myMovieSimpleView = new MovieApp.Views.MovieSimpleView(myMovie);

            if(count == 0)
              movieRenderString += "<tr height=400>";
            
            if(count < 4) {
              movieRenderString += "<td width=25%>" + myMovieSimpleView.render().$el.html() + "</td>";
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
          $(current.el).html(myNavBarView.render().el);
            
          $(current.el).append(movieRenderString);

          return this;
      }
    });    
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
    window.location="logout.html";
  },

  show_movie_detail: function(e) {
    var target = $(e.target).parent();
    var movieID = 0;

    if(target[0].id != "")
      movieID = target[0].id;
    else {
      movieID = target.parent()[0].id;
    }

    window.router.navigate("movie/" + movieID, {trigger: true});
  }

})
