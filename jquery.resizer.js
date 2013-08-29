/* *******************************************************************
jquery.resizer: Simple jQuery Window Resize Handler
Delays/throttles the window.resize event and pushes it to other elements.

2012-2013 Samuel Rouse

http://github.com/oculus42/jquery.resizer    
******************************************************************* */

(function (window,$) {
    "use strict";

    var resizer = function() {
        $(items).trigger('resizer');
    }, timer = 0, items = [];

    $.fn.resizer = function (param1, param2) {

	var interval = 100, bindfunc;
		
	switch (typeof param1) {
		case "number":
			interval = +param1; 
			break;
		case "function":
			bindfunc = param1;
			break;
		default:
			console && console.log("jqResizer: arugment type " + (typeof param1));
	}
		
	if (typeof param2 === "function" ) { bindfunc = param2; }
	
	$(window).on('resize',function(){
		timer === 0 || clearTimeout(timer);
		timer = setTimeout(function(){resizer()}, interval);
	});
	
	// Add it to the items array and bind the function if one was passed.
	return this.each(function (idx, el) {
		items.push(el);
		
		if (bindfunc !== undefined) {
	    		$(el).on('resizer',bindfunc);
		}
	});
    };

})(window,jQuery);
