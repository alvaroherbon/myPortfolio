import User from './User';

export default interface Message {
  id: any;
  timestamp: any;
  message: String;
  sender: User;
}
