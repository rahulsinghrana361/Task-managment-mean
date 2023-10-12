import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {

  constructor(private taskService: TaskService, private router: Router) {}
  ngOnInit(): void {
  }

  createNewList(title: String) {
    this.taskService.createList(title).subscribe((res)=> {
      if(res) {
        this.router.navigateByUrl('');
      }
    })
  }
}
