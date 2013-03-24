// Backbone.ModalDialog.js v0.3.2
//
// Copyright (C)2012 Gareth Elms
// Distributed under MIT License
//
// Documentation and full license availabe at:
// https://github.com/GarethElms/BackboneJSModalView

Backbone.ModalView =
    Backbone.View.extend(
    {
        title: "",
        defaultOptions:
		{
		},

        initialize: function() {},
        events:{},
        showModal: function(options) {
			var _this = this; 
			$(this.el).dialog({
				title: _this.title,
				modal: true,
				width: _this.width,
				open: function(event, ui) {
					var DATE_FORMAT = "dd/mm/yy"
					$(".date").datepicker({ dateFormat:DATE_FORMAT });
				},
				beforeClose: function(event, ui) { 
					return _this.closeDialog()
				}
			}); 
		}  
    });