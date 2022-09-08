const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Items
const ServerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    port: {
      type: Number,
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("ServerSchema", ServerSchema);
