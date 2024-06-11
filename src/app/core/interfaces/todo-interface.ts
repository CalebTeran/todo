export interface ITodoListItem {
    id?: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
    childTodo?: IChildTodo[];
  }
  
  export interface IChildTodo {
    id?: string;
    fatherId: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
    childTodo?: IChildTodo[];
  }
  