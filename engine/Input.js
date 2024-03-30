export class Input {
    constructor() {
      this.keys = {};
      this.mouse = { x: 0, y: 0, leftButton: false, rightButton: false };
      this.initKeyboardEvents();
      this.initMouseEvents();
    }
  
    // Initialize keyboard events
    initKeyboardEvents() {
      document.addEventListener('keydown', (event) => {
        this.keys[event.key.toLowerCase()] = true;
      });
  
      document.addEventListener('keyup', (event) => {
        this.keys[event.key.toLowerCase()] = false;
      });
    }
  
    // Initialize mouse events
    initMouseEvents() {
      document.addEventListener('mousemove', (event) => {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
      });
  
      document.addEventListener('mousedown', (event) => {
        if (event.button === 0) {
          this.mouse.leftButton = true;
        } else if (event.button === 2) {
          this.mouse.rightButton = true;
        }
      });
  
      document.addEventListener('mouseup', (event) => {
        if (event.button === 0) {
          this.mouse.leftButton = false;
        } else if (event.button === 2) {
          this.mouse.rightButton = false;
        }
      });
    }
  
    // Check if a key is currently pressed
    static isKeyPressed(key) {
      return !!Input.getInstance().keys[key];
    }
  
    // Get mouse position
    static getMousePosition() {
      const { x, y } = Input.getInstance().mouse;
      return { x, y };
    }
  
    // Check if left mouse button is pressed
    static isLeftMouseButtonDown() {
      return Input.getInstance().mouse.leftButton;
    }
  
    // Check if right mouse button is pressed
    static isRightMouseButtonDown() {
      return Input.getInstance().mouse.rightButton;
    }
  
    // Singleton instance
    static getInstance() {
      if (!Input.instance) {
        Input.instance = new Input();
      }
      return Input.instance;
    }
  }
  