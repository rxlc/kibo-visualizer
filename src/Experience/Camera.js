import * as THREE from 'three';
import Experience from "./Experience";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';

export default class Camera {
    constructor() {
        this.experience = new Experience();

        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.world = this.experience.world

        this.canvasReady = false;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
        this.instance.position.set(4.45, 7, -0.52);
        this.scene.add(this.instance);
    }

    setOrbit() {
        this.controls = new OrbitControls(this.instance, this.experience.containerRef.current);
        this.controls.target = new THREE.Vector3(10.925, 4.945, -8.1)
        this.controls.enableDamping = true;
    }

    update() {
        if (this.experience.renderer.instance && this.canvasReady == false) {
            this.setOrbit();
            this.controls.domElement.style.width = `${this.experience.renderer.instance.domElement.clientWidth}px`
            this.controls.domElement.style.height = `${this.experience.renderer.instance.domElement.clientHeight}px`
            this.canvasReady = true;
        }

        this.sizes.on('resize', () => {
            this.resize();
        });

        if (this.canvasReady) {
            this.controls.update();
        }
    }

    resize() {
        this.controls.domElement.style.width = `${this.experience.renderer.instance.domElement.clientWidth}px`
        this.controls.domElement.style.height = `${this.experience.renderer.instance.domElement.clientHeight}px`
        this.instance.aspect = this.sizes.width/this.sizes.height
        this.instance.updateProjectionMatrix();
    }


}