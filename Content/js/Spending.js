// Spending Tracker
// A way to quickly keep track of the money your spending 
// Create By: Jenny Reeve

// Create using Backbone and the Todo list example by [Jérôme Gravel-Niquet](http://jgn.me/). 

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function () {

    var DATE_FORMAT = "d MM, yy"
    $(".date").datepicker({ dateFormat: DATE_FORMAT });

    // Spending Model

    var Spending = Backbone.Model.extend({

        // Default attributes for the spending app item.
        // dateSpent - the date the money was spent
        // description - a short description of what the money was spent on 
        // amount - the amount that was spent 

        defaults: function () {
            return {
                dateSpent: $.datepicker.formatDate(DATE_FORMAT, new Date()),
                description: "text...",
                amount: 0,
                spent: 0
            };
        },

        transformDate: function (date) {
            if (Validation.DateValidator(date)) return date;
            return $.datepicker.formatDate("dd/mm/yy", new Date(date))
        },

        // Sets the default values if a value has not been given 
        initialize: function () {
            var dateSpent = this.get("dateSpent");
            if (!dateSpent) {
                this.set({ "dateSpent": this.defaults().dateSpent });
            } else {
                this.set({ "dateSpent": this.transformDate(dateSpent) });
            }
            if (!this.get("description")) {
                this.set({ "description": this.defaults().description });
            }
            if (!this.get("amount")) {
                this.set({ "amount": this.defaults().amount });
            }
        },

        toggle: function () {
            this.save();
        }

    });


    // Todo Collection
    // ---------------

    // The collection of todos is backed by *localStorage* instead of a remote
    // server.
    var SpendingList = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Spending,

        // Save all of the todo items under the `"todos-backbone"` namespace.
        url: '/api/Spending',

        initialize: function () {

        },

        remaining: function () {
            return this;
        },

        // Spending is sorted by date the money was spent on.
        comparator: function (a, b) {
            var dateA = new Date(a.get("dateSpent"));
            var dateB = new Date(b.get("dateSpent"));
            if (dateA > dateB) return 1;
            if (dateA < dateB) return -1
            return 0;
        }

    });

    // Create our global collection of **Todos**.
    var Spendings = new SpendingList;

    // Todo Item View
    // --------------

    // The DOM element for a todo item...
    var SpendingView = Backbone.View.extend({

        //... is a list tag.
        tagName: "li",

        // Cache the template function for a single item.
        template: _.template($('#item-template').html()),

        // The DOM events specific to an item.
        events: {
            "dblclick .view": "edit",
            "click a.destroy": "clear",
            "keypress .edit": "updateOnEnter"
        },

        // The TodoView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Todo** and a **TodoView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        // Re-render the titles of the todo item.
        render: function () {
            var sum = 0.00;
            this.model.collection.each(function (item) {
                var a = item.get('amount');
                sum += parseFloat(a);
                item.set('spent', sum);
            });

            this.$el.html(this.template(this.model.toJSON()));
            this.input = this.$('.edit');
            return this;
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function () {
            this.$el.addClass("editing");
            //this.input.focus();
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function () {
            var saveItem = new Object();
            this.$(".edit").each(function () {
                var inputVal = $(this).val();
                var name = $(this).attr("name");
                saveItem[name] = inputVal;
            });
            this.model.save(saveItem);
            this.$el.removeClass("editing");
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function (e) {
            if (e.keyCode == 13) this.close();
        },

        // Remove the item, destroy the model.
        clear: function () {
            this.model.destroy();
        }

    });

    // The Application
    // ---------------

    var AppModel = Backbone.Model.extend({


        // Sets the default values if a value has not been given 
        initialize: function () {
            if (!this.get("id")) {
                var settings = new SettingsModel(this);
                settings.fetch(
                    {
                        success: function () {
                            var view = new SettingsDialog({ model: settings }).render();
                            if (view) view.showModal();
                        },
                        error: function () {
                            console.log('Failed to fetch!');
                        }
                    }
                );
            }
        }

    });

    // Our overall **AppView** is the top-level piece of UI.
    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: $("#spendingapp"),

        // Our template for the line of statistics at the bottom of the app.
        statsTemplate: _.template($('#stats-template').html()),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "keypress #spending-description": "createOnEnter",
            "keypress #spending-date": "createOnEnter",
            "keypress #spending-amount": "createOnEnter",
            "click a.setup": "updateSettings"
        },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function () {
            var _this = this;
            this.AppModel = new AppModel();

            this.listenTo(Spendings, 'add', this.addOne);
            this.listenTo(Spendings, 'reset', this.addAll);
            this.listenTo(Spendings, 'all', this.render);

            this.footer = this.$('footer');
            this.spendingSetup = this.$('#spending-setup');
            this.main = $('#main');

            Spendings.fetch();
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function () {
            var remaining = Spendings.remaining().length;

            this.spendingSetup.html(this.statsTemplate({ amountSpent: 0 }));

            if (Spendings.length) {
                this.main.show();
                this.footer.show();
            } else {
                this.main.hide();
                this.footer.hide();
            }

        },

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function (spending) {
            var view = new SpendingView({ model: spending });
            var index = spending.collection.indexOf(spending) + 1;
            this.$("#spending-list li:nth-child(" + index + ")").after(view.render().el);
        },

        // Add all items in the **Todos** collection at once.
        addAll: function () {
            Spendings.each(this.addOne, this);
        },

        // If you hit return in the main input field, create new **Todo** model,
        // persisting it to *localStorage*.
        createOnEnter: function (e) {
            if (e.keyCode != 13) return;

            var saveItem = new Object();
            this.$("header input").each(function () {
                var inputVal = $(this).val();
                var name = $(this).attr("name");
                saveItem[name] = inputVal;
                $(this).val('');
            });

            Spendings.create(saveItem);
        },

        updateSettings: function () {
            this.settings.set({ "edit": true });
            var view = new SettingsDialog({ model: this.settings });
            view.render().showModal();
        }

    });

    // Finally, we kick things off by creating the **App**.
    var App = new AppView;

});

jQuery(document).ajaxError(function (event, xhr) {
    if (xhr.status == 401)
        window.location = './account/login';
});
