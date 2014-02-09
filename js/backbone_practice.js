(function($) {

    var collection = new Backbone.Collection();
    var listView = new PersonModels.ListView({
        el: $("#personList"),
        collection: collection
    });    
	var appView = new PersonModels.AppView({
			el : $("#main"),
            collection: collection
		});
}
	(jQuery));
