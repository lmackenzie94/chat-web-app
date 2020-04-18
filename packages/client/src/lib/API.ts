import axios from 'axios';

class API {
  prefix = 'http://localhost:9999';

  async getConversations() {
    try {
      const res = await axios.get(`${this.prefix}/conversations`);
      return res.data;
    } catch (e) {
      return null;
    }
  }

  async getConversation(id: string) {
    try {
      const res = await axios.get(`${this.prefix}/conversations/${id}`);
      return res.data;
    } catch (e) {
      return null;
    }
  }

  async createConversation(name: string) {
    const res = await axios.post(`${this.prefix}/conversations`, {
      name,
    });
    return res.data;
  }

  async getMessages(id: string) {
    const res = await axios.get(`${this.prefix}/conversations/${id}/messages`);
    return res.data;
  }

  async createMessage(conversationId: string, content: string) {
    const res = await axios.post(`${this.prefix}/messages`, {
      userId: 'cf8a2660-4d32-4058-b7f4-59b155eef55b',
      content,
      conversationId,
    });
    return res.data;
  }
}
export const api = new API();
