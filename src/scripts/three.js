import { browser } from '$app/environment'
import * as THREE from 'three'

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

    renderer.setSize(window.innerWidth, window.innerHeight)
    
    document.body.append(renderer.domElement)

    function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }

    animate()
}