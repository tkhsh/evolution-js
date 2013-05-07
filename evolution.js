function skipDay() {
	//updateWorldとdrawWorldを呼ぶ
	var tmpSkipNum = document.getElementById("skipNumber").value;
	if(tmpSkipNum.match(/[0-9]*/)) {
		for(var i = 0; i < tmpSkipNum; i++) {
			updateWorld();
		}
	}
	drawWorld();
}
function updateWorld() {
	//一日分のシミュレーションを進める

	//エネルギーが0になった動物は餓死する
	for(var i = 0; i < animals.length; i++) {
		if(animals[i].energy <= 0) {
			animals.splice(i, 1);
			i -= 1;
		}
	}

	for(var i = 0; i < animals.length; i++) {
		turn(animals[i]);
		move(animals[i]);
		eat(animals[i]);
		reproduce(animals[i]);
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
function Animal(x, y, direction, initialEnergy, arrayGene) {
	this.positionX = x;
	this.positionY = y;
	this.directionNumber = direction;
	this.energy = initialEnergy;
	this.gene = arrayGene;
}

//グローバル変数animals
var animals = new Array();

//geneの初期化
var tmpGene = new Array(8);
for(var i = 0; i < 8; i++) {
	tmpGene[i] = generateRandomNumber(1, 10);
}

//animalsの初期化
animals[0] = new Animal(50, 15, generateRandomNumber(0, 7), 200, tmpGene);

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
	for(var i = 0; i < animals.length; i++) {
		world[animals[i].positionY][animals[i].positionX] = "M";
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
		//親のenergyを半分（端数切り捨て）にする
		var tmpEnergy = animal.energy / 2;
		animal.energy = Math.floor(tmpEnergy);

		//子供を生む
		var child = new Animal(animal.positionX, animal.positionY, generateRandomNumber(0, 7), animal.energy, animal.gene);

		//遺伝子の突然変異
		var tmpSelectedGene = generateRandomNumber(0, 7);
		child.gene[tmpSelectedGene] += generateRandomNumber(-1, 1);
		if(child.gene[tmpSelectedGene] < 0) {
			child.gene[tmpSelectedGene] = 0;
		}

		animals.push(child);
	}
}