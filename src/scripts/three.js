import { browser } from '$app/environment'
import * as THREE from 'three'
import { EffectComposer, GLTFLoader, OrbitControls, RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js'

if(browser) {
    const scene = new THREE.Scene()
    const canvas = document.getElementById('canvas')
 
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    const renderer = new THREE.WebGLRenderer()
    const orbit = new OrbitControls(camera, renderer.domElement)
    orbit.enablePan = false

    camera.position.y = 25
    camera.rotation.x = -0.5

    renderer.setSize(window.innerWidth, window.innerHeight)
    
    document.body.append(renderer.domElement)

    scene.add (
        new THREE.AmbientLight(0xfffff, 1)
    )

    // 3D model loader
    const loader = new GLTFLoader()

    let sun

    loader.load('/models/sun/scene.gltf', (gltf) => {
        sun = gltf.scene
        sun.name = 'sun'
        scene.add(sun)
    })

    // Post Processing

    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const glow = new UnrealBloomPass(new THREE.Vector2(
        window.innerWidth, window.innerHeight,),
    0.3, 0.2, 0.05)
    composer.addPass(glow)

    function animate() {
        renderer.render(scene, camera)
        orbit.update()
        const theSun = scene.getObjectByName('sun')
        if(theSun) {
            theSun.rotation.z += 0.001
        }
        composer.render()
        requestAnimationFrame(animate)
    }

    animate()
}