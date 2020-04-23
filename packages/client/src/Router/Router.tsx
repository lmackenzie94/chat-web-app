import React, { useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { HomePage } from '../pages/Home/Home.page';
import { history } from './history';
import { ConversationPage } from '../pages/Conversation/Conversation.page';
import { LoginPage } from '../pages/Login/Login.page';
import { api } from '../lib/API';

export const AppRouter = () => {
  // fetch the users info (me) on every page reload
  // storing user data to local storage is not an option as it's a security concern

  const [loading, setLoading] = useState(true);

  const loadMe = async () => {
    await api.me();
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setLoading(false);
    else loadMe();
  }, []);

  if (loading) return <span>Loading...</span>;
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/c/:conversationID" exact component={ConversationPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
};
