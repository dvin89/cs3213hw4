
window.MovieApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(){
    
    window.router = new MovieApp.Routers.MainRouter();
    Barebone.history.start();
  }

}

$(document).ready(function(){
  //initialize our movie app once the page is ready
  MovieApp.initialize();
});

