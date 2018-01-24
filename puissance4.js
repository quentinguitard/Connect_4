$.fn.puissance_4 = function (x , y){

	console.log('Bonjours');
	for(let i = 0 ; i<x ;i++){
		var row = $('<div>').addClass('row');
		for( let j = 0; j < y; j++){
			$(row).append("<div class='col empty'></div>");
		}
		(this).append(row);
	}
}