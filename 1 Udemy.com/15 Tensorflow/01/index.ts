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

{
  const model = tf.sequential();
  // Add dense layer using model.add()
  model.add(tf.layers.dense({ units: 8, inputShape: [4], activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: "softmax" }));

  model.compile({
    optimizer: "sgd",
    loss: "meanSquaredError",
    metrics: ["accuracy"],
  });

  const data = tf.tensor2d([1, 2, 3, 4], [1, 4]);
  const labels = tf.tensor2d([10], [1, 1]);

  model.fit(data, labels);
  const output = model.predict(tf.tensor2d([1, 2, 3, 4], [1, 4])) as tf.Tensor<tf.Rank>;
  output.print();
}

{
  // Define input, which has a size of 5 (not including batch dimension).
  // const input = tf.input({ shape: [5] });
  // // First dense layer uses relu activation.
  // const denseLayer1 = tf.layers.dense({ units: 10, activation: "relu" });
  // // Second dense layer uses softmax activation.
  // const denseLayer2 = tf.layers.dense({ units: 4, activation: "softmax" });
  // // Obtain the output symbolic tensor by applying the layers on the input.
  // const output = denseLayer2.apply(denseLayer1.apply(input)) as tf.SymbolicTensor;
  // // Create the model based on the inputs.
  // const model = tf.model({ inputs: input, outputs: output });
  // (model.predict(tf.ones([2, 5])) as tf.Tensor<tf.Rank>).print();
}

{
  const model = tf.sequential();
  // Add dense layer using model.add()
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  model.compile({
    optimizer: "sgd",
    loss: "meanSquaredError",
    metrics: ["accuracy"],
  });

  const data = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8], [8, 1]);
  const labels = tf.tensor2d([-1, -2, 3, -4, -5, -6, -7, -8], [8, 1]);

  model.fit(data, labels);
  const output = model.predict(tf.tensor2d([13], [1, 1])) as tf.Tensor<tf.Rank>;
  output.print();
}
