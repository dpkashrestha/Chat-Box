const mongoose = require("mongoose");

// Import your model files here
const User = require("./User");
const Chat = require("./Chat");
const Message = require("./Message");

// Add more models as needed

// Export your models
module.exports = {
  User,
  Chat,
  Message,
  // Export more models as needed
};
