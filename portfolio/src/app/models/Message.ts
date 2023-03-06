import User from './User';

export default interface Message {
  timestamp: any;
  message: String;
  sender: User;
}
