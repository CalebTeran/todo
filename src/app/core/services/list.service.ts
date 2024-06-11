import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ITodoListItem } from '../interfaces/todo-interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private db: AngularFirestore) {}

  async createTodo(todo: ITodoListItem): Promise<any> {
    const response = await this.db
      .collection('todos')
      .add(todo)
      .then((doc) => {
        console.log('todo created ->', doc);
      })
      .catch((err) => {
        console.error('Create todo error>>', err);
        throw new Error('Error: todo not created');
      });
    return response;
  }

  getAllTodos(): Observable<ITodoListItem[]> {
    return this.db
      .collection('todos', ref=>ref.orderBy('createdAt','asc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
  
  updateTodo(todo: ITodoListItem): Promise<any>{
    return this.db.collection('todos').doc(todo.id).update(
      todo).catch((Error)=>{
        console.error('update todo error>>', Error);
        throw new Error('Error: todo not updated');
      })
  }
  
  completeTodo(todo: ITodoListItem): Promise<any>{
    return this.db.collection('todos').doc(todo.id).update(todo).catch((Error)=>{
        console.error('complete todo error>>', Error);
        throw new Error('Error: todo not updated');
      })
  }

  deleteTodo(id:string): Promise<any>{
    return this.db.collection('todos').doc(id).delete().catch((Error)=>{
      console.error('Delete todo error>>', Error);
      throw new Error('Error: todo not removed');
    });
  }
  orderByTodos(filter: string): Observable<ITodoListItem[]>{
    return this.db
    .collection('todos', ref=>ref.orderBy(filter,'asc'))
    .snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
