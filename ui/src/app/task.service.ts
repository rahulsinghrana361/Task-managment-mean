import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title: String) {
    return this.webRequestService.post("lists",{title});
  }

  getList() {
    return this.webRequestService.get("lists");
  }

  //http://localhost:3000/lists/651f8f163946ab762c36e072/tasks
  getTask(id:String) {
    return this.webRequestService.get("lists/"+id+"/tasks");
  }

  // http://localhost:3000/lists/651f8f163946ab762c36e072/tasks
  createTaks(id:String,title: String, status: boolean) {
    return this.webRequestService.post("lists/" +id+"/tasks",{title,status});
  }

  // http://localhost:3000/lists/651f8f163946ab762c36e072/tasks/651f91db66d256eeb7ae071b
  edit(listId:String, taskId:String, status: Boolean) {
    return this.webRequestService.patch("lists/" +taskId+"/tasks/" + listId,{status});
  }

  editTitle(listId:String, taskId:String, title: String) {
    return this.webRequestService.patch("lists/" +taskId+"/tasks/" + listId,{title});
  }

  deleteTask(listId:String, taskId:String) {
    return this.webRequestService.delete("lists/" +taskId+"/tasks/" + listId);
  }
}
