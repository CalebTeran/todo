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
      .collection('todos')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            console.log("action ->",a.payload.doc.data())
            const data = a.payload.doc.data() as any;
            console.log("api call",a.payload.doc.id)
            return { ...data };
          });
        })
      );
  }
}
