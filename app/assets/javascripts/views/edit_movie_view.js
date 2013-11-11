MovieApp.Views.EditMovieView = Backbone.View.extend({
	el: '#pageBody',
	template: JST['edit_movie_Template'](),

	initialize : function(id) {
		var current = this;
		this.model = new MovieApp.Models.MovieModel(id);
		this.model.fetch({
			success : function() {
				current.render();
			}
		});		
	},

	render : function() {
		var myNavBarView = new MovieApp.Views.NavBarView();
    	$(this.el).html(myNavBarView.render().el);
		$(this.el).append(this.template);	
		document.getElementById('movie_title').value = this.model.get('title');
		document.getElementById('summary').value = this.model.get('summary');

		return this;
	},

	events : {
		"click #submit" : "updateMovie",
		"click #cancel" : "returnToUserMovies",
	},

	updateMovie : function(e) {
		var selector = $(e.target).parent().parent().parent().parent().parent();
		  selector.ajaxSubmit({
		      url:  "http://cs3213.herokuapp.com/movies/" + this.model.get("id") + ".json",
		      dataType: 'json',
		      data: {"access_token": gon.token},
		      method: "PUT",
		      error: function(error, err) {
			      alert("Could not update movie"); 
		      },
		      success: function(msg) {
		   	    window.router.navigate("myMovies", {trigger: true});
		      },
		      beforeSubmit: function(arr, $form, options) { 
		       	if($("#movie_title").val() == "") {
		          alert("Please enter movie title");
		          return false;
		        } 
		        else if($("#movie_img").val() == "")
		        {
		       	  alert("Please enter movie image");
		          return false;
		        }
		        else if($("#summary").val() == "")
		        {
		       	  alert("Please enter movie summary");
		          return false;
		        }
		        else 
		        {
		          return true;
		        }
		  		}
		    });

    	return false;
	}, 
	
	returnToUserMovies : function() {
		window.router.navigate("myMovies", {trigger : true});
	},

});