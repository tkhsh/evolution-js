function skipDay() {
	//updateWorldとdrawWorldを呼ぶ
}
function updateWorld() {
	//一日分のシミュレーションを進める
}
function drawWorld() {
	var cells = "";
	for(var i = 0; i < 30; i++) {
		for(var j = 0; j < 100; j++) {
			cells = cells.concat(".");
		}
		cells = cells.concat("\n");
	}
	document.getElementById("world").innerHTML = cells;
}