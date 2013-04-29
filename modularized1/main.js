

require( ['ToledoChess'], function(ToledoChess){

	window.OnClick = OnClick;

	var ai = new ToledoChess();
	ai.drawCallback = DrawPieces;

	CreateChessboardView();
	DrawPieces();


	function CreateChessboardView() {
		var x, y, i;
		var a = "<table cellspacing=0 align=center>";
		for (y=0; y<8; y++) {
			a += "<tr>";
			for (x=0; x<8; x++) {
				i = y*10 + x + 21;
				a += "<th width=60 height=60 onclick=OnClick(" + i + ") id=o" + i +
					 " style='line-height:50px;font-size:50px;border:2px solid #dde' bgcolor=#" +
					 (((x+y) & 1) ? "c0c0f0>" : "f0f0f0>");
			}
			a += "</tr>";
		}
		a += "<tr><th colspan=8><select id=t style='font-size:20px'>";
		a += "<option>&#9819;<option>&#9820;<option>&#9821;<option>&#9822;";
		a += "</select></tr></table>";
		document.write(a);
	}

	function DrawPieces(dontExecuteTheAssignment) {
		ai.debug();
		console.log('DrawPieces');

		var pieces = "\xa0\u265f\u265a\u265e\u265d\u265c\u265b  \u2659\u2654\u2658\u2657\u2656\u2655";
		var p, q;
		if( !dontExecuteTheAssignment)
			ai.moveFrom=ai.moveTo;
		for (p=21; p<99; ++p) {
			if (q = document.getElementById("o" + p)) {
				q.innerHTML = pieces.charAt(ai.board[p] & 15);
				q.style.borderColor = (p == ai.moveFrom) ? "red" : "#dde";
			}
		}
	}

	var clickLock = false;

	function triggerAI()
	{
		console.log('triggerAI begin');
		ai.compute(0,0,0,21,ai.pawn2SquareMove,2); // 2 = ply
		ai.compute(0,0,0,21,ai.pawn2SquareMove,1);
		DrawPieces(true);
		clickLock=false;
		console.log('triggerAI end');
	}

	function OnClick(fieldID) {
		if (clickLock)
			return;
		ai.curPieceCode = (ai.board[fieldID] ^ ai.curPlayer) & 15;
		if (ai.curPieceCode > 8) {
			console.log('clicked on the own piece');
			// clicked on the own piece
			ai.moveTo = fieldID;
			DrawPieces();
		} else if (ai.moveFrom && ai.curPieceCode<9) {
			// clicked on the opponent piece or empty space
			ai.moveTo = fieldID;
			ai.curPieceCode = ai.board[ai.moveFrom] & 15;
			// pawn promotion
			if ((ai.curPieceCode & 7) == 1 & (ai.moveTo < 29 | ai.moveTo > 90))
				ai.curPieceCode = 14 - document.getElementById("t").selectedIndex ^ ai.curPlayer;
			// verify player move and execute it
			ai.compute(0,0,0,21,ai.pawn2SquareMove,1);
			// Call A.I. after some delay
			if (ai.curPlayer) {
				clickLock = true;
				setTimeout(triggerAI,250);
			}
		}
	}


});