function skipDay() {
	//updateWorldとdrawWorldを呼ぶ
	addPlants();
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

function addPlants() {
	var tmp = document.getElementById("world").innerHTML;
	var arrayWorld = tmp.split("");
	var tmpNum = Math.floor(Math.random() * arrayWorld.length);
	if(arrayWorld[tmpNum] == ".") {
		arrayWorld[tmpNum] = "*";
	}
	var ans = arrayWorld.join("");
	document.getElementById("world").innerHTML = ans;
}