import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Task} from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId: string;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.listId;
      }
    );
  }

  createTask(title: string): void {
    this.taskService.createTask(this.listId, title).subscribe((response: Task) => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }
}
