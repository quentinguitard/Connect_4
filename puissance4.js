$.fn.puissance_4 = function (x , y, player1, player2){
	var player = player1;
	console.log(player);
	for(let i = 0 ; i<x ;i++){
		var row = $('<div>').addClass('row');
		for( let j = 0; j < y; j++){
			var col = $('<div>').addClass('col empty').attr('data-col', j).attr('data-row', i);
			row.append(col);
		}
		$(this).append(row);
	}

	


	$(this).append("<button id='undo'>Undo</button>");

	var boardP1 = [];
	var boardP2 = [];
	
	for(let i = 0 ; i < x ; i++){
		var rowsP1 = [];
		var rowsP2 = [];
		for( let j = 0 ; j < y ; j++){
			rowsP1.push('0');
			rowsP2.push('0');
		}
		boardP1.push(rowsP1);
		boardP2.push(rowsP2);
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

	function firstEmpty(col){
		const slot = $(`.col[data-col='${col}']`);
		for(let i = 0; i < slot.length; i++){
			const $slot = $(slot[i]);
			if($slot.hasClass('empty')){
				return $slot;
			} 
		}
		return null;
	}

/*	$(this).on('mouseenter', '.col.empty', function(){
		var col = $(this).data('col');
		var firstColEmpty = firstEmpty(col);
		firstColEmpty.addClass('hover-'+player);
	});

	$(this).on('mouseleave', '.col', function(){
		$('.col').removeClass('hover-'+player);
	});
*/

	$(this).on('click', '#undo', function(){

		var col = $('.last-played').data('col');
		var row = $('.last-played').data('row');

		if(player === player1){
			boardP2[row][col] = '0';
		}

		if(player === player2){
			boardP1[row][col] = '0';
		}

		player = (player === player1) ? player2 : player1;
		$('.last-played').addClass('empty');
		$('.last-played').removeClass(player1);
		$('.last-played').removeClass(player2);
		$('.last-played').removeClass('last-played');

	});

	function drop(firstColEmpty,lastColEmpty, y, player, cb){

		var col = firstColEmpty.data('col');
		var row = firstColEmpty.data('row');
		var lastRow = lastColEmpty.data('row')
		console.log(lastRow);
		let i = 0;
		if(lastRow != 0){
			var inter =	setInterval(function(){
				var TargetRow = $(`.col[data-row='${i}'][data-col='${col}']`);
				i++;
				TargetRow.addClass(player);
				var interColor = setInterval(function(){
					TargetRow.removeClass(player);
					clearInterval(interColor);
				}, 100);
				if( i === lastColEmpty.data('row')){
					clearInterval(inter);
					console.log('hello');
					setTimeout(function(){
					cb(firstColEmpty,lastColEmpty);
						
					}, 50)
				}
			}, 0);
		}
		else {
			cb(firstColEmpty,lastColEmpty);
		}
	}


	$(this).on('click', '.col.empty', function(){
		var col = $(this).data('col');
		var row = $(this).data('row');
		var lastColEmpty = lastEmpty(col);
		var firstColEmpty = firstEmpty(col);
		firstColEmpty.removeClass('hover-'+ player);

		drop(firstColEmpty,lastColEmpty, y, player, function(firstColEmpty,lastColEmpty){


			if(player === player1){
				boardP1[lastColEmpty.data('row')][lastColEmpty.data('col')] = '1';
				console.log(boardP1);
				if(checkHorizontal(boardP1) === true || checkVertical(boardP1) === true || checkDiagonalDown(boardP1) === true || checkDiagonalUp(boardP1) === true){
					$('#container').addClass('win');
					$('#container').removeClass('container');
					$('.col').removeClass('col');
					$('.win').append('<p>Player ' + player + ' WIN</p>');
					$("#undo").remove();
				}			
			}

			if(player === player2){
				boardP2[lastColEmpty.data('row')][lastColEmpty.data('col')] = '1';			
				if(checkVertical(boardP2) == true || checkHorizontal(boardP2) === true || checkDiagonalDown(boardP2) === true || checkDiagonalUp(boardP2) === true){
					$('#container').addClass('win');
					$('#container').removeClass('container');
					$('.col').removeClass('col');
					$('.win').append('<p>Player ' + player + ' WIN</p>');
					$("#undo").remove();

				}
			}

			$('.last-played').removeClass('last-played');
			lastColEmpty.removeClass('empty');
			lastColEmpty.addClass(player);
			lastColEmpty.addClass('last-played');

			player = (player === player1) ? player2 : player1;
			$(this).trigger('mouseenter');
		});

	});

	function checkVertical(board){
		for(let i = 0 ;i < board.length - 3; i++){
			for(let j = 0; j < board[i].length; j++){
				if(board[i][j] == '1' && board[i+1][j] == '1' && board[i+2][j] == '1' && board[i+3][j] == '1'){
					console.log('win');
					return true;
				}
			}
		}
	}

	function checkHorizontal(board){
		for(let i = 0 ;i < board.length; i++){
			for(let j = 0; j < board[i].length - 3; j++){
				if(board[i][j] == '1' && board[i][j+1] == '1' && board[i][j+2] == '1' && board[i][j+3] == '1'){
					console.log('win');
					return true;
				}
			}
		}
	}

	function checkDiagonalUp(board){
		for(let i = 3; i < board.length; i++){
			for(let j = 0; j < board[i].length - 3; j++){
				if(board[i][j] == '1' && board[i-1][j+1] == '1' && board[i-2][j+2] == '1' && board[i-3][j+3] == '1'){
					console.log('win');
					return true;
				}
			}
		}
	}

	function checkDiagonalDown(board){
		for(let i = 3; i < board.length; i++){
			for(let j = 3; j < board[i].length; j++){
				if(board[i][j] == '1' && board[i-1][j-1] == '1' && board[i-2][j-2] == '1' && board[i-3][j-3] == '1'){
					console.log('win');
					return true;
				}
			}
		}
	}
}
