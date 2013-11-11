MovieApp.Views.ReviewForm = Backbone.View.extend({	
	template: JST['ReviewFormTemplate'](),
	
	initialize: function(){
		//this.collection = new MovieApp.Collections.ReviewList();
        	//this.listenTo(this.collection, 'add', this.createReview);				
    },
	
	render:function(){
	 this.$el.html(this.template);
	 
	 return this;
	},
});
