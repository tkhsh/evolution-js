function skipDay() {
	//updateWorldとdrawWorldを呼ぶ
	addPlants();
	drawWorld();
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

function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

//animalコンストラクタの定義
function animal(x, y, direction) {
	this.positoinX = x;
	this.positionY = y;
	this.directionNumber = direction;
}

//グローバル変数animals
var animals = new animal(50, 15, generateRandomNumber(0, 7));

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
	var worldY = generateRandomNumber(0, 29);
	var worldX = generateRandomNumber(0, 99);
	plants[worldY][worldX] = "*";

	//ジャングルの植物
	var jungleY = generateRandomNumber(10, 19);
	var jungleX = generateRandomNumber(45, 54);
	plants[jungleY][jungleX] = "*";
}