
/*
PA03 - MVP
*/

	// First we declare the variables that hold the objects we need
	// in the animation code
	var scene, renderer;  // all threejs programs need these
	var camera, avatarCam;  // we have two cameras in the main scene
	var avatar;
	var enemy;
	// here are some mesh objects ...

	var cone;

	var screenClock;

	var endScene, endCamera, endText, endScene2;

	var startScreen, startMesh, startCam;

	var controls =
	     {fwd:false, bwd:false, left:false, right:false,
				speed:10, fly:false, reset:false,
		    camera:camera}

	var gameState =
	     {score:0, health:10, scene:'startscreen', camera:'startCam' }

	// Here is the main game control
  init(); //
	initControls();
	animate();  // start the animation loop!

	function createStartScreen(){
		startScreen = initScene();
		startText = initPlaneMesh('startscreen.png');
		startScreen.add(startText);
		startText.scale.set(150,60,1);
		startText.position.set(-15,20,-20);
		startText.rotateY(0.64);
		startScreen.add(startText);
		var startLight = createPointLight();
		startLight.position.set(-5,20,40);
		var startLight2 = createPointLight();
		startLight2.position.set(30,20,50);
		startScreen.add(startLight);
		startScreen.add(startLight2);
		startCam = new THREE.PerspectiveCamera( 57, window.innerWidth / window.innerHeight*1.8, 0.1, 1000 );
		startCam.position.set(15,20,20);
		startCam.lookAt(0,20,0);
	}

	function createEndScene(){
		endScene = initScene();
		endText = createSkyBox('youwon.png',10);
		//endText.rotateX(Math.PI);
		endScene.add(endText);
		var light1 = createPointLight();
		light1.position.set(0,200,20);
		endScene.add(light1);
		endCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
		endCamera.position.set(0,50,1);
		endCamera.lookAt(0,0,0);

	}

	function createEndScene2(){
		endScene2 = initScene();
		endText2 = createSkyBox('gameover.png', 5);
		endScene2.add(endText2);
		var light1 = createPointLight();
		light1.position.set(0,200,20);
		endScene2.add(light1);
		endCamera = new THREE.PerspectiveCamera(90,window.innerWidth / window.innerHeight, 0.1, 1000);
		endCamera.position.set(0,50,1);
		endCamera.lookAt(0,0,0);
		endScene2.addEventListener('keyup')
	}

	/**
	  To initialize the scene, we initialize each of its components
	*/
	function init(){
      initPhysijs();
			createStartScreen();
			scene = initScene();
			createEndScene();
			createEndScene2();
			initRenderer();
			createMainScene();
	}


	function createMainScene(){
      // setup lighting
			var light1 = createPointLight();
			light1.position.set(0,200,20);
			scene.add(light1);
			var light0 = new THREE.AmbientLight( 0xffffff,0.25);
			scene.add(light0);

			// create main camera
			camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
			camera.position.set(0,50,0);
			camera.lookAt(0,0,0);



			// create the ground and the skybox
			var ground = createGround('wasteldgrnd.jpg');
			scene.add(ground);
			var skybox = createSkyBox('wasteland.jpg',1);
			scene.add(skybox);

			// create the avatar camera
			avatarCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
			/*avatar = createAvatar();
			avatar.translateY(20);
			avatarCam.translateY(-4);
			avatarCam.translateZ(3);
			//scene.add(avatar);
			gameState.camera = avatarCam;*/
			initMonkeyAvatar();
			//initMonkeyCheerleader();
			//initEnemy();
			addBalls();
			addCubes();
			//playGameMusic();

	}

	function createClock(){
		screenClock = new THREE.Clock();
	}


	function randN(n){
		return Math.random()*n;			scene.add(avatar);
	}

// function to add rinigs to the scene that, when collided with, the enemy/npc is teleported
// to a new location away from the avatar (like a protection object)
	function addRings(){
		var numRings = 6;
		for (i=0;i<numRings;i++){
			var ring = createRingMesh(1,0.5);
			ring.position.set(randN(20)+15,30,randN(20)+15);
			scene.add(ring);

			ring.addEventListener('collision',

				function( other_object, relative_velocity, relative_rotation, contact_normal ){
					if (other_object == avatar) {
						enemy.position.set(randN(20)+15,30,randN(20)+15);
						enemy.__dirtyPosition = true;
						// get rid of the cone once collision occurs
						this.position.y = this.position.y - 100;
						this.__dirtyPosition = true;

					}
				}
			)
		}
	}

