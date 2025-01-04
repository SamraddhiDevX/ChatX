import cloudinary from "cloudinary";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.js";
import User from "../models/usermodel.js";
import mongoose from "mongoose";

const getUserSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Explicitly declare the variable

    if (!mongoose.Types.ObjectId.isValid(loggedInUserId)) {
      return res.status(400).json({ error: "Invalid logged-in user ID" });
    }
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getting Users", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(myId) || !mongoose.Types.ObjectId.isValid(userToChatId)) {
    return res.status(400).json({ error: "Invalid user IDs" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId }
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getting chat messages", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recieverId)) {
      return res.status(400).json({ error: "Invalid sender or receiver ID" });
    }

    let imageUrl;
    if (image) {
      const uploadimage = await cloudinary.uploader.upload(image);
      imageUrl = uploadimage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const recieverSocketId = getReceiverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sending chat messages", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getUserSidebar, getUserMessages, sendMessage };
