const db = require("../config/connection");
const { User, Chat, Message } = require("../models");
const userSeeds = require("./userSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Chat", "chats");
    await cleanDB("Message", "messages");

    await User.create(userSeeds);
    await Chat.create(chatSeeds);
    await Message.create(messageSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
