import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {path:"", component:TaskViewComponent},
  {path:"new-task", component:NewTaskComponent},
  {path:"new-list", component:NewListComponent},
  {path:"login", component:LoginPageComponent},
  {path:"signup", component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
