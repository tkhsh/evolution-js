function skipDay() {
	//updateWorldとdrawWorldを呼ぶ
	addPlants();
}
function updateWorld() {
	//一日分のシミュレーションを進める
}
//グローバル変数world


function drawWorld() {
	var world = new Array();
	for(var y = 0; y < 30; y++) {
		world[y] = new Array();
		for(var x = 0; x < 100; x++) {
			world[y][x] = ".";
		}
		world[y][100] = "\n";
	}
	var worldText = "";
	for(var y = 0; y < world.length; y++) {
		worldText += world[y].join("");
	}
	document.getElementById("world").innerHTML = worldText;
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