// 名前空間管理用のオブジェクト
var PersonModels = PersonModels || {};

(function ($) {
	var Person = Backbone.Model.extend({
			defaults : {
				"name" : "",
				"age" : 0,
				"country" : "",
				"updateTime" : new Date()
			}
		});
	PersonModels.Person = Person;

	var AppView = Backbone.View.extend({
			events : {
				"click #addBtn" : "onAdd"
			},
			initialize : function () {
                _.bindAll(this, "onAdd");
				this.$name = $("#addForm [name='name']");
				this.$age = $("#addForm [name='age']");
				this.$country = $("#addForm [name='country']");
				this.render();
			},
			render : function () {
				this.$name.val('');
				this.$age.val('');
				this.$country.val('');
			},
			onAdd : function () {
				this.collection.add(
					new Person({
						name : this.$name.val(),
						age : this.$age.val(),
						country : this.$country.val(),
						id : this.collection.length + 1
					}));
				this.render();
			}
		});
	PersonModels.AppView = AppView;
    
    var ItemView = Backbone.View.extend({
        tagName: 'tr',
        tmpl:_.template($("#tmpl_itemview").html()),
        events:{
            "click .delete":"onDelete"
        },
        initialize:function () {
            _.bindAll(this, "onDelete");
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.onDestroy);
        },
        onDelete:function () {
            this.remove();
        },
        onDestroy:function () {
            this.remove();
        },
        render:function () {
            this.$el.html(this.tmpl(this.model.toJSON()));
            return this;
        }
    });
    PersonModels.ItemView = ItemView;

    var ListView = Backbone.View.extend({
        initialize:function () {
            _.bindAll(this, "addItem");
            this.listenTo(this.collection, "add", this.addItem);
            var _this = this;
        },
        render:function () {
            this.collection.each(function (item) {
                this.addItem(item);
            }, this);
            return this;
        },
        addItem:function (item) {
            this.$el.append(
                new ItemView({
                    model:item
                }).render().el);
        }
    });
    PersonModels.ListView = ListView;
}
	(jQuery));
