import { Component } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent {
  lists: any;
  tasks: any;
  listId: String = "";
  taskClicked: boolean = false;
  isEdit: boolean = false;
  editTaskId: String = "";
  editTaskListId: String = "";
  editTaskTitle: String = "";

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.taskService.getList().subscribe((res) => {
      if (res) {
        this.lists = res;
      }
      console.log(res);
    })
  }

  getTasks(id: String) {
    this.listId = id;
    this.taskClicked = true;
    this.taskService.getTask(id).subscribe((res) => {
      if (res) {
        this.tasks = res;
      }
    })
  }

  complete(listId: String, taskId: String, status: boolean) {
    this.taskService.edit(listId, taskId, status).subscribe((data) => {
      console.log(data);
    },
      (error) => {
        console.log(error, 'eeeeeeeee');
      });
  }

  editTask(taskId: String, listId: String, value: String) {
    this.editTaskId = taskId;
    this.editTaskListId = listId;
    this.editTaskTitle = value;
    this.isEdit = true;
  }

  deleteTask(taskId: String, listId: String) {
    this.taskService.deleteTask(taskId,listId).subscribe((data) => {
      if (data) {
          this.taskService.getTask(listId).subscribe((res) => {
            if (res) {
              this.tasks = res;
            }
          });
        }
    },
      (error) => {
        console.log(error, 'eeeeeeeee');
      });
  }

  updateTask(value: String) {
    this.taskService.editTitle(this.editTaskId, this.editTaskListId, value).subscribe((data) => {
      console.log(data);
    },
      (error) => {
        console.log(error, 'eeeeeeeee');
        if (error.status == 200) {
          this.taskService.getTask(this.editTaskListId).subscribe((res) => {
            if (res) {
              this.tasks = res;
              this.isEdit = false;
              console.log(res, 'aaaaaaaaaa');
            }
          });
        }
      });

  }
  cancelEdit() {
    this.isEdit = false;
  }
}
