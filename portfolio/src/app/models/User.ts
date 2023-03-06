import Chat from './Chat';

export default interface User {
  id: any;
  name: String;
  lastName: String;
  email: String | null | undefined;
  chats: Chat[];
}
