const messagesRouter = require('express').Router();
const {Chat, findByRecipientsOrSave} = require('../models/chat');
const Message = require('../models/message');
const mustBeAuthenticated = require("../middleware");

//Middleware to ensure authentication
messagesRouter.use(mustBeAuthenticated);

//Route to get messages for a specific chat (GET /auth/messages)
messagesRouter.get('/messages', async (req, res) => {
    const chatID = req.query.chatId;

    //Validate if chat ID is provided. Error thrown if chat ID is not provided
    if (!chatID) {
        return res.status(400).json({error: 'Chat ID is required'});
    }

    try {
        //Find messages for specified chatID and populate sender's username 
        let messages = await Message.find({chat: chatID}).populate('sender', 'username');
        // Add the isOwner property to each message, based on current user's ID
        messages = messages.map(message => {
            message = message.toObject(); // Convert the message document to a plain JavaScript object
            message.isOwner = String(message.sender.id) === req.user.id; // Check if sender is current user
            return message;
        });

        res.json(messages);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: 'Error fetching messages'});
    }

});

//Route to send a new message (POST /auth/messages)
messagesRouter.post('/messages', async (req, res) => {
    let {chatId, content, recipientId} = req.body;
    const userId = req.user.id;

    //Throw error if recipientID is not provided. Validate if it is provided
    if (!recipientId) {
        return res.status(400).json({error: 'Recipient ID is required'});
    }

    try {
        //Create a new chat with recipients if chatId is not provided
        if (!chatId) {
            const chat = await findByRecipientsOrSave([userId, recipientId]);
            chatId = chat.id;
        }

        //Validate if chatId and content are provided. Throw an error if this is not the case
        if (!chatId || !content) {
            return res.status(400).json({error: 'Chat ID and content are required'});
        }

        //Create and save the new message
        const message = new Message({
            sender: userId,
            chat: chatId,
            content,
        });

        await message.save()

        //Populate sender's username for the message
        const populatedMessage = await Message.populate(message, 'sender');

        //Emit a socket.io event to notify clients about new message
        req.app.io.emit(`message/${chatId}`, populatedMessage);

        //Prepare response object with isOwner and send response
        let msgObj = populatedMessage.toObject();
        msgObj.isOwner = true;

        res.json(msgObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error saving message'});
    }
});

//Route to get chats for current user
messagesRouter.get('/chats', async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({error: 'User ID is required'});
    }

    try {
        //Fetch chats where the user is a participant and populate participants' usernames
        const chats = await Chat.find({participants: userId}).populate('participants', 'username');
        res.json(chats);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: 'Error fetching chats'});
    }
});

//Route to create a new chat (POST /auth/chats)
messagesRouter.post('/chats', async (req, res) => {
    const {recipientId} = req.query;
    const userId = req.user.id;

    if (!recipientId) {
        return res.status(400).json({error: 'Recipient ID is required'});
    }

    try {
        //Create a new chat conversation with current user and recipient
        const chat = await findByRecipientsOrSave([userId, recipientId]);
        res.json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error saving chat'});
    }
});

//Export the messagesRouter to make the routs available for use
module.exports = messagesRouter;

