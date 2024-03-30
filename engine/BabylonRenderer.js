import '../lib/babylon.max.js'

export class BabylonRenderer {
    constructor(canvasId) {
        this.engine = new BABYLON.Engine(document.getElementById(canvasId), true);;
        this.canvasId = canvasId;
        this.scene = null;
        this.camera = null;
        this.setupBabylon();
    }

    // Setup Babylon.js
    setupBabylon() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogDensity = 0.005;
        this.scene.clearColor = new BABYLON.Color3(0.65, 0.65, 0.85);
        this.scene.fogColor = new BABYLON.Color3(0.65, 0.65, 0.85);
        var light = new BABYLON.HemisphericLight("Omni0", new BABYLON.Vector3(0, 10, 0), this.scene);
        this.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), this.scene);
        this.camera.setTarget( new BABYLON.Vector3(0,0,5));
        this.camera.attachControl(document.getElementById(this.canvasId), false);
    }

    // Render loop
    render() {
        this.scene.render();
    }

    // Render a single game object
    renderGameObject(gameObject) {
        const renderComponent = gameObject.getComponent(Render3D);
        if (renderComponent) {
            // Your rendering logic using Babylon.js goes here
            // For example:
            const mesh = renderComponent.mesh;
            if (mesh) {
                mesh.position = renderComponent.position;
                mesh.rotation = renderComponent.rotation;
                mesh.scaling = renderComponent.scale;
            }
        }
    }
    static getInstance(canvasId){
        if ( !this.instance ) this.instance = new BabylonRenderer(canvasId);
        return this.instance;
    }
}