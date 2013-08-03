Helper = {
    dateBetween: function(dateFrom, dateTo, dateCheck) {
        return dateCheck > dateFrom && dateCheck < dateTo
    },

    transformDate: function (date) {
        if (Validation.DateValidator(date)) return date;
        return $.datepicker.formatDate(DATE_FORMAT, new Date(date))
    }
}