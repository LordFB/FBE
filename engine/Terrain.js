import { Perlin } from '../lib/perlin.js';

export class Terrain {
    constructor(player) {
        this.player = player;
        this.tileSize = 30;
        this.perlin = new Perlin();
        this.perlin.seed();
        this.tiles = this.initTiles();
    }
    initTiles() {
        let tiles = {
            lod1: [],
            lod2: []
        };
        let sandNormal = new BABYLON.Texture("/sandNormal.png");
        let sandTex = new BABYLON.Texture("https://static9.depositphotos.com/1611805/1099/i/950/depositphotos_10991777-stock-photo-sand-seamless-texture.jpg");
        let sandTex2 = new BABYLON.Texture("https://static9.depositphotos.com/1611805/1099/i/950/depositphotos_10991777-stock-photo-sand-seamless-texture.jpg");
        sandNormal.uScale = 25.0;
        sandNormal.vScale = 25.0;
        sandTex.uScale = 50.0;
        sandTex.vScale = 50.0;
        sandTex2.uScale = 50.0;
        sandTex2.vScale = 50.0;

        for (let x = -1; x < 2; x++) {
            for (let z = -1; z < 2; z++) {


                // LOD1
                const ground = BABYLON.MeshBuilder.CreateGround("ground", { height: this.tileSize, width: this.tileSize, subdivisions: 16, updatable: true });
                ground.material = new BABYLON.PBRMetallicRoughnessMaterial("myPBRMat");
                ground.material.metallic = 0;
                ground.material.roughness = 0.8;
                //ground.material.wireframe = true;
                ground.material.normalTexture = sandNormal;
                ground.material.baseTexture = sandTex;
                ground.position.x = x * this.tileSize;
                ground.position.z = z * this.tileSize;
                tiles.lod1.push(ground);
                this.updateTile(ground);

                // LOD2
                if (x === 0 && z === 0) {
                    tiles.lod2.push(null);
                    continue;
                }
                const ground2 = BABYLON.MeshBuilder.CreateGround("ground", { height: this.tileSize * 3, width: this.tileSize * 3, subdivisions: 32, updatable: true });
                ground2.material = new BABYLON.PBRMetallicRoughnessMaterial("myPBRMat");
                ground2.material.metallic = 0;
                ground2.material.roughness = 0.8;
                ground2.material.normalTexture = sandNormal;
                ground2.material.baseTexture = sandTex2;
                //ground2.material.wireframe = true;
                ground2.position.x = x * this.tileSize * 3;
                ground2.position.z = z * this.tileSize * 3;
                tiles.lod2.push(ground2);
                this.updateTile(ground2);
            }
        }
        return tiles;
    }

    updateLOD() {
        let input = this.player.getComponent('Character');
        let i = 0;
        for (let x = -1; x < 2; x++) {
            for (let z = -1; z < 2; z++) {
                const tile = this.tiles.lod2[i];
                if (tile) {
                    tile.position.x = this.player.transform.position.x + x * this.tileSize * 3 - input.dirs.x * this.tileSize / 2;
                    tile.position.z = this.player.transform.position.z + z * this.tileSize * 3 - input.dirs.y * this.tileSize / 2;
                    this.updateTile(tile);
                }
                i++;
            }
        }
    }

    updateTile(tile) {
        let points = tile.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        let indices = tile.getIndices();
        let normals = tile.getVerticesData(BABYLON.VertexBuffer.NormalKind);
        for (let i = 0; i < points.length; i += 3) {
            points[i + 1] = this.getHeightAt(points[i] + tile.position.x, points[i + 2] + tile.position.z);
        }
        //BABYLON.VertexData.ComputeNormals(points, indices, normals);
        let vertexData = new BABYLON.VertexData();
        vertexData.positions = points;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.applyToMesh(tile);
    }
    getHeightAt(x, z) {
        // let n = this.perlin.get(x * 0.05, z * 0.05) * 25;
        // n -= this.perlin.get(x * 0.05, z * 0.05) * 10;
        // n += this.perlin.get(x * 0.12, z * 0.12) * 3;
        // n *= this.perlin.get(x * 0.01, z * 0.01) * 25 < 0 ? 0.1 : 1;
        let n = this.perlin.get(x * 0.01, z * 0.01) * 10;
        n += this.perlin.get(Math.sin(x * 0.1),Math.cos(z * 0.1)) * 5;
        //n -= (Math.sin(x * 0.5) + Math.cos(z * 0.25)) * 1.25;
        return n;
    }
    update() {
        //this.player.transform.position.y = this.getHeightAt(this.player.transform.position.x,this.player.transform.position.z) + 0.5;
        this.tiles.lod1.forEach(t => {
            if (Math.abs(t.position.x - this.player.transform.position.x) > this.tileSize * 1.5) {
                if (t.position.x > this.player.transform.position.x) t.position.x -= this.tileSize * 3;
                else if (t.position.x < this.player.transform.position.x) t.position.x += this.tileSize * 3;
                this.updateTile(t);
                this.updateLOD();
            }
            if (Math.abs(t.position.z - this.player.transform.position.z) > this.tileSize * 1.5) {
                if (t.position.z > this.player.transform.position.z) t.position.z -= this.tileSize * 3;
                else if (t.position.z < this.player.transform.position.z) t.position.z += this.tileSize * 3;
                this.updateTile(t);
                this.updateLOD();
            }
        });
    }
}