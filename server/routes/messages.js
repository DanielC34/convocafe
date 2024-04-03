const messagesRouter = require('express').Router();
const {Chat, findByRecipientsOrSave} = require('../models/chat');
const Message = require('../models/message');
const mustBeAuthenticated = require("../middleware");

messagesRouter.use(mustBeAuthenticated);
messagesRouter.get('/messages', async (req, res) => {
    const chatID = req.query.chatId;

    if (!chatID) {
        return res.status(400).json({error: 'Chat ID is required'});
    }

    const messages = await Message.find({chat: chatID}).populate('sender', 'username');

    res.json(messages);
});


messagesRouter.post('/messages', async (req, res) => {
    let {chatId, content, recipientId} = req.body;
    const userId = req.user.id;

    if (!recipientId) {
        return res.status(400).json({error: 'Recipient ID is required'});
    }
    try {
        if (!chatId) {
            const chat = await findByRecipientsOrSave([userId, recipientId]);
            chatId = chat.id;
        }
        if (!chatId || !content) {
            return res.status(400).json({error: 'Chat ID and content are required'});
        }

        const message = new Message({
            sender: userId,
            chat: chatId,
            content,
        });

        await message.save();

        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error saving message'});
    }
});


messagesRouter.get('/chats', async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({error: 'User ID is required'});
    }

    const chats = await Chat.find({participants: userId}).populate('participants', 'username');

    res.json(chats);
});


module.exports = messagesRouter;


