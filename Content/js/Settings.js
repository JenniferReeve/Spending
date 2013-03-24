// Settings screen setup a budget
// The user can set the time period it will be between 
// Enter there income over that time period
// How much they want to save over the time period

var DATE_FORMAT = "dd/mm/yy"

var SettingsModel = Backbone.Model.extend({

    url: '/api/Settings',

    defaults: function () {
        return {
            id: null,
            startDate: this.dateToday(),
            endDate: this.dateNextMonth(),
            income: 0,
            savingGoal: 0,
            canSpend: 0
        };
    },

    dateToday: function () {
        return $.datepicker.formatDate(DATE_FORMAT, new Date());
    },

    // Todays date plus one month
    dateNextMonth: function () {
        var today = new Date();
        var inAMonth = today.setMonth(today.getMonth() + 1);
        return $.datepicker.formatDate(DATE_FORMAT, new Date(inAMonth));
    },

    initialize: function () {
        if (!this.get("id")) {
            this.set({ "id": this.defaults().id });
        }
        if (!this.get("startDate")) {
            this.set({ "startDate": this.defaults().startDate });
        }
        if (!this.get("endDate")) {
            this.set({ "endDate": this.defaults().endDate });
        }
        if (!this.get("income")) {
            this.set({ "income": this.defaults().income });
        }
        if (!this.get("savingGoal")) {
            this.set({ "savingGoal": this.defaults().savingGoal });
        }
        if (!this.get("canSpend")) {
            this.set({ "canSpend": this.defaults().canSpend });
        }
        //parentForm.set({ "id": this.get("id") });
        //parentForm.set({ "canSpend": this.get("canSpend") });
    },

    validation: {
        startDate: { required: true, msg: "Please provide a start date", pattern: /^\d{2}\/\d{2}\/\d{4}$/ },
        endDate: { required: true, msg: "Please provide an end date", pattern: /^\d{2}\/\d{2}\/\d{4}$/ },
        income: { required: true, msg: "Please provide an income", min: 1 },
        savingGoal: { required: true, msg: "Please provide a saving goal", pattern: 'number' },
        canSpend: { required: true, msg: "Please provide the amount your able to spend", pattern: 'number' }
    }
});

var SettingsList = Backbone.Collection.extend({

    model: SettingsModel,

    url: '/api/Settings',

    remaining: function () {
        return this;
    },

    parse: function (response) {
        return response;
    }
});

var SettingsDialog = Backbone.ModalView.extend({
    title: "Setup Spending Tracker",
    model: SettingsModel,
    width: 600,
    initialize: function () {
        this.template = _.template($('#settings-template').html());
        Validation.ValidateForm(this);
    },

    events: {
        "click .close": "closeDialog",
        "click .save": "saveDialog",
        "blur .spending": "calculateSpending"
    },

    // Calculates the amount a person is allowing them self to spend by taking the income from the Saving Goal
    calculateSpending: function () {
        var income = this.$("[name='income']").val();
        var savingGoal = this.$("[name='savingGoal']").val();
        this.$("[name='canSpend']").val(income - savingGoal);
    },

    // Will only close the setup dialog when everything has been filled in 
    closeDialog: function () {
        if (this.model.get("edit")) {
            return true;
        } else {
            console.log("Can't close dialog till a setup has been completed");
            return false;
        }
    },

    saveDialog: function () {
        var saveItem = new Object();
        this.$(".settings").each(function () {
            var inputVal = !$(this).val() ? null : $(this).val();
            var name = $(this).attr("name");
            saveItem[name] = inputVal;
        });
        this.model.save(saveItem, {
            success: function () { return true },
            error: function (e) { console.log(e);  return false }
        });
    },

    transformDate: function (date) {
        if (Validation.DateValidator(date)) return date;
        return $.datepicker.formatDate(DATE_FORMAT, new Date(date))
    },

    render: function () {
        this.model.set({ "startDate": this.transformDate(this.model.get("startDate")) });
        this.model.set({ "endDate": this.transformDate(this.model.get("endDate")) });
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    clear: function () {
        this.model.destroy();
    }
});



