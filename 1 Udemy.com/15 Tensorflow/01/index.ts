import * as tf from "@tensorflow/tfjs-node";

// console.log("tf.version", tf.version);
// console.log("tf.getBackend():", tf.getBackend());
// console.log("tf.memory():", tf.memory());

tf.tidy(() => {
  const rank = [2, 3, 4, 5];
  const shape = [2, 2];
  const dataType = "int32";
  const tensorData: tf.Tensor<tf.Rank> = tf.tensor(rank, shape, dataType);
  tensorData.print();
  console.log("tensorData.toString()):", tensorData.toString());

  const a = tf.tensor1d([1, 2, 3, 4]);
  const b = tf.tensor1d([10, 20, 30, 40]);
  a.add(b).print();
  a.sub(b).print();
});

console.log("tf.memory():", tf.memory());
