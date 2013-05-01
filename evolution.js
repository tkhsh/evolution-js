function skipDay() {
	//updateWorldとdrawWorldを呼ぶ
	updateWorld();
	drawWorld();
}
function updateWorld() {
	//一日分のシミュレーションを進める
	turn(animals);
	move(animals);
	eat(animals);
	addPlants();
}

//グローバル変数plants
var plants = new Array();
//plantsの初期化
for(var y = 0; y < 30; y++) {
	plants[y] = new Array();
}

function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//animalコンストラクタの定義
function animal(x, y, direction) {
	this.positionX = x;
	this.positionY = y;
	this.directionNumber = direction;
	this.energy = 200;

	//geneの初期化
	var tmpGene = new Array(8);
	for(var i = 0; i < 8; i++) {
		tmpGene[i] = generateRandomNumber(1, 10);
	}
	this.gene = tmpGene;
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
				world[y][x] = " ";
			}
		}
		world[y][100] = "\n";
	}
	
	//animalsを追加
	world[animals.positionY][animals.positionX] = "M";
	
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

function move(animal) {
	switch(animal.directionNumber) {
		case 0:
			animal.positionX += -1;
			animal.positionY += 1;
			break;
		case 1:
			animal.positionX += 0;
			animal.positionY += 1;
			break;
		case 2:
			animal.positionX += 1;
			animal.positionY += 1;
			break;
		case 3:
			animal.positionX += 1;
			animal.positionY += 0;
			break;
		case 4:
			animal.positionX += 1;
			animal.positionY += -1;
			break;
		case 5:
			animal.positionX += 0;
			animal.positionY += -1;
			break;
		case 6:
			animal.positionX += -1;
			animal.positionY += -1;
			break;
		case 7:
			animal.positionX += -1;
			animal.positionY += 0;
			break;
	}

	//エネルギーの消費
	animal.energy += -1;

	//世界の端を判定
	if(animal.positionX < 0) {
		animal.positionX = 99;
	}
	if(animal.positionX > 99) {
		animal.positionX = 0;
	}
	if(animal.positionY < 0) {
		animal.positionY = 29;
	}
	if(animal.positionY > 29) {
		animal.positionY = 0;
	}
}

//遺伝子に応じて動物の向きを変える
function turn(animal) {
	//分母の計算
	var sum = 0;
	for(var i = 0; i < 8; i++) {
		sum += animal.gene[i];
	}

	//確立の判定
	var rndNum = generateRandomNumber(0, sum);
	var tmp = 0;
	for(var i = 0; i < 8; i++) {
		tmp += animal.gene[i];
		if(rndNum <= tmp) {
			animal.directionNumber = i;
			break;
		}
	}
}

function eat(animal) {
	if(plants[animal.positionY][animal.positionX] == "*") {
		plants[animal.positionY][animal.positionX] = "";
		animal.energy += 80;
	}
}