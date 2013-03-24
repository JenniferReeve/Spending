var Validation = { 
	ValidateForm: function(form) { 
		Backbone.Validation.bind(form, { valid: this.HideError, invalid: this.ShowError }); 
	},
	HideError: function (view, attr, selector) { 
		var $element = $(view.el).find("[for='" + attr + "']");
		$element.removeClass("error"); 
		$element.parent().find(".error-message").empty(); 
	},
	ShowError: function( view, attr, errorMessage, selector)
	{
		var $element = $(view.el).find("[for='" + attr + "']");

		$element.addClass( "error");
		var $errorMessage = $element.parent().find(".error-message");
		if( $errorMessage.length == 0)
		{
			$errorMessage = $("<div class='error-message'></div>");
			$element.parent().append( $errorMessage);
		}

		$errorMessage.empty().append( errorMessage);
	},	
	DateValidator: function (date) { 
		var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //dd/mm/yyyy
		if (validformat.test(date)) { 
			return true; 
		} 
		return false; 
	}
} 