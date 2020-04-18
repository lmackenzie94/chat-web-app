import './conversation.page.scss';

import React, { useEffect, useState, useMemo } from 'react';

import { api } from '../../lib/API';
import { Conversation, Message } from '../../lib/types';
import { useParams } from 'react-router';
import { SendMessage } from './SendMessage';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CreateConversation } from './CreateConversation';

interface Params {
  conversationID: string;
}

export const ConversationPage = () => {
  const params = useParams<Params>();

  const [conversation, updateConversation] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);

  // does the same thing as useEffect except it actually returns a value
  // in this case, it returns a Boolean
  const isNew = useMemo(() => params.conversationID === 'new', [
    params.conversationID,
  ]);

  const loadInitialData = async () => {
    if (isNew) return; // stop loading conversation if on New Conversation page
    const conversation = await api.getConversation(params.conversationID);
    if (!conversation) return;
    const messages = await api.getMessages(params.conversationID);
    updateConversation(conversation);
    updateMessages(messages);
  };

  useEffect(
    () => {
      loadInitialData();
    }, // Watch these values for changes (Not DEEP change)
    [params.conversationID]
  );

  if (!conversation && !isNew) return <span>Loading...</span>;

  return (
    <main className="conversation">
      <Sidebar />
      {isNew ? (
        <CreateConversation />
      ) : (
        <>
          <header>
            {conversation ? (
              <>Conversation {conversation.name}</>
            ) : (
              <h1>Could not find conversation</h1>
            )}
          </header>
          <ul className="messages">
            {messages.map((m, idx) => (
              <li key={idx}>
                <span>{m.content}</span>
              </li>
            ))}
          </ul>

          <footer>
            <SendMessage
              conversationId={params.conversationID}
              onNewMessage={(message) => {
                updateMessages((m) => [...m, message]);
              }}
            />
          </footer>
        </>
      )}
    </main>
  );
};
