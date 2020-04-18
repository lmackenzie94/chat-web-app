import React, { useRef, FormEvent, useState } from 'react';
import { api } from '../../lib/API';
import { Redirect } from 'react-router';
import { Conversation } from '../../lib/types';

export const CreateConversation = () => {
  const input = useRef<HTMLInputElement>(null);
  const [convo, setConvo] = useState<Conversation>();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const newConvo = await api.createConversation(input.current?.value!);
    // once created, redirect to the new conversation
    setConvo(newConvo);
  };

  if (convo) return <Redirect to={`/c/${convo.id}`} />;
  return (
    <header className="create">
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="New conversation"
          name="name"
          ref={input}
        />
        <button>Create</button>
      </form>
    </header>
  );
};
