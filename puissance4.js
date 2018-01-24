$.fn.puissance_4 = function (x , y){

	for(let i = 0 ; i<x ;i++){
		var row = $('<div>').addClass('row');
		for( let j = 0; j < y; j++){
			var col = $('<div>').addClass('col empty').attr('data-col', j).attr('data-row', i);
			row.append(col);
		}
		$(this).append(row);
	}

	function lastEmpty(col){
		const slot = $(`.col[data-col='${col}']`);
		for(let i = slot.length -1; i >= 0 ; i--){
			const $slot = $(slot[i]);
			if($slot.hasClass('empty')){
				return $slot;
			} 
		}
		return null;
	}

	$(this).on('mouseenter', '.col.empty', function(){
		var col = $(this).data('col');
		var lastColEmpty = lastEmpty(col);
		lastColEmpty.addClass('hover-red');
		
	});
	$(this).on('mouseleave', '.col', function(){
		$('.col').removeClass('hover-red');
	});
}