import { Transform } from "./Transform.js";

export class GameObject {
    constructor(name) {
      this.uniqueID = Date.now();
      this.name = name;
      this.components = [];
      this.transform = this.addComponent(new Transform());
    }

    update(dt){
        for (const component in this.components) {
            if ( this.components[component].update ) this.components[component].update(dt);
        }
    }
  
    // Add a component to the GameObject
    addComponent(component) {
      const componentType = component.constructor.name;
      if (!this.components[componentType]) {
        this.components[componentType] = component;
        return component;
      } else {
        console.error(`Component of type ${componentType} already exists in GameObject ${this.uniqueID}`);
      }
    }
  
    // Remove a component from the GameObject
    removeComponent(componentType) {
      if (this.components[componentType]) {
        delete this.components[componentType];
      } else {
        console.error(`Component of type ${componentType.name} does not exist in GameObject ${this.uniqueID}`);
      }
    }
  
    // Get a component by its type
    getComponent(componentName) {
      return this.components[componentName];
    }
  }
  