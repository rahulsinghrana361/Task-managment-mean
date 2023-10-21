import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewListComponent } from './pages/new-list/new-list.component';

const routes: Routes = [
  {path:"", component:TaskViewComponent},
  {path:"new-task", component:NewTaskComponent},
  {path:"new-list", component:NewListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
