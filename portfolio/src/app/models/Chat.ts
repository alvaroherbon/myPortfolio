import Message from './Message';
import User from './User';

export default interface Chat {
  timestamp: any;
  messages: Message[];
  otherUser: User;
}
