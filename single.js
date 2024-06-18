import { loadGLTF } from "../../libs/loader.js"; 
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => { const start = async () => {
// Create a new MindARThree instance and conﬁgure it
const mindarThree = new window.MINDAR.IMAGE.MindARThree({
container: document.body,
imageTargetSrc: '../../assets/targets/combine/combine.mind'
});

// Extract the renderer, scene, and camera from the MindARThree instance
const { renderer, scene, camera } = mindarThree;

// Add a hemisphere light to illuminate the AR scene
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1); 
 scene.add(light);
 
// Load a 3D model (newbalance) using the loadGLTF function and conﬁgure its scale and position
const converse = await loadGLTF('../../assets/models/converse/scene.gltf'); converse.scene.scale.set(0.3, 0.3, 0.3);
converse.scene.position.set(0, -0.4, 0);

// Load another 3D model (converse) using the loadGLTF function and conﬁgure its scale and position
const newbalance = await loadGLTF('../../assets/models/new balance/scene.gltf'); newbalance.scene.scale.set(0.003, 0.003, 0.003);
newbalance.scene.position.set(0, -0.4, 0);
 
// Add an AR anchor for the converse and atach the converse model to it 
const converseAnchor = mindarThree.addAnchor(0); 
converseAnchor.group.add(converse.scene);

// Add an AR anchor for the newbalance and atach the newbalance model to it 
const newbalanceAnchor = mindarThree.addAnchor(1); 
newbalanceAnchor.group.add(newbalance.scene);

// Start the MindARThree AR experience
await mindarThree.start();

// Set up a rendering loop using the Three.js renderer to continuously render the AR
scene
renderer.setAnimationLoop(() => { renderer.render(scene, camera);
});
}

// Call the start function to begin the AR experience when the DOM content is loaded
start();
});

