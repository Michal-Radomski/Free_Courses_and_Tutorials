import * as tf from "@tensorflow/tfjs-node";

// console.log("tf.version", tf.version);
// console.log("tf.getBackend():", tf.getBackend());
// console.log("tf.memory():", tf.memory());

// tf.tidy(() => {
//   const rank = [2, 3, 4, 5];
//   const shape = [2, 2];
//   const dataType = "int32";
//   const tensorData: tf.Tensor<tf.Rank> = tf.tensor(rank, shape, dataType);
//   tensorData.print();
//   console.log("tensorData.toString()):", tensorData.toString());

//   const a = tf.tensor1d([1, 2, 3, 4]);
//   const b = tf.tensor1d([10, 20, 30, 40]);
//   a.add(b).print();
//   a.sub(b).print();
// });

// console.log("tf.memory():", tf.memory());

// // Creating the tensor
// const tr = tf.tensor([1, 2, 3, 4, 5, 6, 7]);
// // Disposing the tensor
// tr.dispose();
// // Trying to print it now
// tr.print();

{
  const model = tf.sequential();
  // Add dense layer using model.add()
  model.add(tf.layers.dense({ units: 8, inputShape: [16] }));
  model.add(tf.layers.dense({ units: 4 }));
  (model.predict(tf.ones([8, 16])) as tf.Tensor<tf.Rank>).print();
}
