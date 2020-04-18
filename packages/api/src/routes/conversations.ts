import { Router } from 'express';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';

export const conversationsRouter = Router();

// CRUD of the Conversation in REST API

// Get list of conversations
// '/' routes to '/conversations' because of line 42 in index.ts
conversationsRouter.get('/', async (_req, res) => {
  // Fetch ALL the conversations
  const conversations = await Conversation.findAll();
  // Send them in the pipe
  res.json(conversations);
});

// Get ONE conversation
conversationsRouter.get('/:conversationID', async (req, res) => {
  const { conversationID } = req.params;
  const conversation = await Conversation.findByPk(conversationID);
  res.json(conversation);
});

// Create a conversation
conversationsRouter.post('/', async (req, res, next) => {
  try {
    const conversation = new Conversation(req.body); // NOTE: THIS IS DANGEROUS
    await conversation.save();
    res.json(conversation);
  } catch (e) {
    next(e);
  }
});

// Update a conversation
conversationsRouter.patch('/:conversationID', async (req, res, next) => {
  try {
    await Conversation.update(req.body, {
      where: { id: req.params.conversationID },
      returning: true, // TODO: Fix this
    });
    const conversation = await Conversation.findByPk(req.params.conversationID);
    res.json(conversation);
  } catch (e) {
    next(e);
  }
});

// Delete a conversation
conversationsRouter.delete('/:conversationID', async (req, res, next) => {
  try {
    Conversation.destroy({
      where: { id: req.params.conversationID },
    });
    res.json({
      message: 'Successfully deleted conversation',
    });
  } catch (e) {
    next(e);
  }
});

conversationsRouter.get('/:conversationID/messages', async (req, res, next) => {
  // Get the conversation
  const { conversationID } = req.params;
  const conversation = await Conversation.findByPk(conversationID); // "Pk" is primary key
  if (!conversation) return next(new Error('No conversation with that id'));
  // Get the messages in the one to many relationship
  const messages = await conversation.$get('messages');
  // Return the messages
  res.json(messages);
});
