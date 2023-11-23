import * as THREE from "../three.js/three.js/build/three.module.js"
import { OrbitControls } from '../three.js/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../three.js/three.js/examples/jsm/loaders/GLTFLoader.js'
import { FontLoader } from '../three.js/three.js/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../three.js/three.js/examples/jsm/geometries/TextGeometry.js';

let scene, cam, renderer, controls
let width = window.innerWidth
let height = window.innerHeight
let cam1, cam2
let camera
let Spotlight
let day, night
let peaShooterProjectile, speed
let Exit = false;
let loader = new GLTFLoader()
let floader = new FontLoader()


const initCam = () => {
    let aspect = width/height
    let fov = 45
    cam = new THREE.PerspectiveCamera(fov, aspect)
    cam.position.set(0, 15, 55)
    cam.lookAt(0, 0, 0)

    cam1 = new THREE.PerspectiveCamera(fov, aspect)
    cam1.position.set(0, 15, 55)
    cam1.lookAt(0, 7, 0)

    cam2 = new THREE.PerspectiveCamera(fov, aspect)
    cam2.position.set(-50, 15, 0)
    cam2.lookAt(0, 15, 0)

    camera = cam
}

const initScene = () => {
    scene = new THREE.Scene()
}

const initRenderer = () => {
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)
    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 7, 0)
}

const initSky = () => {
    day = new THREE.CubeTextureLoader()
    .load([
        "../Assets/cloudy/bluecloud_ft.jpg",
        "../Assets/cloudy/bluecloud_bk.jpg",
        "../Assets/cloudy/bluecloud_up.jpg",
        "../Assets/cloudy/bluecloud_dn.jpg",
        "../Assets/cloudy/bluecloud_rt.jpg",
        "../Assets/cloudy/bluecloud_lf.jpg"
    ])

    night = new THREE.CubeTextureLoader()
    .load([
        "../Assets/nightskycolor.png",
        "../Assets/nightskycolor.png",
        "../Assets/nightskycolor.png",
        "../Assets/nightskycolor.png",
        "../Assets/nightskycolor.png",
        "../Assets/nightskycolor.png"
    ])

    scene.background = day
}

const createZombie = () => {
    loader.load("../Assets/zombie/scene.gltf", function(GLTF) {
        let zombie = GLTF.scene
        zombie.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        zombie.position.set(10, 0, 0)
        zombie.scale.set(60, 60, 60)
        zombie.rotateY(-Math.PI/4)
        zombie.receiveShadow = true
        zombie.castShadow = true
        zombie.name = "zombie"
        scene.add(zombie)
    })
}

