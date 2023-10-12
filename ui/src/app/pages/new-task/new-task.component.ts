import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  listId: any;
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getQueryParams();   
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      
      if (params) {
            this.listId = params["id"]
      }
    });
  }

  createNewTask(title: String) {
    let status = true;
    this.taskService.createTaks(this.listId,title,status).subscribe((res)=> {
      if(res) {
        this.router.navigateByUrl('');
      }
    })
  }
}
