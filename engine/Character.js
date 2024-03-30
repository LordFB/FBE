import { Terrain } from './Terrain.js';

export class Character {
    constructor(input, gameObject) {
        this.input = input;
        this.gameObject = gameObject;
        this.dirs = { x: 0, y: 0 };
        //this.gameObject.position.y = terrain.getHeightAt(this.gameObject.transform.position.x,this.gameObject.position.z);
    }
    update(dt) {
        let speed = 1 / dt;
        if (this.input.isKeyPressed('shift')) speed *= 4;
        if (this.input.isKeyPressed('w')) {
            this.dirs.y = -1;
            this.gameObject.transform.position.z += speed;
        }
        if (this.input.isKeyPressed('s')) {
            this.gameObject.transform.position.z -= speed;
            this.dirs.y = 1;
        }
        if (this.input.isKeyPressed('a')) {
            this.gameObject.transform.position.x -= speed;
            this.dirs.x = 1;
        }
        if (this.input.isKeyPressed('d')) {
            this.gameObject.transform.position.x += speed;
            this.dirs.x = -1;
        }
        this.dirs = { x: 0, y: 0 };
    }
}