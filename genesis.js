
/*
Final Project
Team 21

Last modified 25 April 2018
*/

	//Start Screen Variables
	var startScreen, startCam;
	var allrocks;
	//Main Scene Variables
	var scene, renderer;
	var camera, avatarCam;
	var avatar;

	//End Scene Variables
	var endScreen, endCamera;

	//Transition Scene Variables
	var textGeometry;
	var levelOneScreen;
	var levelTwoScreen;
	var levelThreeScreen;

	//Objects
	var key1, key2, key3;
	var screenClock;
	var ground, skybox;

	//Other
	var controls =
	     {fwd:false, bwd:false, left:false, right:false,
				speed:10, fly:false, reset:false,
		    camera:camera}

	var globalSound;

	var hint1, hint2, hint3;


	// initial game state
	var gameState =
	     {litterScore:0, health:10, scene:'startscreen', camera:'startCam', level: 'none'}


  //INITIALIZE GAME
  init();
	initControls();
	animate();


	//Init Functions
	function init(){ // Initialize Game
      initPhysijs();
			createStartScreen();
			scene = initScene();
			initRenderer();
			createMainScene();
			levelOneScreen();
			levelTwoScreen();
			levelThreeScreen();
			createEndScene('endLevel.jpg');
	}


	// Initialize new Physijs scene
	function initScene(){
		var scene = new Physijs.Scene();
		return scene;
	}


	//Initialize Physijs
	function initPhysijs(){
		Physijs.scripts.worker = '/physijs_worker.js';
		Physijs.scripts.ammo = '/ammo.js';
	}


	// Initialize renderer
	function initRenderer(){
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight-50 );
		document.body.appendChild( renderer.domElement );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}


	//FUNCTIONS FOR RENDERING SCENES:

	//RENDER START SCREEN
	function createStartScreen(){
		startScreen = initScene();
		startText = initPlaneMesh('startscreen.jpg');
		startScreen.add(startText);
		startText.scale.set(150,100,1);
		startText.position.set(0,0,0);
		startScreen.add(startText);
		//LIGHTS
		var light1 = createPointLight();
		var light2 = createPointLight();
		light1.position.set(10,0,150);
		light2.position.set(-10,0,150);
		startScreen.add(light1);
		startScreen.add(light2);
		//CAMERA
		startCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
		startCam.position.set(0,0,50);
		startCam.lookAt(0,0,0);
	}


	//RENDER LEVEL 1: WASTELAND
	function levelOneScreen(){
		levelOneScreen = initScene();
		var oneBackground = initPlaneMesh('startlevel1.jpg');	// transition screen
		oneBackground.scale.set(150,100,1);
		oneBackground.position.set(0,0,0);
		levelOneScreen.add(oneBackground);
		//LIGHTS
		var light1 = createPointLight();
		var light2 = createPointLight();
		light1.position.set(10,0,150);
		light2.position.set(-10,0,150);
		levelOneScreen.add(light1);
		levelOneScreen.add(light2);
		//TEXT
		// initTextMesh('Level One: \nThe Wasteland', levelOneScreen, 0x8B0000);
		// console.log("added textMesh to scene");
		//CAMERA
		startCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
		startCam.position.set(0,0,50);
		startCam.lookAt(0,0,0);
		//HINT
		var infoUp = document.getElementById("infoUp");
		infoUp.style.display = 'none';
		 infoUp.innerHTML=
			'<div style="font-size:12pt">Welcome to the wasteland. After years of ' +
			'exploitation, misuse, and abuse by humankind, the planet and it\'s resources ' +
			'are in a state of total devastation. But there is hope! Perhaps if you spent some '+
			'time cleaning up all of the pollution, you may have a chance to reverse the damage...';
	}



	//Render main scene
	function createMainScene(){
      // LIGHTING
			var light0 = new THREE.AmbientLight( 0xffffff,0.25);
			var light1 = createPointLight();
			light1.position.set(0,200,20);
			scene.add(light1);
			scene.add(light0);
			// CAMERA
			camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
			camera.position.set(0,50,0);
			camera.lookAt(0,0,0);
			// CREATE GROUND/SKYBOX
			// ground = createGround('wasteldgrnd.jpg');
			// scene.add(ground);
			// skybox = createSkyBox('wasteland.jpg',1);
			// scene.add(skybox);
			// AVATAR CAMERA
			avatarCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
			// ADD OBJECTS
			addCrumpledPaper(20);
			addCubes(30);
			addCoke(30);
			addToxicWaste(80);
			avatar = createAvatar();
			avatar.position.set(-25,15,-60);
			scene.add(avatar);
			gameState.camera = avatarCam;

	}


		//RENDER LEVEL 2: REGENESIS
		function levelTwoScreen(){
			levelTwoScreen = initScene();
			var twoBackground = initPlaneMesh('startlevel2.jpg');		// transition screen
			twoBackground.scale.set(150,100,1);
			twoBackground.position.set(0,0,0);
			levelTwoScreen.add(twoBackground);
			//LIGHTS
			var light1 = createPointLight();
			var light2 = createPointLight();
			light1.position.set(10,0,150);
			light2.position.set(-10,0,150);
			levelTwoScreen.add(light1);
			levelTwoScreen.add(light2);
			//TEXT
			// initTextMesh('Level Two: \nRegenesis', levelTwoScreen, 0x336633);
			// console.log("added textMesh to scene");
			//CAMERA
			startCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
			startCam.position.set(0,0,50);
			startCam.lookAt(0,0,0);
		}

		//RENDER LEVEL 3: PARADISE
		function levelThreeScreen(){
			levelThreeScreen = initScene();
			var threeBackground = initPlaneMesh('startlevel3.jpg');		// transition screen
			threeBackground.scale.set(150,100,1);
			threeBackground.position.set(0,0,0);
			levelThreeScreen.add(threeBackground);
			//LIGHTS
			var light1 = createPointLight();
			var light2 = createPointLight();
			light1.position.set(10,0,150);
			light2.position.set(-10,0,150);
			levelThreeScreen.add(light1);
			levelThreeScreen.add(light2);
			//TEXT
			// initTextMesh('Level Three: \n Paradise', levelThreeScreen, 0x336633);
			// console.log("added textMesh to scene");
			//CAMERA
			startCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
			startCam.position.set(0,0,50);
			startCam.lookAt(0,0,0);
		}

		//RENDER END OF LEVEL SCREEN
		function createEndScene(img){
			endScreen = initScene();
			var endBackground = initPlaneMesh(img);
			endBackground.scale.set(150,100,1);
			endBackground.position.set(0,0,0);
			endScreen.add(endBackground);
			var light1 = createPointLight();
			var light2 = createPointLight();
			light1.position.set(10,0,150);
			light2.position.set(-10,0,150);
			endScreen.add(light1);
			endScreen.add(light2);
			// initTextMesh('You won!', endScreen, 0xe5e5ff);
			// console.log("added textMesh to scene");
			endCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
			endCamera.position.set(0,0,50);
			endCamera.lookAt(0,0,0);
		}


		//METHODS FOR ADDING OBJECTS TO SCENES

		//ADDING TEXT
		function initTextMesh(string, level, color) {
			var loader = new THREE.FontLoader();
			loader.load( '/fonts/helvetiker_regular.typeface.json', function createTextMesh(font){
				var textGeometry = new THREE.TextGeometry(string,
							 {
								 font: font,
								 size: 7,
								 height: 2,
								 curveSegments: 30,
								 bevelEnabled: true,
								 bevelThickness: 1,
								 bevelSize: 0.5,
								 bevelSegments: 8
							 }
					);
					var textMaterial = new THREE.MeshLambertMaterial( { color: color } );
					var textMesh = new THREE.Mesh( textGeometry, textMaterial );
					textMesh.position.set(-30, 0, 5);
					level.add(textMesh);
			});
		}


		//ADD CLOCK (for display bar)
		function createClock(){
			screenClock = new THREE.Clock();
		}

		// METHODS FOR ADDING DIFFERENT TYPES OF LITTER

		//ADD LITTER, TYPE 1
		function addCoke(numCoke){
			for(i=0;i<numCoke;i++){
				var coke = initCokeCan();
				coke.position.set(randN(115)-50,20,randN(115)-40);
				scene.add(coke);
				coke.addEventListener('collision',
				function(other_object, relative_velocity, relative_rotation, contact_normal){
					if(other_object == avatar){
						console.log("avatar picked up 1 coke can");
						soundEffect('good.wav');
						gameState.litterScore += 1;
						//Get rid of coke can once collision  occurs
						this.position.y = this.position.y - 100;
						this.__dirtyPosition = true;
						if (gameState.litterScore==10) {
							addKey();
						}
					}
				})
			}
		}


		//ADD LITTER, TYPE 2
		function addCubes(numCubes){
			for (i=0;i<numCubes;i++){
				var cube = createCube();
				cube.position.set(randN(115)-50,20,randN(115)-40);
				scene.add(cube);
				// When collided with a cube, the avatar gains a health point
				cube.addEventListener('collision',
					function( other_object, relative_velocity, relative_rotation, contact_normal ){
						if (other_object == avatar) {
							console.log("avatar picked up 1 litter");
							soundEffect('good.wav');
							gameState.litterScore += 1;
							// Get rid of the cube once collision occurs
							this.position.y = this.position.y - 100;
							this.__dirtyPosition = true;
							if (gameState.litterScore==10) {
								addKey();
							}
						}
					}
				)
			}
		}


		//ADD LITTER, TYPE 3
		function addCrumpledPaper(numBalls){
			for(i=0;i<numBalls;i++){
				var paper = createPaper();
				paper.position.set(randN(115)-50,20,randN(115)-40);
				scene.add(paper);
				paper.addEventListener( 'collision',
					function( other_object, relative_velocity, relative_rotation, contact_normal ) {
						if (other_object==avatar){
							console.log("avatar picked up 1 crumpled paper");
							soundEffect('good.wav');
							gameState.litterScore += 1;  // Score goes up by 1
							// Make the paper drop below the scene
							this.position.y = this.position.y - 100;
							this.__dirtyPosition = true;
							if (gameState.litterScore==10) {
								addKey();
							}
						}
					}
				)
			}
		}

		//ADD TREES
		function addTrees(numTrees){
			for(i=0;i<numTrees;i++){
				var tree = initTree();
				tree.position.set(randN(115)-50,2,randN(115)-40);
				scene.add(tree);
			}
		}
		//ADD ROCKS
		function addRocks(numRocks){
			allrocks=[];
			for(i=0;i<numRocks;i++){
				var rock = initRock(1);
				rock.position.set(randN(115)-50,0,randN(115)-40);
				scene.add(rock);
				allrocks.push(rock);
				var rock = initRock(2);
				rock.position.set(randN(115)-50,0,randN(115)-40);
				scene.add(rock);
				allrocks.push(rock);
				var rock = initRock(3);
				rock.position.set(randN(115)-50,0,randN(115)-40);
				scene.add(rock);
				allrocks.push(rock);
			}
		}

		function removeRocks(){
			for(i=0;i<allrocks.size;i++){
				scene.remove(allrocks[i]);
			}
		}
			//ADD FLOWERS
		function addFlowers(numFlowers){
			for(i=0;i<numFlowers;i++){
				var flower = initFlower("pink");
				flower.position.set(randN(115)-50,1,randN(115)-40);
				scene.add(flower);
				var flower = initFlower("yellow");
				flower.position.set(randN(115)-50,1,randN(115)-40);
				scene.add(flower);
				var flower = initFlower("blue");
				flower.position.set(randN(115)-50,1,randN(115)-40);
				scene.add(flower);
				var flower = initFlower("white");
				flower.position.set(randN(115)-50,1,randN(115)-40);
				scene.add(flower);
				var flower = initFlower("red");
				flower.position.set(randN(115)-50,1,randN(115)-40);
				scene.add(flower);
			}
		}


		//ADD TOXIC WASTE TO SCENE
		function addToxicWaste(quantity){
			for(i=0;i<quantity;i++){
				var tox = initToxicWaste();
				tox.position.set(randN(115)-50,0,randN(120)-30);
				scene.add(tox);
				tox.addEventListener( 'collision',
					function( other_object, relative_velocity, relative_rotation, contact_normal ) {
						if (other_object == avatar){
							console.log("avatar hit toxic waste, health -1");
							gameState.health -= 1;  // Score goes up by 1
							if (gameState.health==0) {
								gameState.scene='youlose';
							}
							this.position.y = this.position.y - 100;
							this.__dirtyPosition = true;
						}
					}
				)
			}
		}


		//HELPER/INITIALIZATION METHODS

		//ADD CORRECT KEY TO SCENE
		function addKey(){
			switch (gameState.level) {
				case "one":
					scene.add(key1)
					console.log("added level 1 key");
					break;
				case 'two':
					scene.add(key2)
					console.log("added level 2 key");
					break;
				case 'three':
					scene.add(key3)
					console.log("added level 3 key");
					break;
			}
		}
		function initTree(){
				 geometry = new THREE.BoxGeometry( 1, 1, 1 );
					var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
					var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
					var leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
					var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );

					var stem = new THREE.Mesh( geometry, stemMaterial );
					stem.position.set( 0, 0, 0 );
					stem.scale.set( 0.3, 1.5, 0.3 );

					var squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
					squareLeave01.position.set( 0.5, 1.6, 0.5 );
					squareLeave01.scale.set( 0.8, 0.8, 0.8 );

					var squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
					squareLeave02.position.set( -0.4, 1.3, -0.4 );
					squareLeave02.scale.set( 0.7, 0.7, 0.7 );

					var squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
					squareLeave03.position.set( 0.4, 1.7, -0.5 );
					squareLeave03.scale.set( 0.7, 0.7, 0.7 );

					var leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
					leaveDark.position.set( 0, 1.2, 0 );
					leaveDark.scale.set( 1, 2, 1 );

					var leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
					leaveLight.position.set( 0, 1.2, 0 );
					leaveLight.scale.set( 1.1, 0.5, 1.1 );

					var ground = new THREE.Mesh( geometry, leaveDarkDarkMaterial );
					ground.position.set( 0, -1, 0 );
					ground.scale.set( 2.4, 0.8, 2.4 );

					tree = new THREE.Group();
					tree.add( leaveDark );
					tree.add( leaveLight );
					tree.add( squareLeave01 );
					tree.add( squareLeave02 );
					tree.add( squareLeave03 );
					tree.add( ground );
					tree.add( stem );

					tree.scale.z=4;
					tree.scale.y=4;
					tree.scale.x=4;

					return tree;
			}

			function initRock(size){
				 geometry = new THREE.DodecahedronBufferGeometry(1,0);
					var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x969696 } );
					var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xc5c5c5 } );
					var leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
					var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );

					var stem = new THREE.Mesh( geometry, stemMaterial );
					stem.position.set( 0, 0, 0 );
					stem.scale.set( 0.3, 1.5, 0.3 );

					var squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
					squareLeave01.position.set( 0.5, 1.6, 0.5 );
					squareLeave01.scale.set( 0.8, 0.8, 0.8 );

					var squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
					squareLeave02.position.set( -0.4, 1.3, -0.4 );
					squareLeave02.scale.set( 0.7, 0.7, 0.7 );

					var squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
					squareLeave03.position.set( 0.4, 1.7, -0.5 );
					squareLeave03.scale.set( 0.7, 0.7, 0.7 );

					var leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
					leaveDark.position.set( 0, 1.2, 0 );
					leaveDark.scale.set( 1, 2, 1 );

					var leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
					leaveLight.position.set( 0, 1.2, 0 );
					leaveLight.scale.set( 1.1, 0.5, 1.1 );

					var ground = new THREE.Mesh( geometry, leaveDarkDarkMaterial );
					ground.position.set( 0, -1, 0 );
					ground.scale.set( 2.4, 0.8, 2.4 );

					tree = new THREE.Group();
					tree.add( leaveDark );

					tree.scale.z=size;
					tree.scale.y=size/2;
					tree.scale.x=size;

					return tree;
			}

			function initFlower(color){
				 geometry = new THREE.BoxGeometry( 1, 1, 1 );
				 var leaveDarkMaterial;
				 var leaveLightMaterial;
				 var leaveDarkDarkMaterial;
				 var stemMaterial;
				 if (color=="pink"){
					leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0xff8b9d } );
					leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xFFB6C1 } );
					leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x98008a } );
					stemMaterial = new THREE.MeshLambertMaterial( { color: 0x009803 } );
	}

	if (color=="yellow"){
	 leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0xe5de41 } );
	 leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xfff964 } );
	 leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x9f9918 } );
	 stemMaterial = new THREE.MeshLambertMaterial( { color: 0x009803 } );
	}
	if (color=="blue"){
	 leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x28b0d8 } );
	 leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0x7edefb } );
	 leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x9f9918 } );
	 stemMaterial = new THREE.MeshLambertMaterial( { color: 0x009803 } );
	}

	if (color=="white"){
	 leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0xd7dddf } );
	 leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
	 leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x9f9918 } );
	 stemMaterial = new THREE.MeshLambertMaterial( { color: 0x009803 } );
	}
	if (color=="red"){
	 leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0xb40000 } );
	 leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xff1717 } );
	 leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x9f9918 } );
	 stemMaterial = new THREE.MeshLambertMaterial( { color: 0x009803 } );
	}
					var stem = new THREE.Mesh( geometry, stemMaterial );
					stem.position.set( 0, 0, 0 );
					stem.scale.set( 0.3, 1.5, 0.3 );

					var squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
					squareLeave01.position.set( 0.5, 1.6, 0.5 );
					squareLeave01.scale.set( 0.8, 0.8, 0.8 );

					var squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
					squareLeave02.position.set( -0.4, 1.3, -0.4 );
					squareLeave02.scale.set( 0.7, 0.7, 0.7 );

					var squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
					squareLeave03.position.set( 0.4, 1.7, -0.5 );
					squareLeave03.scale.set( 0.7, 0.7, 0.7 );

					var leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
					leaveDark.position.set( 0, 1.2, 0 );
					leaveDark.scale.set( 1, 2, 1 );

					var leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
					leaveLight.position.set( 0, 1.2, 0 );
					leaveLight.scale.set( 1.1, 0.5, 1.1 );

					var ground = new THREE.Mesh( geometry, leaveDarkDarkMaterial );
					ground.position.set( 0, -1, 0 );
					ground.scale.set( 2.4, 0.8, 2.4 );

					tree = new THREE.Group();
					tree.add( leaveDark );
					tree.add( leaveLight );
					tree.add( squareLeave01 );
					tree.add( squareLeave02 );
					tree.add( squareLeave03 );
					tree.add( stem );

					tree.scale.z=1;
					tree.scale.y=1;
					tree.scale.x=1;

					return tree;
			}
		//TOXIC WASTE
		function initToxicWaste(){
			var geometry = new THREE.CylinderGeometry( 1, 1, 3, 30);
			var texture = new THREE.TextureLoader().load( '../images/toxicwaste.png');
			var material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa,  map: texture, side:THREE.DoubleSide} );
			var toxMesh = new Physijs.BoxMesh( geometry, material );
			toxMesh.setDamping(0.1,0.1);
			toxMesh.castShadow = true;
			return toxMesh;
		}

		//COKE CAN
		function initCokeCan(){
			var geometry = new THREE.CylinderGeometry(0.5,0.5,2.0,30);
			var texture = new THREE.TextureLoader().load('../images/cokeCan.jpg');
			var material = new THREE.MeshLambertMaterial({color: 0xaaaaaa, map: texture, side:THREE.DoubleSide});
			var cokeMesh = new Physijs.BoxMesh(geometry, material);
			cokeMesh.setDamping(0.1,0.1);
			cokeMesh.castShadow = true;
			return cokeMesh
		}

		//PLANE
		function initPlaneMesh(image){
				var geometry = new THREE.PlaneGeometry( 1, 1, 128);
				var texture = new THREE.TextureLoader().load( '../images/' +image );
				var material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa,  map: texture, side:THREE.DoubleSide} );
				planeMesh = new THREE.Mesh( geometry, material );
				planeMesh.receiveShadow = true;
				return planeMesh;
			}


		//POINTLIGHT
		function createPointLight(){
			var light;
			light = new THREE.PointLight( 0xffffff);
			light.castShadow = true;
			//Set up shadow properties for the light
			light.shadow.mapSize.width = 2048;  	// default
			light.shadow.mapSize.height = 2048; 	// default
			light.shadow.camera.near = 0.5;       // default
			light.shadow.camera.far = 500      		// default
			return light;
		}


		//BOX
		function createBoxMesh(color){
			var geometry = new THREE.BoxGeometry(1, 1, 1);
			var material = new THREE.MeshLambertMaterial( {color: color} );
			mesh = new Physijs.BoxMesh( geometry, material);
			mesh.castShadow = true;
			return mesh;
		}

		//static box
		function createBoxMesh2(color){
			var geometry = new THREE.BoxGeometry(1, 1, 1);
			var material = new THREE.MeshLambertMaterial( {color: color} );
			mesh = new Physijs.BoxMesh( geometry, material,0);
			mesh.castShadow = true;
			return mesh;
		}


		//GROUND
		function createGround(image){
			var geometry = new THREE.PlaneGeometry( 180, 180, 128 );
			var texture = new THREE.TextureLoader().load( '../images/'+image );
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 15, 15 );
			var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
			var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
			var mesh = new Physijs.BoxMesh( geometry, pmaterial, 0 );
			mesh.receiveShadow = true;
			mesh.rotateX(Math.PI/2);
			return mesh
		}


		//SKYBOX
		function createSkyBox(image,k){
			// creating a textured plane which receives shadows
			var geometry = new THREE.SphereGeometry( 80, 80, 80 );
			var texture = new THREE.TextureLoader().load( '../images/'+image );
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( k, k );
			var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
			var mesh = new THREE.Mesh( geometry, material, 0 );
			mesh.receiveShadow = false;
			return mesh
		}


		//AVATAR
		function createAvatar(){
			var geometry = new THREE.OctahedronGeometry(3, 0);
			var texture = new THREE.TextureLoader().load( '../images/simthing.jpg' );
			var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
			var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
			var mesh = new Physijs.BoxMesh( geometry, pmaterial );
			mesh.setDamping(0.1,0.1);
			mesh.castShadow = true;
			avatarCam.position.set(0,4,0);
			avatarCam.lookAt(0,4,10);
			mesh.add(avatarCam);
			return mesh;
		}


		//KEY: LEVEL ONE
		function initKeyLevelOne(){
			var geometry = new THREE.DodecahedronGeometry(0.5,0);
			var material = new THREE.MeshLambertMaterial( { color: 0x009999 } );
			var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
			key1 = new Physijs.BoxMesh( geometry, pmaterial, 0 )
			key1.position.set(randN(115)-50,2,randN(115)-40);
			key1.addEventListener('collision',
			function( other_object, relative_velocity, relative_rotation, contact_normal ){
				if (other_object == avatar) {
					this.position.y = this.position.y - 100;
					this.__dirtyPosition = true;
					gameState.litterScore = 0;
					gameState.scene = 'level2';
					globalSound.stop();
					playGameMusic('LightMood.mp3');
					infoUp.style.display = 'none';
					 infoUp.innerHTML=
						'<div style="font-size:12pt">Things are looking up, but we still have more work ' +
						'to do. As you can see, it is much easier to destroy an environment than to ' +
						'rebuild one. But despite all of this, the planet is incredibly resilient! '+
						'Continue cleaning up the litter and maybe this planet can really be saved...';
						hint2 = createBoxMesh2(0x00ff00);
						hint2.position.set(25,5,0)
						hint2.scale.set(2,2,2)
						hint2.addEventListener( 'collision',
							function( other_object, relative_velocity, relative_rotation, contact_normal ) {
								if (other_object == avatar){
									console.log('User found hint #2');
									infoUp.style.display = 'block';
							}
						}
						)
						scene.add(hint2);
						hint1.position.set(0,-100,0);
						hint1.__dirtyPosition = true;
				}
			}
		)

			//scene.add(key1);
	}

			function initKeyLevelTwo(){
				var geometry = new THREE.DodecahedronGeometry(0.5,0);
				var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
				var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
				key2 = new Physijs.BoxMesh( geometry, pmaterial, 0 )
				key2.position.set(randN(115)-50,2,randN(115)-40);
				key2.addEventListener('collision',
				function( other_object, relative_velocity, relative_rotation, contact_normal ){
					if (other_object == avatar) {
						this.position.y = this.position.y - 100;
						this.__dirtyPosition = true;
						gameState.litterScore = 0;
						gameState.scene = 'level3';
						playGameMusic('AllFallDown.mp3')
						infoUp.style.display = 'none';
						 infoUp.innerHTML =
							'<div style="font-size:12pt">Looking good! It is amazing how far a little  ' +
							'kindness to the planet can go. But this is not the end; the real work ahead ' +
							'depends on everyone\'s (including you) willingness to make environmentally-conscious decisions in '+
							'their lifestyles. As you continue on collecting the last pieces of pollution, ' +
							'please think about what you can do in real life to save the planet.';
							hint3 = createBoxMesh2(0x00ff00);
							hint3.position.set(0,5,25)
							hint3.scale.set(2,2,2)
							hint3.addEventListener( 'collision',
								function( other_object, relative_velocity, relative_rotation, contact_normal ) {
									if (other_object == avatar){
										console.log('User found hint #3');
										infoUp.style.display = 'block';
								}
							}
							)
							scene.add(hint3);

					}
					}

			)
		}

			function initKeyLevelThree(){
				var geometry = new THREE.DodecahedronGeometry(0.5,0);
				var material = new THREE.MeshLambertMaterial( { color: 0x009999 } );
				var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
				key3 = new Physijs.BoxMesh( geometry, pmaterial, 0 )
				key3.position.set(randN(115)-50,2,randN(115)-40);
				key3.addEventListener('collision',
				function( other_object, relative_velocity, relative_rotation, contact_normal ){
					if (other_object == avatar) {
						this.position.y = this.position.y - 100;
						this.__dirtyPosition = true;
						gameState.litterScore = 0;
						gameState.scene = 'youwon';
					}
				}
			)
		}

		//RING
		function createRingMesh(r, t){
			var geometry = new THREE.TorusGeometry( r, t, 16, 100 );
			var material = new THREE.MeshLambertMaterial( { color: 0xa7a775 } );
			var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
			var mesh = new Physijs.BoxMesh( geometry, material );
			mesh.setDamping(0.1,0.1);
			mesh.castShadow = true;
			return mesh;
		}


		//BALL/SPHERE
		function createBall(){
			var geometry = new THREE.SphereGeometry( 1, 16, 16);
			var material = new THREE.MeshLambertMaterial( { color: 0xa98e72} );
			var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
	    var mesh = new Physijs.BoxMesh( geometry, material );
			mesh.setDamping(0.1,0.1);
			mesh.castShadow = true;
			return mesh;
		}


		//ICOSAHEDRON
		function createIcosahedron(){
			var geometry = new THREE.IcosahedronGeomegry( 1);
			var material = new THREE.MeshLambertMaterial( { color: 0x9f7f6d} );
			var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
			var mesh = new Physijs.BoxMesh( geometry, material );
			mesh.setDamping(0.1,0.1);
			mesh.castShadow = true;
			return mesh;
		}


		//CUBE
		function createCube(){
			var geometry = new THREE.BoxGeometry( 1, 1, 1);
			var texture = new THREE.TextureLoader().load('../images/cardboardBox.jpg');
			var material = new THREE.MeshLambertMaterial( {color: 0xaaaaaa, map: texture, side: THREE.DoubleSide} );
			var cardboardMesh = new Physijs.BoxMesh(geometry, material);
			cardboardMesh.setDamping(0.1,0.1);
			cardboardMesh.castShadow = true;
			return cardboardMesh;
		}

		function createPaper(){
			var geometry = new THREE.IcosahedronGeometry(1);
			var texture = new THREE.TextureLoader().load('../images/crumpledPaper.jpg');
			var material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, map: texture, side: THREE.DoubleSide});
			var paperBall = new Physijs.BoxMesh(geometry, material);
			paperBall.setDamping(0.1,0.1);
			paperBall.castShadow = true;
			return paperBall;
		}


	//AUDIO FUNCTIONS

	//MUSIC
	function playGameMusic(file){
		// Create an AudioListener and add it to the camera
	  var listener = new THREE.AudioListener();
		camera.add( listener );

		// Create a global audio source
		 globalSound = new THREE.Audio( listener );

		// Load a sound and set it as the Audio object's buffer
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/sounds/'+ file, function( buffer ) {
			globalSound.setBuffer( buffer );
			globalSound.setLoop( true );
			globalSound.setVolume( 0.05 );
			globalSound.play();
		});
	}


	//SOUND EFFECTS
	function soundEffect(file){
		// Create an AudioListener and add it to the camera
		var listener = new THREE.AudioListener();
		camera.add( listener );

		// create a global audio source
		var sound = new THREE.Audio( listener );

		// load a sound and set it as the Audio object's buffer
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/sounds/'+file, function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( false );
			sound.setVolume( 0.5 );
			sound.play();
		});
	}


	//OTHER METHODS

	function randN(n){
		return Math.random()*n;
	}


	//Controls For eventListeners
	var clock;
	function initControls(){
			//create a clock for the time-based animation ...
			clock = new THREE.Clock(false);
			clock.start();

			// here is where we create the eventListeners to respond to operations
			window.addEventListener( 'keydown', keydown);
			window.addEventListener( 'keyup',   keyup );
  }


	//KEYDOWN EVENTS
	function keydown(event){
		console.log("Keydown:"+event.key);
		//console.dir(event);

		// first we handle the "play again" key in the "youwon" scene
		if ((gameState.scene == 'youwon' && event.key=='r') ||
				(gameState.scene == 'youlose' && event.key=='r')) {
			gameState.scene = 'main';
			gameState.litterscore = 0;
			gameState.health = 10;
			enemy.position.set(randN(20),30,randN(20));
			addCrumpledPaper(20);
			addCubes(30);
			addCoke(100);
			return;
		}else if (gameState.scene == 'startscreen' && event.key=='p') {
			gameState.scene = 'level1';
			playGameMusic('Ossuary.wav')
			hint1 = createBoxMesh2(0x00ff00);
			hint1.position.set(-25,5,0)
			hint1.scale.set(2,2,2)
			hint1.addEventListener( 'collision',
				function( other_object, relative_velocity, relative_rotation, contact_normal ) {
					if (other_object == avatar){
						console.log('User found hint #1');
						infoUp.style.display = 'block';
				}
			}
			)
			scene.add(hint1);
			return;
		}else if (gameState.scene == 'level1' && event.key=='p') {
			createClock();
			screenClock.start();
			gameState.scene = 'main';
			gameState.level = 'one'
			gameState.litterscore = 0;
			gameState.health = 10;
			addCrumpledPaper(20);
			addCubes(30);
			addCoke(100);
			addToxicWaste(80);
			addRocks(10);
			ground = createGround('wasteldgrnd.jpg');
			scene.add(ground);
			skybox = createSkyBox('wasteland.jpg',1);
			scene.add(skybox);
			initKeyLevelOne();
			return;
		}else if (gameState.scene == 'level2' && event.key=='p') {
			// createClock();
			// screenClock.start();
			removeRocks();
			gameState.scene = 'main';
			gameState.level = 'two'
			gameState.litterscore = 0;
			// gameState.health = 10;
			addCrumpledPaper(10);
			addCubes(15);
			addCoke(30);
			addToxicWaste(80);
			addTrees(30);
			ground = createGround('grass.jpeg');
			scene.add(ground);
			skybox = createSkyBox('sky.jpg',1);
			scene.add(skybox);
			initKeyLevelTwo();
			return;
		}else if (gameState.scene == 'level3' && event.key=='p') {
			// createClock();
			// screenClock.start();
			gameState.scene = 'main';
			gameState.level = 'three'
			gameState.litterscore = 0;
			// gameState.health = 10;
			addCrumpledPaper(10);
			addCubes(15);
			addCoke(10);
			addToxicWaste(10);
			addFlowers(50);
			ground = createGround('flowers.jpg');
			scene.add(ground);
			skybox = createSkyBox('clouds.jpg',1);
			scene.add(skybox);
			initKeyLevelThree();
			globalSound.stop();
			playGameMusic('AllFallDown.mp3')
			return;
		}else if (gameState.scene == 'youwon') {
			screenClock.stop();
			createEndScene('endLevel.jpg');
			return;
		}


		// Main scene
		switch (event.key){
			// Change the way the avatar is moving
			case "w": controls.fwd = true;  break;
			case "s": controls.bwd = true; break;
			case "a": controls.left = true; break;
			case "d": controls.right = true; break;

			case "f": controls.down = true; break;
			case "m": controls.speed = 30; break;	// speed up the avatar
      case " ": controls.fly = true; break;
      case "h": controls.reset = true; break;

			// switch cameras
			case "1": gameState.camera = camera; break;
			case "2": gameState.camera = avatarCam; break;

			// move the camera around, relative to the avatar
			case "ArrowLeft": avatarCam.translateY(1);break;
			case "ArrowRight": avatarCam.translateY(-1);break;
			case "ArrowUp": avatarCam.translateZ(-1);break;
			case "ArrowDown": avatarCam.translateZ(1);break;

			// rotate avatar camera view to the left and right
			case "q": avatarCam.rotateY(45); break;	// to the left
			case "e": avatarCam.rotateY(-45); break;	// to the right
			case "r": avatar.rotation.set(0,0,0);
								avatar.__dirtyRotation=true;
								avatar.setAngularVelocity(new THREE.Vector3(0,0,0))
								break;
		}

	}


	//KEYUP EVENTS
	function keyup(event){
		console.log("Keydown:"+event.key);
		// console.dir(event);
		switch (event.key){
			case "w": controls.fwd   = false;  break;
			case "s": controls.bwd   = false; break;
			case "a": controls.left  = false; break;
			case "d": controls.right = false; break;
			case "r": controls.up    = false; break;
			case "f": controls.down  = false; break;
			case "m": controls.speed = 10; break;
      case " ": controls.fly = false; break;
      case "h": controls.reset = false; break;
		}
	}


	// Change the avatar's linear or angular velocity based on controls state (set by WSAD key presses)
  function updateAvatar(){
		var forward = avatar.getWorldDirection();

		if (controls.fwd){
			avatar.setLinearVelocity(forward.multiplyScalar(controls.speed));
		} else if (controls.bwd){
			avatar.setLinearVelocity(forward.multiplyScalar(-controls.speed));
		} else {
			var velocity = avatar.getLinearVelocity();
			velocity.x=velocity.z=0;
			avatar.setLinearVelocity(velocity); //stop the xz motion
		}

    if (controls.fly){
      avatar.setLinearVelocity(new THREE.Vector3(0,controls.speed,0));
    }

		if (controls.left){
			avatar.setAngularVelocity(new THREE.Vector3(0,controls.speed*0.1,0));
		} else if (controls.right){
			avatar.setAngularVelocity(new THREE.Vector3(0,-controls.speed*0.1,0));
		}

    if (controls.reset){
      avatar.__dirtyPosition = true;
      avatar.position.set(40,10,40);
    }

	}


	function animate() {
		var distance = 0;
		requestAnimationFrame( animate );

		switch(gameState.scene) {
			case "startscreen":
				scene.simulate();
				renderer.render(startScreen, startCam);
				break;
			case "level1":
				scene.simulate();
				renderer.render(levelOneScreen, startCam);
				break;
			case "level2":
				key1.position.set(-100,-100,0);
				key1.__dirtyPosition = true;
				scene.simulate();
				renderer.render(levelTwoScreen, startCam);
				break;
			case "level3":
				hint2.position.set(-100,-100,0);
				hint2.__dirtyPosition = true;
				key2.position.set(-100,-100,0);
				key2.__dirtyPosition = true;
				scene.simulate();
				renderer.render(levelThreeScreen, startCam);
				break;
			case "youwon":
				scene.simulate()
				renderer.render( endScreen, endCamera );
				break;
			case "main":
				updateAvatar();
				scene.simulate();
				if (gameState.camera!= 'none'){
					renderer.render( scene, gameState.camera );
				}
				break;
			default:
			  console.log("don't know the scene "+gameState.scene);
			}


		//DISPLAY BAR: score, health, litter, time
		if (gameState.scene != 'startscreen' && gameState.scene != 'level1' ){
			var info = document.getElementById("info");
		 info.innerHTML=
		 	'<div style="font-size:18pt">Score:  ' + gameState.score +
		 	'         Health:  ' + gameState.health +
		 	'         Litter Picked Up:  ' + gameState.litterScore +
		 	'         Time:  ' + Math.trunc(screenClock.getElapsedTime()) + '</div>' ;
		}
	}
