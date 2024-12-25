/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */

        // Calculate transformation matrix for the node
        var transformationMatrix = this.trs.getTransformationMatrix();

        // Place object in correct position and scale from camera's perspective
        var transformedMvp = MatrixMult(mvp, transformationMatrix);

        // Place and rotate object to correct position in scene
        var transformedModelView = MatrixMult(modelView, transformationMatrix);

        // Correctly transform normals for lighting calculations
        var transformedNormals = MatrixMult(normalMatrix, transformationMatrix);

        // Update model matrix of the object to keep in correct position, scale and transformation
        var transformedModel = MatrixMult(modelMatrix, transformationMatrix); 

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Draw child nodes with iteration applying given matrices
        this.children.forEach((childNode) => {
            childNode.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        });
    }

}