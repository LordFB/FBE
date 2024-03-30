export class Render3D {
    constructor(mesh, gameObject) {
      this.mesh = mesh;
      this.gameObject = gameObject;
    }
  
    // Update mesh position, rotation, and scale based on parent's Transform component
    update() {
      const transform = this.gameObject.transform;
      if (transform) {
        this.mesh.position.x = this.gameObject.transform.position.x;
        this.mesh.position.y = this.gameObject.transform.position.y;
        this.mesh.position.z = this.gameObject.transform.position.z;
        //this.mesh.rotation = transform.rotation;
        //this.mesh.scaling = transform.scale;
      }
    }
  }
  