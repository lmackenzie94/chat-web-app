import { User } from './lib/types';

// this allows us to access 'me' globally throughout the whole app
// BETTER WAY: use Context so all components can get access to it
let me: User | null = null;

export const setMe = (user: User) => (me = user);
export const getMe = () => me;
