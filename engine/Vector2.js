export class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    // Addition of two vectors
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    // Subtraction of two vectors
    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    // Scalar multiplication
    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    // Dot product of two vectors
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    // Cross product of two vectors
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    // Magnitude (length) of the vector
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Normalize the vector (returning a unit vector)
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector2();
        }
        return new Vector2(this.x / mag, this.y / mag);
    }

    // Angle between two vectors
    angleTo(v) {
        const dot = this.dot(v);
        const mag1 = this.magnitude();
        const mag2 = v.magnitude();
        const cosTheta = dot / (mag1 * mag2);
        return Math.acos(cosTheta);
    }

    // Rotate the vector by an angle (in radians)
    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const newX = this.x * cos - this.y * sin;
        const newY = this.x * sin + this.y * cos;
        return new Vector2(newX, newY);
    }

    // Return a copy of the vector
    clone() {
        return new Vector2(this.x, this.y);
    }

    // String representation of the vector
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
