# NOTES

- yarn add sqlite3 (this is just the interface, not the database)
- yarn add sequelize
- yarn add sequelize-typescript

### Data Arrangement (Schema) Example
conversation 1
conversation 2
user 1
user 2

UserConversation (this table joins the users and conversations)
userId      conversationId
1           1
2           1

Message
id      content     conversationID      userID
1       Hello       1                   1
2       Goodbye     1                   2
