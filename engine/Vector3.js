export class Vector3 {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    // Addition of two vectors
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    // Subtraction of two vectors
    subtract(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    // Scalar multiplication
    multiply(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    // Dot product of two vectors
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    // Cross product of two vectors
    cross(v) {
        return new Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    // Magnitude (length) of the vector
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    // Normalize the vector (returning a unit vector)
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector3();
        }
        return new Vector3(this.x / mag, this.y / mag, this.z / mag);
    }

    // Angle between two vectors
    angleTo(v) {
        const dot = this.dot(v);
        const mag1 = this.magnitude();
        const mag2 = v.magnitude();
        const cosTheta = dot / (mag1 * mag2);
        return Math.acos(cosTheta);
    }

    // Return a copy of the vector
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    // String representation of the vector
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}