// function to add cubes to scene that when collided with, the avatar gains a
// health point
function addCubes(){
	var numCubes = 3

	for (i=0;i<numCubes;i++){
		var cube = createCube();
		cube.position.set(randN(20)+15,30,randN(20)+15);
		scene.add(cube);

		cube.addEventListener('collision',

			function( other_object, relative_velocity, relative_rotation, contact_normal ){
				if (other_object == avatar) {
					gameState.health += 1;

					// get rid of the cube once collision occurs
					this.position.y = this.position.y - 100;
					this.__dirtyPosition = true;

				}
			}
		)
	}
}


	function addBalls(){
		var numBalls = 2


		for(i=0;i<numBalls;i++){
			var ball = createBall();
			ball.position.set(randN(20)+15,30,randN(20)+15);
			scene.add(ball);

			ball.addEventListener( 'collision',
				function( other_object, relative_velocity, relative_rotation, contact_normal ) {
					if (other_object==cone){
						console.log("ball "+i+" hit the cone");
						soundEffect('good.wav');
						gameState.score += 1;  // add one to the score
						if (gameState.score==numBalls) {
							gameState.scene='youwon';
						}
						// make the ball drop below the scene ..
						// threejs doesn't let us remove it from the schene...
						this.position.y = this.position.y - 100;
						this.__dirtyPosition = true;
					}
				}
			)
		}
	}


	function initPlaneMesh(image){
			// creating a textured plane which receives shadows
			var geometry = new THREE.PlaneGeometry( 1, 1, 128);
			var texture = new THREE.TextureLoader().load( '../images/' +image );
			var material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa,  map: texture ,side:THREE.DoubleSide} );
			planeMesh = new THREE.Mesh( geometry, material );
			return planeMesh;
		}


	function playGameMusic(){
		// create an AudioListener and add it to the camera
		var listener = new THREE.AudioListener();
		camera.add( listener );

		// create a global audio source
		var sound = new THREE.Audio( listener );

		// load a sound and set it as the Audio object's buffer
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/sounds/loop.mp3', function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( true );
			sound.setVolume( 0.05 );
			sound.play();
		});
	}

	function soundEffect(file){
		// create an AudioListener and add it to the camera
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

	function initScene(){
		//scene = new THREE.Scene();
    var scene = new Physijs.Scene();
		return scene;
	}

  function initPhysijs(){
    Physijs.scripts.worker = '/js/physijs_worker.js';
    Physijs.scripts.ammo = '/js/ammo.js';
  }
	/*
		The renderer needs a size and the actual canvas we draw on
		needs to be added to the body of the webpage. We also specify
		that the renderer will be computing soft shadows
	*/
	function initRenderer(){
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight-50 );
		document.body.appendChild( renderer.domElement );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}

	function createPointLight(){
		var light;
		light = new THREE.PointLight( 0xffffff);
		light.castShadow = true;
		//Set up shadow properties for the light
		light.shadow.mapSize.width = 2048;  // default
		light.shadow.mapSize.height = 2048; // default
		light.shadow.camera.near = 0.5;       // default
		light.shadow.camera.far = 500      // default
		return light;
	}



	function createBoxMesh(color){
		var geometry = new THREE.BoxGeometry( 1, 1, 1);
		var material = new THREE.MeshLambertMaterial( { color: color} );
		mesh = new Physijs.BoxMesh( geometry, material );
    //mesh = new Physijs.BoxMesh( geometry, material,0 );
		mesh.castShadow = true;
		return mesh;
	}



	function createGround(image){
		// creating a textured plane which receives shadows
		var geometry = new THREE.PlaneGeometry( 180, 180, 128 );
		var texture = new THREE.TextureLoader().load( '../images/'+image );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 15, 15 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
		//var mesh = new THREE.Mesh( geometry, material );
		var mesh = new Physijs.BoxMesh( geometry, pmaterial, 0 );

		mesh.receiveShadow = true;

		mesh.rotateX(Math.PI/2);
		return mesh
		// we need to rotate the mesh 90 degrees to make it horizontal not vertical
	}



	function createSkyBox(image,k){
		// creating a textured plane which receives shadows
		var geometry = new THREE.SphereGeometry( 80, 80, 80 );
		var texture = new THREE.TextureLoader().load( '../images/'+image );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( k, k );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
		//var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
		//var mesh = new THREE.Mesh( geometry, material );
		var mesh = new THREE.Mesh( geometry, material, 0 );

		mesh.receiveShadow = false;


		return mesh
		// we need to rotate the mesh 90 degrees to make it horizontal not vertical


	}
	function createAvatar(){
		//var geometry = new THREE.SphereGeometry( 4, 20, 20);
		var geometry = new THREE.BoxGeometry( 5, 5, 6);
		var material = new THREE.MeshLambertMaterial( { color: 0xffff00} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
		//var mesh = new THREE.Mesh( geometry, material );
		var mesh = new Physijs.BoxMesh( geometry, pmaterial );
		mesh.setDamping(0.1,0.1);
		mesh.castShadow = true;

		avatarCam.position.set(0,4,0);
		avatarCam.lookAt(0,4,10);
		mesh.add(avatarCam);

		return mesh;
	}

	function initMonkeyAvatar(){
		var myObjs = {};
		var loader = new THREE.JSONLoader();
		return loader.load("../models/suzanne.json",
					function ( geometry, materials ) {
						console.log("loading suzanne");
						var material = //materials[ 0 ];
						new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
						var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
						avatar = new Physijs.BoxMesh( geometry, pmaterial );
						console.log("created suzanne mesh");
						console.log(JSON.stringify(avatar.scale));// = new THREE.Vector3(4.0,1.0,1.0);
						var s = 0.5;
						avatar.scale.y=s;
						avatar.scale.x=s;
						avatar.scale.z=s;

						avatar.setDamping(0.1,0.1);
						avatar.castShadow = true;

						avatarCam.position.set(0,4,0);
						avatarCam.lookAt(0,4,10);
						avatar.add(avatarCam);

						avatar.translateY(20);
						avatarCam.translateY(-4);
						avatarCam.translateZ(3);
						scene.add(avatar);
						gameState.camera = avatarCam;
						//

					},
					function(xhr){
						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
					function(err){console.log("error in loading: "+err);}
				)

	}

	function initEnemy(){
		var geometry = new THREE.BoxGeometry( 7, 7, 7);
		var texture = new THREE.TextureLoader().load('../images/companion_cube.jpg');
		var material = new THREE.MeshLambertMaterial( { color: 0xFF4848,  map: texture ,side:THREE.DoubleSide} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
		enemy = new Physijs.BoxMesh( geometry, pmaterial );
		enemy.setDamping(0.1,0.1);
		enemy.castShadow = true;
		var s = 0.5;
		enemy.scale.y=s;
		enemy.scale.x=s;
		enemy.scale.z=s;

		enemy.position.set(randN(20),30,randN(20));

		enemy.addEventListener('collision',

			function( other_object, relative_velocity, relative_rotation, contact_normal ){
				if (other_object == avatar) {
					gameState.health -= 1;
					if (gameState.health == 0) {
						gameState.scene = 'youlose';
					}

					this.position.x = randN(25);
					this.position.y = 5;
					this.position.z = randN(25);
					this.__dirtyPosition = true;

				}
			}
		)


		scene.add(enemy);
	}


	function createRingMesh(r, t){
		var geometry = new THREE.TorusGeometry( r, t, 16, 100 );
		var material = new THREE.MeshLambertMaterial( { color: 0xB869FF } );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
		var mesh = new Physijs.BoxMesh( geometry, material );
		mesh.setDamping(0.1,0.1);
		mesh.castShadow = true;
		return mesh;
	}


	function createBall(){
		//var geometry = new THREE.SphereGeometry( 4, 20, 20);
		var geometry = new THREE.SphereGeometry( 1, 16, 16);
		var material = new THREE.MeshLambertMaterial( { color: 0xffff00} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
    var mesh = new Physijs.BoxMesh( geometry, material );
		mesh.setDamping(0.1,0.1);
		mesh.castShadow = true;
		return mesh;
	}
	function createCube(){
		//var geometry = new THREE.SphereGeometry( 4, 20, 20);
		var geometry = new THREE.BoxGeometry( 1, 1, 1);
		var material = new THREE.MeshLambertMaterial( { color: 0xffc0cb} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
		var mesh = new Physijs.BoxMesh( geometry, material );
		mesh.setDamping(0.1,0.1);
		mesh.castShadow = true;
		return mesh;
	}





	var clock;

	function initControls(){
		// here is where we create the eventListeners to respond to operations

		  //create a clock for the time-based animation ...
			clock = new THREE.Clock(false);
			clock.start();

			window.addEventListener( 'keydown', keydown);
			window.addEventListener( 'keyup',   keyup );
  }

	function keydown(event){
		console.log("Keydown:"+event.key);
		//console.dir(event);
		// first we handle the "play again" key in the "youwon" scene
		if (gameState.scene == 'youwon' && event.key=='r') {
			gameState.scene = 'main';
			gameState.score = 0;
			gameState.health = 10;
			enemy.position.set(randN(20),30,randN(20));
			addBalls();
			addCubes();
			addRings();
			return;
		} else if(gameState.scene == 'youlose' && event.key=='r'){
			gameState.scene = 'main';
			gameState.score = 0;
			gameState.health = 10;
			enemy.position.set(randN(20),30,randN(20));
			addBalls();
			addCubes();
			addRings();
			return;
		}else if (gameState.scene == 'startscreen' && event.key=='p') {
			createClock();
			screenClock.start();
			gameState.scene = 'main';
			gameState.score = 0;
			gameState.health = 10;
			enemy.position.set(randN(20),30,randN(20));
			addBalls();
			addCubes();
			addRings();
			return;
		}


		// this is the regular scene
		switch (event.key){
			// change the way the avatar is moving
			case "w": controls.fwd = true;  break;
			case "s": controls.bwd = true; break;
			case "a": controls.left = true; break;
			case "d": controls.right = true; break;
			//case "r": controls.up = true; break;
			case "f": controls.down = true; break;
			case "m": controls.speed = 30; break;
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

	function keyup(event){
		//console.log("Keydown:"+event.key);
		//console.dir(event);
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




  function updateAvatar(){
		"change the avatar's linear or angular velocity based on controls state (set by WSAD key presses)"

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

	function updateEnemy(){
		 distance = Math.sqrt(Math.pow(avatar.position.x - enemy.position.x,2) + Math.pow(avatar.position.y - enemy.position.y,2) + Math.pow(avatar.position.z - enemy.position.z,2),2);
		if (distance < 20) {
			enemy.lookAt(avatar.position);
			enemy.__dirtyPosition = true;
			enemy.setLinearVelocity(enemy.getWorldDirection().multiplyScalar(5));
		}
	}

	function updateCheerleader(){
		suzanne.lookAt(avatar.position);
	}

	function addTumbleweed(){
		var geometry = new THREE.CylinderGeometry( 5, 5, 20, 32);
		var texture = new THREE.TextureLoader().load('../images/tumbleweed.png');
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture});
		material.receiveShadow = true;

		material.rotateX(Math.PI/2);
		return material
	}

	function animate() {
		var distance = 0;
		requestAnimationFrame( animate );

		// if (screenClock.getElapsedTime() % 30 == 0){
		// 	addTumbleweed();
		// }
		switch(gameState.scene) {

			case "startscreen":
				scene.simulate();
				renderer.render(startScreen, startCam);
				break;

			case "youwon":
				screenClock.stop();
				endText.rotateY(0.005);
				renderer.render( endScene, endCamera );
				break;

			case "main":
				updateAvatar();
				//updateEnemy();

	    			scene.simulate();
				if (gameState.camera!= 'none'){
					renderer.render( scene, gameState.camera );
				}
				break;
			case "youlose":
				screenClock.stop();
				endText.rotateY(1.005);
				renderer.render(endScene2, endCamera);
				break;

			default:
			  console.log("don't know the scene "+gameState.scene);

		}

		//draw heads up display ..
		if (gameState.scene != 'startscreen'){
			var info = document.getElementById("info");
		 info.innerHTML='<div style="font-size:24pt">Score:  ' + gameState.score +
		 '         Health:  ' + gameState.health + '         Time:  ' + screenClock.getElapsedTime() + '</div>' ;
		}


	// if(gameState.health==0){
	// 	gameState.scene='youlose';
	// }


	}
