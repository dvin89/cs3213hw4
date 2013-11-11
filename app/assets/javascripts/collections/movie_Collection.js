MovieApp.Collections.MovieCollection = Backbone.Collection.extend({
  //model: MovieApp.Models.MovieModel,
  url: "http://cs3213.herokuapp.com/movies.json",
    
  initialize: function(pageNo){
  	//var pageNo = pageObj.get();

  	if(pageNo != null) {
  		this.url = "http://cs3213.herokuapp.com/movies.json?page=" + pageNo;
  	}
  }
});
