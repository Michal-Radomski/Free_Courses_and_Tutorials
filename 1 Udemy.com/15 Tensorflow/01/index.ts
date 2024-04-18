import * as tf from "@tensorflow/tfjs-node";

// console.log("tf.version", tf.version);
// console.log("tf.getBackend():", tf.getBackend());
// console.log("tf.memory():", tf.memory());

const rank = [2, 3, 4, 5];
const shape = [2, 2];
const dataType = "int32";
const tensorData = tf.tensor(rank, shape, dataType);
tensorData.print();
