import Chat from './Chat';
import User from './User';

export default interface UserChatData {
  chats: Chat[];
  contacts: User[];
  user: User;
}
