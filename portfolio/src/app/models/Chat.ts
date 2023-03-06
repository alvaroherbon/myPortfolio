import Message from './Message';
import User from './User';

export default interface Chat {
  id: any;
  timestamp: any;
  messages: Message[];
  otherUser: User;
}
