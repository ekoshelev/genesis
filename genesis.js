
/*
Final Project
Team 21

Last modified 25 April 2018
*/

	//Start Screen Variables
	var startScreen, startCam;

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

	//Other
	var controls =
	     {fwd:false, bwd:false, left:false, right:false,
				speed:10, fly:false, reset:false,
		    camera:camera}

	// initial game state
	var gameState =
	     {litterScore:0, health:10, scene:'startscreen', camera:'startCam' }


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
		Physijs.scripts.worker = '/js/physijs_worker.js';
		Physijs.scripts.ammo = '/js/ammo.js';
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
		var oneBackground = initPlaneMesh('startlevel1.png');	// transition screen
		oneBackground.scale.set(250,120,1);
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
		initTextMesh('Level One: \nThe Wasteland', levelOneScreen, 0x8B0000);
		console.log("added textMesh to scene");
		//CAMERA
		startCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
		startCam.position.set(0,0,50);
		startCam.lookAt(0,0,0);
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
			var ground = createGround('wasteldgrnd.jpg');
			scene.add(ground);
			var skybox = createSkyBox('wasteland.jpg',1);
			scene.add(skybox);
			// AVATAR CAMERA
			avatarCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
			// ADD OBJECTS
			addBalls(20);
			addCubes(30);
			addToxicWaste(80);
			avatar = createAvatar();
			avatar.position.set(0,40,0);
			scene.add(avatar);
			gameState.camera = avatarCam;
	}


		//RENDER LEVEL 2: REGENESIS
		function levelTwoScreen(){
			levelTwoScreen = initScene();
			var twoBackground = initPlaneMesh('startlevel2.png');		// transition screen
			twoBackground.scale.set(250,120,1);
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
			initTextMesh('Level Two: \nRegenesis', levelTwoScreen, 0x336633);
			console.log("added textMesh to scene");
			//CAMERA
			startCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
			startCam.position.set(0,0,50);
			startCam.lookAt(0,0,0);
		}

		//RENDER LEVEL 3: PARADISE
		function levelThreeScreen(){
			levelThreeScreen = initScene();
			var threeBackground = initPlaneMesh('startlevel3-03.png');		// transition screen
			threeBackground.scale.set(250,120,1);
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
			initTextMesh('Level Three: \n Paradise', levelThreeScreen, 0x336633);
			console.log("added textMesh to scene");
			//CAMERA
			startCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
			startCam.position.set(0,0,50);
			startCam.lookAt(0,0,0);
		}

		//RENDER END OF LEVEL SCREEN
		function createEndScene(img){
			endScreen = initScene();
			var endBackground = initPlaneMesh(img);
			endBackground.scale.set(250,120,1);
			endBackground.position.set(0,0,0);
			endScreen.add(endBackground);
			var light1 = createPointLight();
			var light2 = createPointLight();
			light1.position.set(10,0,150);
			light2.position.set(-10,0,150);
			endScreen.add(light1);
			endScreen.add(light2);
			initTextMesh('You won!', endScreen, 0xe5e5ff);
			console.log("added textMesh to scene");
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
		function addRings(numRings){
			for (i=0;i<numRings;i++){
				var ring = createRingMesh(1,0.5);
				ring.position.set(randN(115)-50,20,randN(115)-40);
				scene.add(ring);
				// when collided with, the enemy/npc is teleported to a new location away
				//from the avatar (like a protection object)
				ring.addEventListener('collision',
				function( other_object, relative_velocity, relative_rotation, contact_normal ){
					if (other_object == avatar) {
						console.log("avatar picked up 1 litter");
						soundEffect('good.wav');
						gameState.litterScore += 1;
						// Get rid of the cube once collision occurs
						this.position.y = this.position.y - 100;
						this.__dirtyPosition = true;
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

						}
					}
				)
			}
		}


		//ADD LITTER, TYPE 3
		function addBalls(numBalls){
			for(i=0;i<numBalls;i++){
				var ball = createBall();
				ball.position.set(randN(115)-50,20,randN(115)-40);
				scene.add(ball);
				ball.addEventListener( 'collision',
					function( other_object, relative_velocity, relative_rotation, contact_normal ) {
						if (other_object==avatar){
							console.log("avatar picked up 1 litter");
							soundEffect('good.wav');
							gameState.litterScore += 1;  // Score goes up by 1
							// Make the ball drop below the scene
							//(Threejs doesn't let us remove it from the scene)
							this.position.y = this.position.y - 100;
							this.__dirtyPosition = true;
						}
					}
				)
			}
		}


		//ADD LITTER, TYPE 4 -- NEVER USED
		function addIcos(numIco){ // specify the number of litter, type 4 to add to scene
			for(i=0;i<numIco;i++){
				var ico = createIcosahedron();
				ico.position.set(randN(115)-50,20,randN(115)-40);
				scene.add(ico);
				ico.addEventListener( 'collision',
					function( other_object, relative_velocity, relative_rotation, contact_normal ) {
						if (other_object==avatar){
							console.log("avatar picked up 1 litter");
							soundEffect('good.wav');
							gameState.litterScore += 1;  // Score goes up by 1
							//(Threejs doesn't let us remove it from the scene)
							this.position.y = this.position.y - 100;
							this.__dirtyPosition = true;
						}
					}
				)
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
			key1.position.set(20,2,20);
			key1.addEventListener('collision',
			function( other_object, relative_velocity, relative_rotation, contact_normal ){
				if (other_object == avatar) {
					gameState.scene = 'level2';
				}
			}
		)

			scene.add(key1);
	}

			function initKeyLevelTwo(){
				var geometry = new THREE.DodecahedronGeometry(0.5,0);
				var material = new THREE.MeshLambertMaterial( { color: 0x009999 } );
				var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
				key2 = new Physijs.BoxMesh( geometry, pmaterial, 0 )
				key2.position.set(20,2,20);
				key2.addEventListener('collision',
				function( other_object, relative_velocity, relative_rotation, contact_normal ){
					if (other_object == avatar) {
						gameState.scene = 'level3';
					}
				}
			)

				scene.add(key2);
		}

			function initKeyLevelThree(){
				var geometry = new THREE.DodecahedronGeometry(0.5,0);
				var material = new THREE.MeshLambertMaterial( { color: 0x009999 } );
				var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
				key3 = new Physijs.BoxMesh( geometry, pmaterial, 0 )
				key3.position.set(20,2,20);
				key3.addEventListener('collision',
				function( other_object, relative_velocity, relative_rotation, contact_normal ){
					if (other_object == avatar) {
						gameState.scene = 'youwon';
					}
				}
			)

				scene.add(key3);
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
			//var geometry = new THREE.SphereGeometry( 4, 20, 20);
			var geometry = new THREE.BoxGeometry( 1, 1, 1);
			var material = new THREE.MeshLambertMaterial( { color: 0x9ca175} );
			var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
			var mesh = new Physijs.BoxMesh( geometry, material );
			mesh.setDamping(0.1,0.1);
			mesh.castShadow = true;
			return mesh;
		}


	//AUDIO FUNCTIONS

	//MUSIC
	function playGameMusic(){
		// Create an AudioListener and add it to the camera
		var listener = new THREE.AudioListener();
		camera.add( listener );

		// Create a global audio source
		var sound = new THREE.Audio( listener );

		// Load a sound and set it as the Audio object's buffer
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/sounds/loop.mp3', function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( true );
			sound.setVolume( 0.05 );
			sound.play();
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
		//console.dir(event);\

		// first we handle the "play again" key in the "youwon" scene
		if ((gameState.scene == 'youwon' && event.key=='r') ||
				(gameState.scene == 'youlose' && event.key=='r')) {
			gameState.scene = 'main';
			gameState.score = 0;
			gameState.health = 10;
			enemy.position.set(randN(20),30,randN(20));
			addBalls(20);
			addCubes(30);
			addRings(100);
			return;
		}else if (gameState.scene == 'startscreen' && event.key=='p') {
			gameState.scene = 'level1';
			return;
		}else if (gameState.scene == 'level1' && event.key=='p') {
			createClock();
			screenClock.start();
			gameState.scene = 'main';
			gameState.score = 0;
			gameState.health = 10;
			addBalls(20);
			addCubes(30);
			addRings(100);
			initKeyLevelOne();
			return;
		}else if (gameState.scene == 'level2' && event.key=='p') {
			createClock();
			screenClock.start();
			gameState.scene = 'main';
			gameState.score = 0;
			gameState.health = 10;
			addBalls(20);
			addCubes(30);
			addRings(100);
			initKeyLevelTwo();
			return;
		}else if (gameState.scene == 'level3' && event.key=='p') {
			createClock();
			screenClock.start();
			gameState.scene = 'main';
			gameState.score = 0;
			gameState.health = 10;
			addBalls(20);
			addCubes(30);
			addRings(100);
			initKeyLevelThree();
			return;
		}else if (gameState.scene == 'youwon') {
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
			case "r": avatar.rotation.set(0,0,0); avatar.__dirtyRotation=true;
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
				scene.simulate();
				renderer.render(levelTwoScreen, startCam);
				break;
			case "level3":
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
		 	'<div style="font-size:24pt">Score:  ' + gameState.score +
		 	'         Health:  ' + gameState.health +
		 	'         Litter Picked Up:  ' + gameState.litterScore +
		 	'         Time:  ' + Math.trunc(screenClock.getElapsedTime()) + '</div>' ;
		}
	}
