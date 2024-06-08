import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TodoComponent } from './modules/todo/todo.component';

export const routes: Route[] = [
  { path: '', component: TodoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}