MovieApp.Views.NavBarView = Backbone.View.extend({
  //This view correspond to the tiled display of all movie	
  el: "#navBar",

  initialize: function(){
  },

  render : function() {
    //This is the render function for this view. We will craft the view here.
    var str = '<div class="navbar navbar-inverse">'
    str = str.concat('<div class="navbar-inner">');
    str = str.concat('<div class="container">');
    str = str.concat('<ul class="nav">');
    str = str.concat('<li class="brand">Super Movie App</li>');
    str = str.concat('<li class="active"><a class="IndexNav">Index</a></li>');
    str = str.concat('<li class="active"><a class="MyMoviesNav">My Movies</a></li>');
    str = str.concat('<li class="active"><a class="CreateMovieNav">Create Movie</a></li>');
    str = str.concat('</ul>');
    str = str.concat('<ul class="nav pull-right">');
    str = str.concat('<li></li>');
    str = str.concat('<li><a class="LogoutNav">Logout</a></li>');
    str = str.concat('</ul</div></div></div>');

    $(this.el).html(str);
    return this;
  },
})
