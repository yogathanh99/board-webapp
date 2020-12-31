import { Board, User } from './';

type TStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  _id?: string;
  title: string;
  status: TStatus;
  joined?: User;
  board: string | Board;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
