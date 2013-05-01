function skipDay() {
	//updateWorldとdrawWorldを呼ぶ
	addPlants();
}
function updateWorld() {
	//一日分のシミュレーションを進める
}

//グローバル変数plants
var plants = new Array();
//plantsの初期化
for(var y = 0; y < 30; y++) {
	plants[y] = new Array();
}

function drawWorld() {
	var world = new Array();
	for(var y = 0; y < 30; y++) {
		world[y] = new Array();
		for(var x = 0; x < 100; x++) {
			if(plants[y][x] == "*") {
				world[y][x] = "*";
			} else {
				world[y][x] = ".";
			}
		}
		world[y][100] = "\n";
	}

	//textを表示する処理
	var worldText = "";
	for(var y = 0; y < world.length; y++) {
		worldText += world[y].join("");
	}
	document.getElementById("world").innerHTML = worldText;
}

function addPlants() {
	//世界全体の植物
	var numY = Math.floor(Math.random() * 30);
	var numX = Math.floor(Math.random() * 100);
	plants[numY][numX] = "*";

	//ジャングルの植物
	var jungleY = Math.floor(Math.random() * 10) + 10;
	var jungleX = Math.floor(Math.random() * 10) + 45;
	plants[jungleY][jungleX] = "*";
	drawWorld();
}