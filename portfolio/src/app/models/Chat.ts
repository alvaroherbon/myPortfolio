import Message from './Message';
import User from './User';

export default interface Chat {
  name: string;
  id: any;
  timestamp: any;
  messages: string[];
  users: string[];
}
