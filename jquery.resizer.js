/* *******************************************************************
jquery.resizer: Simple jQuery Window Resize Handler
Throttles the window.resize event and pushes it to other elements.
(c) 2012 Samuel Rouse
http://github.com/oculus42/jquery.resizer    
******************************************************************* */

(function ($) {

    var methods = {
        
        resizer : function() {
        	$(methods.items).trigger('resizer');
        },
        
        timer : 0,
        
        items : []
        
    };

    $.fn.resizer = function (param1, param2) {
        
		var options = {};
		var bindfunc = undefined;
		
		switch (typeof param1) {
			case "object":
				options = param1;
				break;
			case "number":
				options = { interval : param1 }; 
				break;
			case "function":
				bindfunc = param1;
				break;
			default:
				console && console.log("jqResizer: param1 type " + (typeof param1));
		}
		
		if (typeof param2 === "function" ) { bindfunc = param2; }
		
		// Set the settings.
		var settings = $.extend({
			interval: 100
		}, options);
		
		$(window).bind('resize',function(){
			methods.timer === 0 || clearTimeout(methods.timer);
			methods.timer = setTimeout(function(){methods.resizer()}, settings.interval);
		    
		});
		
		// Add it to the items array and bind the function if one was passed.
		return this.each(function (idx, el) {
			methods.items.push(el);
			
			if (bindfunc !== undefined) {
		    	$(this).bind('resizer',bindfunc);
			}
		});
	};

})(jQuery);
