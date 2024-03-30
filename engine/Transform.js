import { Vector3 } from "./Vector3.js";

export class Transform {
    constructor(position = new Vector3(), rotation = new Vector3(), scale = new Vector3(1, 1, 1)) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    // Translate the transform by a vector
    translate(translation) {
        this.position = this.position.add(translation);
    }

    // Rotate the transform around the X axis by an angle (in radians)
    rotateX(angle) {
        this.rotation.x += angle;
    }

    // Rotate the transform around the Y axis by an angle (in radians)
    rotateY(angle) {
        this.rotation.y += angle;
    }

    // Rotate the transform around the Z axis by an angle (in radians)
    rotateZ(angle) {
        this.rotation.z += angle;
    }

    // Return a copy of the transform
    clone() {
        return new Transform(this.position.clone(), this.rotation.clone(), this.scale.clone());
    }

    // String representation of the transform
    toString() {
        return `Position: ${this.position}, Rotation: ${this.rotation}, Scale: ${this.scale}`;
    }
}
