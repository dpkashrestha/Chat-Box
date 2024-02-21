const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatName: {
    type: String,
    required: true,
  },
});
