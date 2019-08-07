const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id: Number,
    created_at: String,
    title: String,
    url: String,
    author: String,
    status: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);