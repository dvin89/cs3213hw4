MovieApp.Models.MovieReviewModel = Backbone.Model.extend({

	
	defaults: {
		movie_id:'',
		score: '22',	
		comment: 'asdasd',
		//username: {},

	},
	initialize: function(props) { 
        	this.url = props.url;
	
        },
	//getUserName: function(id){	
	//	this.username = new MovieApp.Models.UserModel({review_id:id});
    	//	var name = this.username.get('username');
	//return name;
	//}
	//intialize:function(options){
	
	    ///this.url = 'http://cs3213.herokuapp.com/movies/'+options.movie_id+ '/reviews.json';
	//}
	


})
