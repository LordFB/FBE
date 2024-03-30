export { Vector2 } from './Vector2.js';
export { Vector3 } from './Vector3.js';
export { Transform } from './Transform.js';
export { GameObject } from './GameObject.js';
export { Input } from './Input.js';

export { Sinus } from './Sinus.js';
export { Character } from './Character.js';
export { Terrain } from './Terrain.js';

export { BabylonRenderer } from './BabylonRenderer.js';
export { Render3D } from './Render3D.js';

export class Engine {
    constructor() {
        this.gameObjects = [];
        this.lastFrameTime = 0;
        this.frameRequestId = null;
        this.isRunning = false;
        this.onLoop = null;
    }

    // Start the engine
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastFrameTime = performance.now();
        this.frameRequestId = requestAnimationFrame(this.update.bind(this));
    }

    // Stop the engine
    stop() {
        if (!this.isRunning) return;
        cancelAnimationFrame(this.frameRequestId);
        this.isRunning = false;
    }

    // Add a game object to the engine
    addGameObject(gameObject) {
        let go = new GameObject(gameObject);
        this.gameObjects.push( go );
        return go;
    }

    // Remove a game object from the engine
    removeGameObject(gameObject) {
        const index = this.gameObjects.indexOf(gameObject);
        if (index !== -1) {
            this.gameObjects.splice(index, 1);
        }
    }

    // Update loop
    update(currentTime) {
        const deltaTime = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;


        // Update all game objects
        this.gameObjects.forEach(gameObject => {
            gameObject.update(deltaTime);
        });

        if (this.render) this.render();
        // Request next frame
        this.frameRequestId = requestAnimationFrame(this.update.bind(this));
    }
    static getInstance(){
        if ( !this.instance ){
            this.instance = new Engine();
        }
        return this.instance;
    }
}
