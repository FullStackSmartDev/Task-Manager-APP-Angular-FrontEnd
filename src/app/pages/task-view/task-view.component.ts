import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task.model';
import {List} from '../../models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];
  selectedListId: string;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          });
        } else {
          this.tasks = undefined;
        }
      }
    );

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }

  onTaskClick(task: Task): void {
    // We want to set the task to completed
    this.taskService.taskComplete(task).subscribe(() => {
      console.log('Completed successfully');
      task.completed = !task.completed;
    });
  }

  onDeleteListClick(): void {
    this.taskService.deleteList(this.selectedListId).subscribe((res: List) => {
      this.router.navigate(['/lists']);
      console.log(res);
    });
  }

  onDeleteTaskClick(taskId: string): void {
    this.taskService.deleteTask(this.selectedListId, taskId).subscribe((res: Task) => {
      this.tasks = this.tasks.filter(val => val._id !== taskId);
    });
  }
}