const createFence = () => {
    loader.load("../Assets/fence/scene.gltf", function(GLTF){
        let fence = GLTF.scene
        fence.traverse(function(child){
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        fence.position.set(-40, 8.5, -44)
        fence.scale.set(10, 10, 10)
        fence.receiveShadow = true
        fence.castShadow = true
        scene.add(fence)
    })

    loader.load("../Assets/fence/scene.gltf", function(GLTF){
        let fence = GLTF.scene
        fence.traverse(function(child){
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        fence.position.set(-20, 8.5, -44)
        fence.scale.set(10, 10, 10)
        fence.receiveShadow = true
        fence.castShadow = true
        scene.add(fence)
    })

    loader.load("../Assets/fence/scene.gltf", function(GLTF){
        let fence = GLTF.scene
        fence.traverse(function(child){
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        fence.position.set(0, 8.5, -44)
        fence.scale.set(10, 10, 10)
        fence.receiveShadow = true
        fence.castShadow = true
        scene.add(fence)
    })

    loader.load("../Assets/fence/scene.gltf", function(GLTF){
        let fence = GLTF.scene
        fence.traverse(function(child){
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        fence.position.set(20, 8.5, -44)
        fence.scale.set(10, 10, 10)
        fence.receiveShadow = true
        fence.castShadow = true
        scene.add(fence)
    })

    loader.load("../Assets/fence/scene.gltf", function(GLTF){
        let fence = GLTF.scene
        fence.traverse(function(child){
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        fence.position.set(40, 8.5, -44)
        fence.scale.set(10, 10, 10)
        fence.receiveShadow = true
        fence.castShadow = true
        scene.add(fence)
    })
}

const createText = () => {
    floader.load("../three.js/three.js/examples/fonts/gentilis_bold.typeface.json", (Font) => {
        let geo = new TextGeometry("Plant NO Zombie", {
            size: 10,
            height: 2,
            font: Font
        })
        let mat = new THREE.MeshPhongMaterial({color: 0xCCB7B6})
        let mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(-55, 20, -50)
        scene.add(mesh)
    })
}

const render = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
    controls.update()
    updateProjectile()
}

const createPlane = () => {
    let geo = new THREE.PlaneGeometry(100, 75)
    let loader = new THREE.TextureLoader()
    let texture = loader.load("../Assets/grass.png")
    let mat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide
    })
    let mesh = new THREE.Mesh(geo, mat)
    mesh.rotateX(-Math.PI/2)
    mesh.position.set(0, 0, -7,5)
    mesh.receiveShadow = true
    scene.add(mesh)
}

const createHead = () => {
    let geo = new THREE.SphereGeometry(2.5, 64)
    let mat = new THREE.MeshPhongMaterial({color: 0x52D017})
    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-30, 10, 0)
    mesh.castShadow = true
    mesh.name = "Head"
    scene.add(mesh)
}

const createBody = () => {
    let geo = new THREE.CylinderGeometry(0.75, 0.75, 10, 64, 64, Boolean)
    let mat = new THREE.MeshPhongMaterial({color: 0x4BBF15})
    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-30, 5, 0)
    mesh.castShadow = true
    scene.add(mesh)
}

const createEye1 = () => {
    let geo = new THREE.SphereGeometry(0.5, 64)
    let mat = new THREE.MeshPhongMaterial({color: 0x000000})
    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-28.5, 11, -1.5)
    mesh.castShadow = true
    scene.add(mesh)
}

const createEye2 = () => {
    let geo = new THREE.SphereGeometry(0.5, 64)
    let mat = new THREE.MeshPhongMaterial({color: 0x000000})
    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-28.5, 11, 1.5)
    mesh.castShadow = true
    scene.add(mesh)
}

const createMouth = () => {
    let geo = new THREE.CylinderGeometry(0.5, 1, 2.5, 64, 64, Boolean)
    let mat = new THREE.MeshPhongMaterial({color: 0x52D017, side: THREE.DoubleSide})
    let mesh = new THREE.Mesh(geo, mat)
    mesh.rotateZ(Math.PI/2)
    mesh.position.set(-26.5, 10, 0)
    mesh.castShadow = true
    scene.add(mesh)
}

const createTop = () => {
    let geo = new THREE.ConeGeometry(1, 2.5, 64)
    let mat = new THREE.MeshPhongMaterial({color: 0x43B000})
    let mesh = new THREE.Mesh(geo, mat)
    mesh.rotateZ(Math.PI/3.5)
    mesh.position.set(-32.5, 12, 0)
    mesh.castShadow = true
    scene.add(mesh)
}

const createWall = () => {
    let geo = new THREE.CylinderGeometry(4.5, 4.5, 3, 64, 64)
    let loader = new THREE.TextureLoader()
    let texture = loader.load("../Assets/wallnut.jpeg")
    let mat = new THREE.MeshPhongMaterial({map: texture})
    let mesh = new THREE.Mesh(geo, mat)
    mesh.rotateZ(Math.PI/2)
    mesh.position.set(-17.5, 4.5, 0)
    mesh.castShadow = true
    scene.add(mesh)
}

const createAmbientLight = () =>{
    let light = new THREE.AmbientLight(0xFFFFFC, 0.5);
    light.position.set(0,0,0)
    scene.add(light);
}

const createSpotlight = () => {
    Spotlight = new THREE.SpotLight(0xFFFFFF, 1.2);
    Spotlight.position.set(-80, 40, 20)
    Spotlight.castShadow = true;
    scene.add(Spotlight)
}

const createProjectile = () => {
    let geo = new THREE.SphereGeometry(1, 64)
    let mat = new THREE.MeshPhongMaterial({color: 0x52D017})
    peaShooterProjectile = new THREE.Mesh(geo, mat)
    peaShooterProjectile.position.set(-27, 10, 0)
    scene.add(peaShooterProjectile)
    speed = 0.5
}

const updateProjectile = () => {
    if (peaShooterProjectile) {
        peaShooterProjectile.translateX(speed);

        let raycast = new THREE.Raycaster(peaShooterProjectile.position, new THREE.Vector3(1, 0, 0));

        let zombie = scene.getObjectByName("zombie");

        if (zombie) {
            let intersect = raycast.intersectObject(zombie);

            
            if (intersect.length > 0) {
                reset();
                return;
            }
        }

        let traveled = peaShooterProjectile.position.distanceTo(new THREE.Vector3(-27, 10, 0));
        if (traveled > 37) {
            reset();
            return;
        }
    }
};

const reset = () => {
    scene.remove(peaShooterProjectile)
    peaShooterProjectile = null
    Exit = false
}

document.addEventListener("keydown", (event) => {
    if (event.key == "c") {
        if (camera === cam) {
            camera = cam1
        } else if (camera === cam1) {
            camera = cam2
        } else {
            camera = cam
        }
    }
})

document.addEventListener("keydown", (event) => {
    if (event.code == "Space") {
        if (Spotlight.intensity == 1.2) {
            Spotlight.intensity = 0.5
            scene.background = night
        } else {
            Spotlight.intensity = 1.2
            scene.background = day
        }
    }
})

document.addEventListener("mousedown", (event) => {
    let raycast = new THREE.Raycaster()
    let mouse = new THREE.Vector2()

    mouse.x = (event.clientX / width) * 2 - 1
    mouse.y = -(event.clientY / height) * 2 + 1

    raycast.setFromCamera(mouse, camera)

    let intersect = raycast.intersectObject(scene.getObjectByName("Head"))
    let intersectZombie = raycast.intersectObject(scene.getObjectByName("zombie"))

    if (intersect.length > 0 && !Exit) {
        createProjectile()
        Exit = true
    }

    if (intersectZombie.length > 0) {
        console.log("click!")
        reset()
    }
})

window.onload = () => {
    initCam()
    initRenderer()
    initScene()
    initSky()

    createZombie()
    createFence()
    createPlane()
    createHead()
    createBody()
    createEye1()
    createEye2()
    createMouth()
    createText()
    createTop()
    createWall()
    createProjectile()

    createAmbientLight()
    createSpotlight()

    render()
}


window.onresize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;


    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}



