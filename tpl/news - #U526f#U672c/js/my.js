/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-22 14:42:58
 * @version $Id$
 */

$(document).ready(function(){
	var tags_a = $("#tags").find("a");
	tags_a.each(function(){
		var x = 9;
		var y = 0;
		var rand = parseInt(Math.random() * (x - y + 1) + y);
		$(this).addClass("size"+rand);
	});
	
});
