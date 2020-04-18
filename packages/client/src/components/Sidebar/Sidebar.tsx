import React, { useEffect, useState } from 'react';
import { api } from '../../lib/API';
import './sidebar.scss';
import { Link } from 'react-router-dom';
import { Conversation } from '../../lib/types';

export const Sidebar = () => {
  const [convos, setConvos] = useState<Conversation[]>([]);

  // break this out as a function bc can't use async inside useEffect
  const getConversations = async () => {
    setConvos(await api.getConversations());
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <aside>
      <div>
        <Link className="button" to="/c/new">
          +
        </Link>
      </div>
      <ul>
        {convos.map((c) => (
          <li key={c.id}>
            <Link to={`/c/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
