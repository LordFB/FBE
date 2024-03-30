export class Sinus{
    constructor(gameObject){
        this.gameObject = gameObject;
        this.startPos = gameObject.transform.position;
        this.i = 0;
    }
    update(dt){
        this.gameObject.transform.position.x = this.startPos.x + Math.sin(this.i / dt) * 0.1;
        this.i++;
    }
}