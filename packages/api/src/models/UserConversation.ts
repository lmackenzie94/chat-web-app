import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Conversation } from './Conversation';
import { User } from './User';

// Remember: a user can have many conversations and a conversation can have many users (many to many relationship)
// a conversation can have many messages but a message belongs to only one conversation (one to many relationship)

@Table
export class UserConversation extends Model<UserConversation> {
  @ForeignKey(() => User) // looking up the id from another table (User)
  @Column
  userId: number;

  @ForeignKey(() => Conversation)
  @Column
  conversationId: number;
}
