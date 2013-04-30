function skipDay() {
	//updateWorldとdrawWorldを呼ぶ
}
function updateWorld() {
	//一日分のシミュレーションを進める
}
function drawWorld() {
	var cells = "";
	for(var y = 0; y < 30; y++) {
		for(var x = 0; x < 100; x++) {
			cells += ".";
		}
		cells += "\n";
	}
	document.getElementById("world").innerHTML = cells;
}