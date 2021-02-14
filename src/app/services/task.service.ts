import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';
import {Observable} from 'rxjs';
import {Task} from '../models/task.model';
import {List} from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  getLists(): Observable<List[]> {
    return this.webRequestService.get('lists');
  }

  createList(title: string): Observable<List> {
    // We want to send a web request to creat a list
    return this.webRequestService.post('lists', { title });
  }

  updateList(id: string, title: string): Observable<List> {
    // We want to send a web request to update a list
    return this.webRequestService.patch(`lists/${id}`, { title });
  }

  deleteList(id: string): Observable<List> {
    return this.webRequestService.delete(`lists/${id}`);
  }

  getTasks(listId: string): Observable<Task[]> {
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  createTask(listId: string, title: string): Observable<Task> {
    return this.webRequestService.post(`lists/${listId}/tasks`, { title });
  }

  updateTask(listId: string, taskId: string, title: string): Observable<Task> {
    // We want to send a web request to update a list
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }

  deleteTask(listId: string, taskId: string): Observable<Task> {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  taskComplete(task: Task): Observable<Task> {
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
