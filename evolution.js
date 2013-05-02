function skipDay() {
	//updateWorldとdrawWorldを呼ぶ
	updateWorld();
	drawWorld();
}
function updateWorld() {
	//一日分のシミュレーションを進める

	//エネルギーが0になった動物は餓死する
	if(typeof animals[0] != 'undefined'){
		if(animals[0].energy <= 0) {
			animals[0] = undefined;
		}
	}

	if(typeof animals[0] != 'undefined') {
		turn(animals[0]);
		move(animals[0]);
		eat(animals[0]);
	}
	addPlants();
}

//グローバル変数plants
var plants = new Array();
//plantsの初期化
for(var y = 0; y < 30; y++) {
	plants[y] = new Array();
}

//min以上、max以下の乱数を生成
function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//animalコンストラクタの定義
function animal(x, y, direction, initialEnergy) {
	this.positionX = x;
	this.positionY = y;
	this.directionNumber = direction;
	this.energy = initialEnergy;

	//geneの初期化
	var tmpGene = new Array(8);
	for(var i = 0; i < 8; i++) {
		tmpGene[i] = generateRandomNumber(1, 10);
	}
	this.gene = tmpGene;
}

//グローバル変数animals
var animals = new Array();
animals[0] = new animal(50, 15, generateRandomNumber(0, 7), 200);

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
	if(typeof animals[0] != 'undefined'){
		world[animals[0].positionY][animals[0].positionX] = "M"; //TODO: 複数のanimalsを追加できるようにする。
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
	animal.energy -= 1;

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

	//確率の判定
	var rndNum = generateRandomNumber(1, sum);
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

//動物たちを繁殖させる
function reproduce(animal) {
	if(animal.energy >= 200) {
		animal.energy /= 2;
		var chlid = new animal(animal.positionX, animal.positionY, generateRandomNumber(0, 7), animal.energy);
		animals.push(child);
	}
}