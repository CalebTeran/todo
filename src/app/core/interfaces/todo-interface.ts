export interface ITodoListItem {
    id?: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
    subTodos?: ITodoListItem[];
  }
  
  // export interface IChildTodo {
  //   id?: string;
  //   fathersIds: Array<string>;
  //   title: string;
  //   completed: boolean;
  //   createdAt: Date;
  //   completedAt?: Date;
  //   subTodos?: ITodoListItem[];
  // }
  